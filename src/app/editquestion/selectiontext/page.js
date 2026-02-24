import { Suspense } from "react";
import EditQuestion from "./EditQuestion";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditQuestion />
    </Suspense>
  );
}
