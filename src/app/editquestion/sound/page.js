import { Suspense } from "react";
import EditSoundQuestion from "./EditSoundQuestion";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditSoundQuestion />
    </Suspense>
  );
}
