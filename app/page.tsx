import { Button } from "@/components";
import { Analytics, isPro } from "@features";

export default function Home() {
  return (
    <main>
      <h1>My Project</h1>
      <p>{isPro ? "Pro Edition" : "Open Source Edition"}</p>

      <Button variant="primary">Get Started</Button>

      {/* Only renders when pro is installed */}
      {Analytics && <Analytics />}
    </main>
  );
}
