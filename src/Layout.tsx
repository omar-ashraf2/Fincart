import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Spinner from "@/components/ui/Spinner";
import ErrorPage from "@/pages/ErrorPage";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import { useCartStore } from "./stores/cartStore";

export default function Layout() {
  const useCartCount = () =>
    useCartStore((s) => Object.values(s.items).reduce((n, i) => n + i.qty, 0));
  const itemCount = useCartCount();

  const boundary = (ErrorBoundary as unknown) ? (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <Suspense fallback={<PageSpinner />}>
        <Header itemCount={itemCount} />
        <main className="container flex flex-col py-8 min-h-[calc(100vh-theme(spacing.32))]">
          <Outlet />
        </main>
        <Footer />
      </Suspense>
    </ErrorBoundary>
  ) : (
    <Suspense fallback={<PageSpinner />}>
      <Header itemCount={itemCount} />
      <main className="container flex flex-col py-8 min-h-[calc(100vh-theme(spacing.32))]">
        <Outlet />
      </main>
      <Footer />
    </Suspense>
  );

  return boundary;
}

function PageSpinner() {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <Spinner />
    </div>
  );
}
