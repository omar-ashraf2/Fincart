import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ErrorPage({ error }: { error?: Error }) {
  return (
    <section className="container flex flex-col items-center gap-6 py-16 text-center">
      <h1 className="text-4xl font-bold text-destructive">
        Something went wrong
      </h1>
      <p className="max-w-md text-muted-foreground">
        {error?.message ??
          "We couldn't load this page. Please try again later."}
      </p>
      <Button asChild variant="secondary">
        <Link to="/">Back to Home</Link>
      </Button>
    </section>
  );
}
