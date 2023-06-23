import { GroupApi } from "@/api/group-api";
import InputMessage from "@/componets/input-message";
import MessageCard from "@/componets/message-card";
import groupState from "@/recoil/group/atom";
import userState from "@/recoil/user/atom";
import { T_Message } from "@/utils/models/message";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Flex, InputGroup, InputRightElement, Textarea } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import io from "socket.io-client"
const RoomChat = () => {
  const [group, setGroup] = useRecoilState(groupState);
  const [user, setUser] = useRecoilState(userState);
  const [message, setMessage] = useState("")
  const [joined, setJoined] = useState(false)
  const socket = io("http://localhost:8001")
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef()
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };
  useEffect(() => {
    socket.emit("joinRoom",{roomId:group?.id},(mess:any)=>{
      console.log(mess)
      setJoined(true)
    })
    socket.emit('findAllMessages', { groupId: group?.id }, (res: T_Message[]) => {
      if (group)
        setGroup(() => {
          return ({
            ...group,
            messages: res
          });
        })
    })
    socket.on('message', async (mess: any) => {
    if (mess.groupId === group?.id) {
      const groupData = await GroupApi.loadGroupData(mess.groupId);
      if (groupData) {
        setGroup(groupData);
      }
    }
  });    return ()=>{
      socket.off()
    }
  }, [group])
  const handleKeyDown = (e:KeyboardEvent)=>{
    if(e.key === "Enter"){
      handleSentMess()
    }
  }
  const handleSentMess = () => {
    setMessage("")
    socket.emit("createMessage", {
      userId: user!.id,
      groupId: group?.id,
      content: message
    })
  }
  return (
    <Flex flexDir={"column"} h={"95vh"} justifyContent={"space-between"} w={"100%"}>
      <div className="relative mt-12 overflow-y-auto h-[90%]">
        {group?.id&& joined && group?.messages?.map((value) => {
          return (
            <Box
              key={value.id}
              w={"60%"}
              float={value.userId === user?.id ? "right" : "left"}
            >
              <MessageCard
                isMyMessage={value.userId === user?.id}
                name={value.sender.first_name + " " + value.sender.last_name}
                content={value.content}
              ></MessageCard>
              <AlwaysScrollToBottom />
            </Box>
          );
        })}
      </div>
      {group?.id && (
        <div className="w-full h-[10%]">
          <InputGroup>
            <Textarea value={message} resize={"none"} onKeyDown={(e:KeyboardEvent)=>{handleKeyDown(e)}} onChange={(e) => { setMessage(e.target.value) }} backgroundColor={"#fff"} placeholder='message..' />
            <InputRightElement onClick={() => { handleSentMess() }} cursor={"pointer"}>
              <ArrowRightIcon color='gray.800' />
            </InputRightElement>
          </InputGroup>
        </div>
      )}

    </Flex>

  );
};

export default RoomChat;
