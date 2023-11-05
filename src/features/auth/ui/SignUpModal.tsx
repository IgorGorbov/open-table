import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { ModalProps, Modal, Loader } from "@/shared/ui";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";
import { useAuth } from "../hooks";
import { useAuthState } from "../AuthContext";

interface Inputs {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  email: string;
  password: string;
}

export const SignUpModal: React.FC<ModalProps> = (props) => {
  const { loading, error } = useAuthState();

  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    signUp(data).then(() => props.onClose());

  return (
    <Modal {...props}>
      <form className="w-full h-[400px] p-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="uppercase font-bold text-center pb-2 border-b mb-2">
          <p className="text-small">Create Account</p>
        </div>
        <div className="w-5/6 m-auto">
          <h2 className="text-2xl font-light text-center">
            Create Your OpenTable Account
          </h2>
        </div>
        <div className="my-3 flex justify-between text-sm">
          <AuthInput
            placeholder="First name"
            {...register("firstName", { required: true })}
            errorMessage={errors.firstName?.message}
          />
          <AuthInput
            placeholder="Last name"
            {...register("lastName", { required: true })}
            errorMessage={errors.lastName?.message}
          />
        </div>
        <div>
          <AuthInput
            type="email"
            placeholder="Email"
            className="w-full"
            {...register("email", { required: true })}
            errorMessage={errors.email?.message}
          />
        </div>
        <div className="my-3 flex justify-between text-sm">
          <AuthInput
            placeholder="Phone"
            {...register("phone", { required: true })}
            errorMessage={errors.phone?.message}
          />
          <AuthInput
            placeholder="City"
            {...register("city", { required: true })}
            errorMessage={errors.city?.message}
          />
        </div>
        <div>
          <AuthInput
            type="password"
            placeholder="Password"
            className="w-full"
            {...register("password", { required: true })}
            errorMessage={errors.password?.message}
          />
        </div>
        {error && (
          <div>
            <span className="text-sm text-red-500">{error}</span>
          </div>
        )}
        <div className="my-5">
          <AuthButton disabled={loading}>
            {loading ? <Loader /> : "Create Account"}
          </AuthButton>
        </div>
      </form>
    </Modal>
  );
};
