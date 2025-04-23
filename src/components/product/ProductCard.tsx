import { Product } from "@/api/productService";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { useRef } from "react";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const add = useCartStore((s) => s.add);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleAdd = () => {
    add({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
    });

    const img = imgRef.current;
    const cart = document.querySelector("#cart-icon");
    if (!img || !cart) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    const dx = cartRect.left - imgRect.left;
    const dy = cartRect.top - imgRect.top;

    const clone = img.cloneNode(true) as HTMLImageElement;
    clone.style.setProperty("--dx", `${dx}px`);
    clone.style.setProperty("--dy", `${dy}px`);
    clone.classList.add("fly-img");
    clone.style.top = imgRect.top + "px";
    clone.style.left = imgRect.left + "px";
    clone.style.width = imgRect.width + "px";
    clone.style.height = imgRect.height + "px";
    document.body.appendChild(clone);
    clone.addEventListener("animationend", () => clone.remove());
  };

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border">
      <div className="relative overflow-hidden">
        <img
          ref={imgRef}
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="block w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <Button
          size="sm"
          variant="secondary"
          onClick={handleAdd}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
        >
          Add to Cart
        </Button>
      </div>

      <div className="flex flex-1 flex-col gap-1 bg-muted/60 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
          {product.title}
        </h3>

        {product.description && (
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {product.description}
          </p>
        )}

        <p className="mt-auto text-primary text-sm font-semibold">
          ${product.price}
        </p>
      </div>
    </div>
  );
}
