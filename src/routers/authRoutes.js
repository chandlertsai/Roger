import Login from "components/pages/Login";
import ForgetPassword from "components/forms/ForgetPasswordForm";
import ResetPassword from "components/forms/ResetPasswordForm";
import UploadLicense from "components/forms/UploadLicense";
export const authRoutes = [
  {
    name: "登入",
    to: "/login",
    icon: "login",
    component: Login,
    permission: "normal",
  },
  {
    name: "忘記密碼",
    to: "/forgetpassword",
    icon: "frown",
    component: ForgetPassword,
    permission: "normal",
  },
  {
    name: "更改密碼",
    to: "/resetpassword",
    icon: "frown",
    component: ResetPassword,
    permission: "private",
  },
  {
    name: "上傳license",
    to: "/loginChangeLicense",
    icon: "frown",
    component: UploadLicense,
    permission: "normal",
  },
];
