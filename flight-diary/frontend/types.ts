export type Weather = "sunny" | "rainy" | "cloudy" | "stormy" | "windy";

export type Visibility = "great" | "good" | "ok" | "poor";

export interface Entries {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

export type NewEntry = Omit<Entries, "id">;
