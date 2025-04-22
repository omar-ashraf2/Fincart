import Spinner from "@/components/ui/Spinner";
import { ProductFilters, useAllProducts } from "@/hooks/useInfiniteProducts";
import { useCallback, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ filters }: { filters: ProductFilters }) {
  const { products, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useAllProducts(filters);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage) fetchNextPage();
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const el = bottomRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(handleObserver, {
      root: null,
      threshold: 1,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [handleObserver]);

  if (status === "pending") return <Spinner />;
  if (status === "error")
    return <p className="text-destructive">Failed to load products.</p>;

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <div ref={bottomRef} className="h-10" />
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      )}
    </>
  );
}
