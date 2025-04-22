import { fetchProducts, Product } from "@/api/productService";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface ProductFilters {
  categoryId?: number | null;
  title?: string;
}

export function useInfiniteProducts(filters: ProductFilters, limit = 12) {
  return useInfiniteQuery({
    queryKey: ["products", limit, filters],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchProducts(
        pageParam,
        limit,
        filters.categoryId ?? undefined,
        filters.title?.trim() || undefined
      ),
    getNextPageParam: (last) => last.nextOffset,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAllProducts(filters: ProductFilters, limit = 12) {
  const query = useInfiniteProducts(filters, limit);
  const products: Product[] =
    query.data?.pages.flatMap((page) => page.items) ?? [];

  return {
    products,
    ...query,
  };
}
