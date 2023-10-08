import { Header, ReservationForm } from "@/pages/reserve/ui";

export const ReservePage = () => {
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <Header />
        <ReservationForm />
      </div>
    </div>
  );
};
