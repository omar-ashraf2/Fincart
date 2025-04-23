import FilterBar from "@/components/product/FilterBar";
import ProductGrid from "@/components/product/ProductGrid";
import { ProductFilters } from "@/hooks/useInfiniteProducts";
import { useCallback, useState } from "react";

const HomePage = () => {
  const [filters, setFilters] = useState<ProductFilters>({});

  const handleChange = useCallback((f: ProductFilters) => setFilters(f), []);

  return (
    <section className="container space-y-8">
      <h2 className="text-3xl text-center font-bold font-mono tracking-tight text-primary">Products</h2>
      <FilterBar onChange={handleChange} />
      <ProductGrid filters={filters} />
    </section>
  );
};

export default HomePage;
