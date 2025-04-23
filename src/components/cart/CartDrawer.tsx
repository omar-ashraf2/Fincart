import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartItems, useCartStore, useCartSummary } from "@/stores/cartStore";
import { ShoppingCart, Trash2 } from "lucide-react";

export default function CartDrawer({ itemCount }: { itemCount: number }) {
  const items = useCartItems();
  const { remove, clear } = useCartStore();
  const { total, count } = useCartSummary();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-6 w-6 text-foreground" />
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-semibold shadow-md">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="shadow-2xl">
        <SheetHeader className="px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            <SheetTitle>Your Cart</SheetTitle>
          </div>
          <SheetDescription>
            {count === 0
              ? "Your bag is feeling light."
              : `${count} item${count > 1 ? "s" : ""} ready to check out.`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-4">
          {items.length ? (
            items.map((it) => (
              <div
                key={it.id}
                className="group flex gap-4 rounded-lg bg-muted p-2 transition-colors"
              >
                <img
                  src={it.image}
                  alt={it.title}
                  className="h-16 w-16 rounded-lg object-cover shadow-md transition-transform group-hover:scale-105"
                />
                <div className="flex-1">
                  <p className="line-clamp-2 text-sm font-semibold">
                    {it.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {it.qty} × ${it.price}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(it.id)}
                  className="h-8 w-8 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <div className="mt-20 flex flex-col items-center space-y-4">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              <p className="text-center text-sm text-muted-foreground">
                Your cart is empty. Let’s fix that! 🛍️
              </p>
            </div>
          )}
        </div>

        {count > 0 && (
          <SheetFooter className="space-y-4 px-6 py-4">
            <div className="flex justify-between text-base font-semibold">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1" onClick={clear}>
                Clear
              </Button>
              <SheetClose asChild>
                <Button className="flex-1">Checkout</Button>
              </SheetClose>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
