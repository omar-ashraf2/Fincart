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
        <Button
          variant="ghost"
          size="icon"
          className="relative focus:outline-none transition-transform hover:scale-110 active:scale-95"
        >
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

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {items.length > 0 ? (
            items.map((it) => (
              <div
                key={it.id}
                className="flex gap-4 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-all group animate-in fade-in-50 duration-500"
              >
                <img
                  src={it.image}
                  alt={it.title}
                  className="w-16 h-16 rounded-lg object-cover shadow-md transition-transform group-hover:scale-105"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground line-clamp-2">
                    {it.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {it.qty} × ${it.price}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:bg-destructive/10 transition-colors"
                  onClick={() => remove(it.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center mt-20 space-y-4">
              <ShoppingCart className="h-12 w-12 text-muted-foreground transition-colors" />
              <p className="text-center text-sm text-muted-foreground">
                Your cart is empty. Let’s fix that! 🛍️
              </p>
            </div>
          )}
        </div>

        {count > 0 && (
          <SheetFooter className="px-6 py-4 space-y-4">
            <div className="flex justify-between text-base font-semibold text-foreground">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                className="flex-1 hover:opacity-80 transition"
                onClick={clear}
              >
                Clear
              </Button>
              <SheetClose asChild>
                <Button className="flex-1 hover:opacity-90 transition">
                  Checkout
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
