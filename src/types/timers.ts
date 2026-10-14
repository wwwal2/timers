export interface Timer {
	type: "timer" | "countdown";
	value: number;
	order: number;
	name: string;
}

export type CountdownMode = 'display' | 'set';

export interface TimeInput {
	hours: number;
	minutes: number;
	seconds: number;
}