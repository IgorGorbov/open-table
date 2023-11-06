import { useCallback, useState } from "react";
import { isAxiosError } from "axios";
import { api } from "@/shared/api";
import { Time } from "@/shared/lib";

interface Reservation {
  time: Time;
  available: boolean;
}

interface Data {
  bookerFirstName: string;
  bookerLastName: string;
  bookerPhone: string;
  bookerEmail: string;
  bookerOccasion: string;
  bookerRequest: string;
}

interface Params {
  day: string;
  time: string;
  partySize: string;
}

export function useReservation(slug: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createReservation = useCallback(
    async (data: Data, params: Params) => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.post<Reservation[]>(
          `/api/restaurant/${slug}/reserve`,
          data,
          {
            params,
          }
        );

        return response.data;
      } catch (error) {
        if (isAxiosError(error)) {
          setError(error.response?.data.errorMessage);
        }
      } finally {
        setLoading(false);
      }
    },
    [slug]
  );

  return { loading, error, createReservation };
}
