import { Suspense } from "react";
import PlayGame from "./PlayGame";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlayGame />
    </Suspense>
  );
}
