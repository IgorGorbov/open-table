import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { ModalProps, Modal } from "@/shared/ui";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";

interface Inputs {
  email: string;
  password: string;
}

export const SignInModal: React.FC<ModalProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
        <div className="my-5">
          <AuthButton>Sign In</AuthButton>
        </div>
      </form>
    </Modal>
  );
};
