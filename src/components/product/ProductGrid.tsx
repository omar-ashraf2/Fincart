import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";
import Spinner from "@/components/ui/Spinner";
import { ProductFilters, useAllProducts } from "@/hooks/useInfiniteProducts";
import { useCallback, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ filters }: { filters: ProductFilters }) {
  const { products, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useAllProducts(filters);

  const sentinel = useRef<HTMLDivElement | null>(null);

  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage) fetchNextPage();
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const obs = new IntersectionObserver(onIntersect, { threshold: 1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [onIntersect]);

  if (status === "pending")
    return (
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );

  if (status === "error")
    return <p className="text-destructive">Failed to load products.</p>;

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      )}
      <div ref={sentinel} className="h-10" />
    </>
  );
}
