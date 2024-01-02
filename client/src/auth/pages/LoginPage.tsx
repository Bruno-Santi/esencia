import { AuthLayout } from "../../layaout";
import { useDocumentTitle } from "../../hooks";
import { LoginForm } from "../../components/LoginForm";

export const LoginPage =
  () => {
    useDocumentTitle(
      "Login | Esencia.ai"
    );

    return (
      <AuthLayout>
        <div className="flex flex-col">
          <LoginForm />
        </div>
      </AuthLayout>
    );
  };
