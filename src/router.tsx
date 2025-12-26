import { createBrowserRouter } from "react-router-dom";
import HomePages from "./pages/HomePages";
import Categories from "./pages/Categories";


export const router = createBrowserRouter([
    {
        path:'/',
        element:<HomePages/>
    },
     {
        path:'/category',
        element:<Categories/>
    }
])