import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import Root from "./Pages/Root";
import Login from "./components/Login";
import SignUp from './components/Signup'
import { Navigate } from "react-router-dom";
import ChatContainer from "./components/Chat/ChatContainer";
import RootChat from "./Pages/RootChat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "",
        element: <Navigate to="/user/login" /> // Redirect to /user/login when visiting /
      },
      {
        path: "/user",
        element: <AuthPage></AuthPage>,
        children:[

          {
            
            path: "/user/login",
            element: <Login></Login>,
          },
          {
            path: "/user/signup",
            element: <SignUp></SignUp>,
          },
        ]
      },
      {
        path:'/chat',
        element:<RootChat></RootChat>,
        children:[{
          path:'',
          element:<ChatContainer></ChatContainer>

        }]
      }
   
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
