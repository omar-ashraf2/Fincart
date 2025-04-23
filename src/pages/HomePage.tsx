import FilterBar from "@/components/product/FilterBar";
import ProductGrid from "@/components/product/ProductGrid";
import { ProductFilters, useAllProducts } from "@/hooks/useInfiniteProducts";
import { useCallback, useState } from "react";

export default function HomePage() {
  const [filters, setFilters] = useState<ProductFilters>({});
  const handleChange = useCallback((f: ProductFilters) => setFilters(f), []);

  const { products, status } = useAllProducts(filters, 12);

  return (
    <section className="space-y-8">
      <h2 className="text-center text-3xl font-bold tracking-tight text-primary">
        Products
      </h2>

      <FilterBar onChange={handleChange} />

      {status === "pending" || status === "error" ? (
        <ProductGrid filters={filters} />
      ) : products.length === 0 ? (
        <div className="flex h-48 items-center justify-center rounded-md bg-muted">
          <p className="text-muted-foreground">
            No products match your filters.
          </p>
        </div>
      ) : (
        <ProductGrid filters={filters} />
      )}
    </section>
  );
}
