import { AppLink } from "@/components/app/link";

export default function NotFound() {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <AppLink href="/explore/connections">Explore Connections</AppLink>
    </div>
  );
}
