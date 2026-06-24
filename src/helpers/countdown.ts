import type { TimeInput } from "../types/timers";

export const secondsToTimeInput = (seconds: number): TimeInput => {
	return {
		hours: Math.floor(seconds / 3600),
		minutes: Math.floor((seconds % 3600) / 60),
		seconds: seconds % 60,
	};
};

export const clamp = (val: number, min: number, max: number) =>
  Math.min(max, Math.max(min, val));
