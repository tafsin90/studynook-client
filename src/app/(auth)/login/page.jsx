import { Suspense } from "react";
import LoginPage from "./LoginPage";

export const metadata = {
  title: "Login",
};

const LoginPageWrapper = () => {
  return (
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  );
};

export default LoginPageWrapper;