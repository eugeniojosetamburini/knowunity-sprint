import { DueListScreen } from "./DueListScreen";

// Due list (SPEC.md #2) and its all-caught-up state (#2a). A server
// component solely so the `?caughtUp=1` flag can be read from the Page's
// own `searchParams` prop: this route is statically prerendered, and
// `useSearchParams` inside it would need the whole screen wrapped in a
// Suspense boundary. The screen itself lives in DueListScreen.tsx.

export default async function DueList({ searchParams }: PageProps<"/due-list">) {
  const { caughtUp } = await searchParams;
  return <DueListScreen caughtUp={caughtUp === "1"} />;
}
