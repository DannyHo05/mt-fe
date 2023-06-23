import { RouterProvider } from "react-router-dom"
import rootRouter from "./routes"
import { Button, useColorMode } from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { CookiesProvider } from "react-cookie"
import { RecoilRoot } from "recoil"
function App() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      <RecoilRoot>
      <CookiesProvider>
        <RouterProvider router={rootRouter}></RouterProvider>
      </CookiesProvider>
      </RecoilRoot>
    </>
  )
}

export default App
