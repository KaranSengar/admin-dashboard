import { createBrowserRouter } from "react-router-dom";
import HomePages from "./pages/HomePages";
import Categories from "./pages/Categories";
import LoginPages from "./pages/login/login";


export const router = createBrowserRouter([
    {
        path:'/',
        element:<HomePages/>
    },
     {
        path:'/auth/login',
        element:<LoginPages/>
    }
])