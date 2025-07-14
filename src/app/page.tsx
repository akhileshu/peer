import { Components } from "@/components";

export default function Home() {
  return (
    <main>
      <h1>welcome to solo to squard - landing page</h1>
      <Components.Link
        title="Find new people to connect with"
        href="/connections/recommendations"
      >
        Explore Connections
      </Components.Link>
    </main>
  );
}
