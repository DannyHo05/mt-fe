import { createBrowserRouter } from "react-router-dom";
import { authRouter } from "./auth";
import { mainRouter } from "./main";




 const rootRouter = createBrowserRouter([...mainRouter ,...authRouter])

export default rootRouter
