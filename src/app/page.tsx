import {
  Header,
  Navbar,
  RestaurantCards,
  RestaurantCard,
} from "@/app/components";

export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <div className="max-w-screen-2xl m-auto bg-white">
        <Navbar />
        <Header />
        <RestaurantCards>
          <RestaurantCard />
        </RestaurantCards>
      </div>
    </main>
  );
}
