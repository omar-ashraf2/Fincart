import { useCategories } from "@/hooks/useCategories";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  onChange: (filters: { categoryId?: number | null; title?: string }) => void;
}

export default function FilterBar({ onChange }: Props) {
  const { data: categories, isLoading } = useCategories();
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    const filters = {
      categoryId: categoryId ?? undefined,
      title: debouncedSearch || undefined,
    };

    onChange(filters);
  }, [categoryId, debouncedSearch, onChange]);

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <Select
        value={categoryId !== null ? categoryId.toString() : "all"}
        onValueChange={(value) => {
          setCategoryId(value === "all" ? null : Number(value));
        }}
        disabled={isLoading}
      >
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent className="bg-[hsl(var(--background))] text-[hsl(var(--sheet-foreground))] border border-border shadow-md rounded-md">
          <SelectItem value="all">All categories</SelectItem>
          {categories?.map((category) => (
            <SelectItem key={category.id} value={category.id.toString()}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="search"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1"
      />
    </div>
  );
}
