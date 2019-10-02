import Login from "components/pages/Login";
import ForgetPassword from "components/forms/ForgetPasswordForm";
export const authRoutes = [
  {
    name: "登入",
    to: "/login",
    icon: "login",
    component: Login,
    permision: "normal"
  },
  {
    name: "忘記密碼",
    to: "/forgetpassword",
    icon: "frown",
    component: ForgetPassword,
    permision: "private"
  }
];
