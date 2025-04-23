import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="container flex flex-col items-center gap-6 py-16 text-center">
      <h1 className="text-4xl font-bold">404 — Page Not Found</h1>
      <p className="max-w-md text-muted-foreground">
        Sorry, we can’t find the page you’re looking for.
      </p>
      <Button asChild>
        <Link to="/">Go home</Link>
      </Button>
    </section>
  );
}
