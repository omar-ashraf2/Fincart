import logo from "@/assets/logo.png";
import CartDrawer from "../cart/CartDrawer";
import { ModeToggle } from "../ui/mode-toggle";

export default function Header({ itemCount }: { itemCount: number }) {
  return (
    <header
      className="glass sticky top-0 z-40 w-full bg-background/70 shadow-sm backdrop-blur-md"
      aria-label="Header"
    >
      <div className="container flex h-16 items-center justify-between">
        <img
          src={logo}
          alt="logo"
          className="h-10 w-auto object-contain"
        />

        <div className="flex items-center gap-4">
          <ModeToggle />
          <CartDrawer itemCount={itemCount} />
        </div>
      </div>
    </header>
  );
}
