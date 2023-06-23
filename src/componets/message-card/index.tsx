import { Card, CardBody, CardHeader, Text } from "@chakra-ui/react"




export type T_MessageProps={
				name:string,
				content:string,
				isMyMessage:boolean
}
const MessageCard = ({name, content, isMyMessage}:T_MessageProps) => {
	return (
		<>
			<Text>{name}</Text>
			<Card bg={isMyMessage?"blue.300":""} mb={"15px"}>
				<CardBody>
					<Text>{content}</Text>
				</CardBody>
			</Card>

		</>
	)
}

export default MessageCard;
