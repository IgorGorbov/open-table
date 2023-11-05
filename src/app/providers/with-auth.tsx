import { ComponentType } from "react";
import { AuthProvider } from "@/features/auth";

export const withAuth =
  <T extends object>(Component: ComponentType<T>) =>
  (props: T) => (
    <AuthProvider>
      <Component {...props} />
    </AuthProvider>
  );
