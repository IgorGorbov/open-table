import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { ModalProps, Modal, Loader } from "@/shared/ui";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";
import { useAuth } from "../hooks";
import { useAuthState } from "../AuthContext";

interface Inputs {
  email: string;
  password: string;
}

export const SignInModal: React.FC<ModalProps> = (props) => {
  const { loading, error } = useAuthState();

  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    signIn(data).then(() => props.onClose());

  return (
    <Modal {...props}>
      <form className="w-full h-[400px] p-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="uppercase font-bold text-center pb-2 border-b mb-2">
          <p className="text-small">Sign In</p>
        </div>
        <div className="w-5/6 m-auto">
          <h2 className="text-2xl font-light text-center">
            Log Into Your Account
          </h2>
        </div>
        <div className="mt-3 mb-3">
          <AuthInput
            type="email"
            placeholder="Email"
            className="w-full mb-2"
            {...register("email", { required: true })}
            errorMessage={errors.email?.message}
          />
        </div>
        <AuthInput
          type="password"
          placeholder="Password"
          className="w-full"
          {...register("password", { required: true })}
          errorMessage={errors.password?.message}
        />
        {error && (
          <div>
            <span className="text-sm text-red-500">{error}</span>
          </div>
        )}
        <div className="my-5">
          <AuthButton disabled={loading}>
            {loading ? <Loader /> : "Sign In"}
          </AuthButton>
        </div>
      </form>
    </Modal>
  );
};
