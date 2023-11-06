import { GetStaticProps } from "next";
import { useSearchParams } from "next/navigation";
import { getRestaurantBySlug, getRestaurants } from "@/entities/restaurant";
import { Header, ReservationForm } from "@/features/reservation";

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  main_image: string;
  description: string;
  slug: string;
  open_time: string;
  close_time: string;
}

interface Props {
  restaurant: Restaurant;
}

interface SearchParams {
  date: string;
  partySize: string;
}

export const ReservePage: React.FC<Props> = ({
  restaurant: { name, main_image, slug },
}) => {
  const searchParams = useSearchParams();

  const date = searchParams?.get("date") ?? new Date().toISOString();
  const partySize = searchParams?.get("partySize") ?? "1";

  const [day, time] = date?.split("T");

  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <Header
          name={name}
          image={main_image}
          date={date}
          partySize={partySize}
        />
        <ReservationForm
          slug={slug}
          day={day}
          time={time}
          partySize={partySize}
        />
      </div>
    </div>
  );
};

export const getReserveStaticProps: GetStaticProps = async ({ params }) => {
  const restaurant = await getRestaurantBySlug(params?.slug as string, {
    select: {
      id: true,
      name: true,
      images: true,
      main_image: true,
      description: true,
      slug: true,
      open_time: true,
      close_time: true,
    },
  });

  return {
    props: {
      restaurant,
    },
  };
};

export const getReserveStaticPaths = async () => {
  const restaurants = await getRestaurants({
    select: {
      slug: true,
    },
  });

  const paths = restaurants.map((restaurant) => {
    return {
      params: {
        slug: restaurant.slug,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};
