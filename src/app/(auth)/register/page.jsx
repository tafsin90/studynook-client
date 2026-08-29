import { Suspense } from "react";
import RegisterPage from "./RegisterPage";

export const metadata = {
  title: "Register",
};

const RegisterPageWrapper = () => {
  return (
    <Suspense fallback={null}>
      <RegisterPage></RegisterPage>
    </Suspense>
  );
};

export default RegisterPageWrapper;
