import { fetchProducts, Product } from "@/api/productService";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface ProductFilters {
  categoryId?: number | null;
  title?: string;
}

export function useInfiniteProducts(filters: ProductFilters, limit = 10) {
  return useInfiniteQuery({
    queryKey: ["products", limit, filters],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchProducts(pageParam, limit, filters.categoryId, filters.title),
    getNextPageParam: (last) => last.nextOffset,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAllProducts(filters: ProductFilters, limit = 10) {
  const q = useInfiniteProducts(filters, limit);
  const products: Product[] = q.data?.pages.flatMap((p) => p.items) ?? [];
  return { products, ...q };
}
