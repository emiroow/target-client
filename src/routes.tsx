import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import AuthTemplate from "./components/templates/AuthTemplate";
import FullTemplate from "./components/templates/FullTemplate";
import Timer from "./pages/timer/Timer";
const Board = lazy(() => import("./pages/board/Board"));
const Todo = lazy(() => import("./pages/task/Task"));
const Boards = lazy(() => import("./pages/boards/Boards"));
const Login = lazy(() => import("./pages/auth/Login"));
const SignUp = lazy(() => import("./pages/auth/SignUp"));
const ForgetPassword = lazy(() => import("./pages/auth/ForgetPassword"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <FullTemplate />,
    children: [
      { path: "/boards", element: <Boards /> },
      { path: "/board/:id", element: <Board /> },
      { path: "/target/:id", element: <Todo /> },
      { path: "/timer", element: <Timer /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthTemplate />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "forgetPassword", element: <ForgetPassword /> },
    ],
  },
]);
