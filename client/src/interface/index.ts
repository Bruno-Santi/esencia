import { ReactNode } from "react";
export interface LayoutProps {
  children: ReactNode;
}

export interface TeamListProps {
  id: number;
  name: string;
  logo: string;
}
