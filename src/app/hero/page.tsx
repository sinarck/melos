import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HeroPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/questionaire"); // Redirect to the questionnaire page
  };

  return (
    <div>
      <Button onClick={handleGetStarted}>Get Started Now</Button>
    </div>
  );
}

