import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found shell">
      <p className="eyebrow">404 / Route not found</p>
      <h1>This node is not in the topology.</h1>
      <p>The requested page does not exist.</p>
      <Link className="button button-primary" href="/">Return to overview</Link>
    </main>
  );
}
