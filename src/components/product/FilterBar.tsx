import { useCategories } from "@/hooks/useCategories";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

interface Props {
  onChange: (f: { categoryId?: number | null; title?: string }) => void;
}

export default function FilterBar({ onChange }: Props) {
  const { data: cats, isLoading } = useCategories();
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);

  useEffect(() => {
    onChange({ categoryId, title: debouncedSearch || undefined });
  }, [categoryId, debouncedSearch, onChange]);

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <select
        value={categoryId ?? ""}
        onChange={(e) =>
          setCategoryId(e.target.value ? Number(e.target.value) : null)
        }
        className="border border-border rounded-md bg-background px-4 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
        disabled={isLoading}
      >
        <option value="">All categories</option>
        {cats?.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        type="search"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 border border-border rounded-md bg-background px-4 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
      />
    </div>
  );
}
