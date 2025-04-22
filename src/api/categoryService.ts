const BASE = "https://api.escuelajs.co/api/v1";

export interface Category {
  id: number;
  name: string;
  image: string;
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE}/categories`);
  if (!res.ok) throw new Error("Failed to load categories");
  return res.json() as Promise<Category[]>;
}
