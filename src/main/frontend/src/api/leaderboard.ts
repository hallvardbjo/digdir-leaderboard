import type {Data} from "./data.ts";

const API_URL:string = "http://localhost:8080";

export async function getMessage(): Promise<Data[]> {
  const res = await fetch(`${API_URL}/leaderboard/bench`);

  if (!res.ok) {
    throw new Error("Failed to fetch message");
  }

  return res.json(); // 👈 important: raw string
}