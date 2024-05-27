import { AuthLayout } from "../../layaout";
import { useDocumentTitle } from "../../hooks";

import { RegisterForm } from "../../components/RegisterForm";
export const RegisterPage = () => {
  useDocumentTitle("Registro | Esencia.app");
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};
