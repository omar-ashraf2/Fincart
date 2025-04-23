import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border">
      <Skeleton className="aspect-square w-full" />

      <div className="flex flex-1 flex-col gap-3 bg-muted/60 p-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="mt-auto h-6 w-24" />
      </div>
    </div>
  );
}
