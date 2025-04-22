import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
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
