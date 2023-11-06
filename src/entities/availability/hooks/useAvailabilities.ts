import { useCallback, useState } from "react";
import { isAxiosError } from "axios";
import { api } from "@/shared/api";
import { Time } from "@/shared/lib";

interface Availability {
  time: Time;
  available: boolean;
}

export function useAvailabilities(slug: string) {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailabilities = useCallback(
    async (day: string, time: string, partySize: number) => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await api.get<Availability[]>(
          `/api/restaurant/${slug}/availability`,
          {
            params: {
              day,
              time,
              partySize,
            },
          }
        );

        setAvailabilities(data);
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

  return { availabilities, loading, error, fetchAvailabilities };
}
