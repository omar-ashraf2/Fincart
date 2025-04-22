import CartDrawer from "@/components/cart/CartDrawer";
import { Outlet } from "react-router-dom";
import { useCartStore } from "./stores/cartStore";

export default function Layout() {
  const useCartCount = () =>
    useCartStore((s) => Object.values(s.items).reduce((n, i) => n + i.qty, 0));
  const itemCount = useCartCount();

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header itemCount={itemCount} />
        <main className="flex-1 container mx-auto p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

function Header({ itemCount }: { itemCount: number }) {
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">🛒 Fincart</h1>
        <CartDrawer itemCount={itemCount} />
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer className="border-t py-4 text-center text-sm">
      © {new Date().getFullYear()} Omar Ashraf
    </footer>
  );
}
