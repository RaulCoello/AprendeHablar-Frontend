import { Suspense } from "react";
import EditImageQuestion from "./EditImageQuestion";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditImageQuestion />
    </Suspense>
  );
}
