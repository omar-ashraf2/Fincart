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
        <Button variant="outline" className="relative">
          Cart{" "}
          <span className="absolute -top-2.5 -right-2.5 text-[10px] bg-red-400 px-1 py-[2px] rounded-full">
            {itemCount}
          </span>
        </Button>
      </SheetTrigger>

      <SheetContent
        className="
          bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl"
      >
        <SheetHeader className="border-b px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <SheetTitle>Your Cart</SheetTitle>
          </div>
          <SheetDescription className="text-muted-foreground">
            {count === 0
              ? "Your bag is feeling light."
              : `${count} item${count > 1 ? "s" : ""} ready to check out.`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {items.map((it) => (
            <div key={it.id} className="flex gap-3">
              <img
                src={it.image}
                alt={it.title}
                className="w-16 h-16 object-cover rounded-xl shadow-sm transition-transform hover:scale-[1.03]"
              />
              <div className="flex-1">
                <p className="text-sm font-medium line-clamp-2">{it.title}</p>
                <p className="text-xs text-muted-foreground">
                  {it.qty} × ${it.price}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={() => remove(it.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {count === 0 && (
            <p className="text-center text-sm text-muted-foreground mt-14">
              Nothing here yet—start shopping!
            </p>
          )}
        </div>

        {count > 0 && (
          <SheetFooter className="border-t px-6 py-4 space-y-4">
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
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
