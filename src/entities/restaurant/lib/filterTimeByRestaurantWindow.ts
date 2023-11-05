import { times } from "@/shared/config";

export function filterTimeByRestaurantWindow(
  openTime: string,
  closeTime: string
) {
  const timesWithinWindow: typeof times = [];

  let isWithinWindow = false;

  for (const time of times) {
    if (time.time === openTime) {
      isWithinWindow = true;
    }

    if (isWithinWindow) {
      timesWithinWindow.push(time);
    }

    if (time.time === closeTime) {
      isWithinWindow = false;
    }
  }

  return timesWithinWindow;
}
