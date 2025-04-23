import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/useCategories";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

interface Props {
  onChange: (filters: { categoryId?: number | null; title?: string }) => void;
}

export default function FilterBar({ onChange }: Props) {
  const { data: categories, isLoading } = useCategories();
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    onChange({
      categoryId: categoryId ?? undefined,
      title: debouncedSearch || undefined,
    });
  }, [categoryId, debouncedSearch, onChange]);

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <Select
        value={categoryId !== null ? String(categoryId) : "all"}
        onValueChange={(v) => setCategoryId(v === "all" ? null : Number(v))}
        disabled={isLoading}
      >
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="All categories" />
        </SelectTrigger>

        <SelectContent className="border border-border shadow-md">
          <SelectItem value="all">All categories</SelectItem>
          {categories?.map((c) => (
            <SelectItem key={c.id} value={String(c.id)}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="search"
        placeholder="Search products…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1"
      />
    </div>
  );
}
