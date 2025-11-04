import { Spinner } from "@/app/_components/ui/spinner";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Spinner/>
    </div>
  );
}