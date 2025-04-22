import { Product } from "@/api/productService";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "../ui/button";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const add = useCartStore((s) => s.add);

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border-[hsl(var(--border))] bg-[hsl(var(--card))]
 text-card-foreground shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg duration-300"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Button
          onClick={() =>
            add({
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.images[0],
            })
          }
          className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out bg-[hsl(var(--info))] text-[hsl(var(--info-foreground))] text-sm font-semibold px-4 py-2 rounded-md shadow-md hover:bg-[hsl(var(--info)/0.8)]"
        >
          Add to Cart
        </Button>
      </div>

      <div className="flex flex-col gap-2 p-4 bg-muted">
        <h3 className="text-base font-semibold line-clamp-2">
          {product.title}
        </h3>
        <p className="text-primary font-bold text-lg">${product.price}</p>
      </div>
    </div>
  );
}
