const BASE = "https://api.escuelajs.co/api/v1";

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: { id: number; name: string };
  description: string;
}

export interface ProductPage {
  items: Product[];
  nextOffset: number | null;
}

async function $get<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

export async function fetchProducts(
  offset: number,
  limit: number,
  categoryId?: number | null,
  title?: string
): Promise<ProductPage> {
  const params = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
  });
  if (categoryId) params.append("categoryId", categoryId.toString());
  if (title) params.append("title", title);

  const items = await $get<Product[]>(`${BASE}/products?${params.toString()}`);
  return {
    items,
    nextOffset: items.length === limit ? offset + limit : null,
  };
}
