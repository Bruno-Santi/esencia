import { User } from "../dashboard";

export interface AuthState {
  loading: boolean;
  errorMessage: string | null;
  errorRegisterMessage: string | null;
  status: string | null;
  user: User | null;
}
