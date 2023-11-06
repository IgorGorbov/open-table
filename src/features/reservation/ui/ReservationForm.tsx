import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Loader } from "@/shared/ui";
import { useReservation } from "../hooks";

interface Inputs {
  bookerFirstName: string;
  bookerLastName: string;
  bookerPhone: string;
  bookerEmail: string;
  bookerOccasion: string;
  bookerRequest: string;
}

interface Props {
  slug: string;
  day: string;
  time: string;
  partySize: string;
}

export const ReservationForm: React.FC<Props> = ({
  slug,
  day,
  time,
  partySize,
}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { loading, error, createReservation } = useReservation(slug);

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    createReservation(data, { day, time, partySize }).then(() => {
      alert("Reservation was successfully created");

      router.replace("/");
    });

  const errorMessage =
    error ||
    errors.bookerFirstName?.message ||
    errors.bookerLastName?.message ||
    errors.bookerPhone?.message ||
    errors.bookerEmail?.message;

  return (
    <form
      className="mt-10 flex flex-wrap justify-between w-[660px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="First name"
        {...register("bookerFirstName", { required: true })}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Last name"
        {...register("bookerLastName", { required: true })}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Phone number"
        {...register("bookerPhone", { required: true })}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Email"
        {...register("bookerEmail", { required: true })}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Occasion (optional)"
        {...register("bookerOccasion")}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Requests (optional)"
        {...register("bookerRequest")}
      />
      <button
        className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
        disabled={loading}
      >
        {loading ? <Loader /> : "Complete reservation"}
      </button>
      <p className="mt-4 text-sm">
        By clicking “Complete reservation” you agree to the OpenTable Terms of
        Use and Privacy Policy. Standard text message rates may apply. You may
        opt out of receiving text messages at any time.
      </p>
      {errorMessage && (
        <span className="text-sm text-red-500">{errorMessage}</span>
      )}
    </form>
  );
};
