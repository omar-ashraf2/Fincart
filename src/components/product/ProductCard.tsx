import { Product } from "@/api/productService";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const add = useCartStore((s) => s.add);

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border">
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="block w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <Button
          size="sm"
          variant="secondary"
          className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
          onClick={() =>
            add({
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.images[0],
            })
          }
        >
          Add to Cart
        </Button>
      </div>

      <div className="flex flex-1 flex-col gap-1 bg-muted/60 p-4">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug">
          {product.title}
        </h3>
        <p className="mt-auto text-primary text-lg font-bold">
          ${product.price}
        </p>
      </div>
    </div>
  );
}
