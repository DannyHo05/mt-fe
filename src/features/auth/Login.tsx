import { AuthApi } from '@/api';
import Loader from '@/componets/loader/Loader';
import userState from '@/recoil/user/atom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()
  const [cookies, setCookie] = useCookies("user")
  const handleSignIn = async ()=>{
    setIsLoading(true)
    const user =await AuthApi.signIn({username:email, password})
    console.log(user, user instanceof Error)
    if (user instanceof Error){
      toast({
        title:"Login",
        description:user.message,
        duration:3000,
        status:"error"
      })

    }
    else{
      setCookie("auth", user.accessToken,{path:'/'})
      toast({
        title:"Login",
        description:"Login successful!",
        duration:3000,
        status:"success"
      })
      navigate("/")
    }
    setIsLoading(false)
  }
  return <>
    {
      isLoading? <div className=''><Loader size="small" /></div>  : (<Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('white', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontWeight={700} fontSize={'4xl'} className='text-center'>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={useColorModeValue("black", "gray.400")}>
              to enjoy all of our cool <Link to="../login" className='text-link'>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link to="../login" className='text-link'>Forgot password?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={()=>handleSignIn()}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
            <Stack className='flex gap-1 flex-row justify-center items-center mt-4'>
              <Text color={useColorModeValue("black", "gray.400")}>
                Don't have account?
              </Text>
              <Link to="../signup" className='text-link mt-0'>Sign up</Link>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      )
    }
  </>
}

export default Login;
