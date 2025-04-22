import FilterBar from "@/components/product/FilterBar";
import ProductGrid from "@/components/product/ProductGrid";
import { ProductFilters } from "@/hooks/useInfiniteProducts";
import { useCallback, useState } from "react";

const HomePage = () => {
  const [filters, setFilters] = useState<ProductFilters>({});

  const handleChange = useCallback((f: ProductFilters) => setFilters(f), []);

  return (
    <section className="space-y-8 max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold tracking-tight">Products</h2>
      <FilterBar onChange={handleChange} />
      <ProductGrid filters={filters} />
    </section>
  );
};

export default HomePage;
