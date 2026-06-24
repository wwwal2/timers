export interface Timer {
	type: "timer" | "countdown";
	value: number;
	order: number;
	name: string;
}

export type Mode = 'display' | 'set';

export interface TimeInput {
	hours: number;
	minutes: number;
	seconds: number;
}