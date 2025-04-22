import CartDrawer from "../cart/CartDrawer";
import { ModeToggle } from "../ui/mode-toggle";

const Header = ({ itemCount }: { itemCount: number }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/70 shadow-sm animate-in fade-in slide-in-from-top-5 duration-700">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        <div className="text-2xl font-bold text-primary">Fincart</div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <CartDrawer itemCount={itemCount} />
        </div>
      </div>
    </header>
  );
};

export default Header;
