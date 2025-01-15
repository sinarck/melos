import { useRouter } from "next/navigation";

export default function HeroPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/questionaire"); // Redirect to the questionnaire page
  };

  return (
    <div>
      <button onClick={handleGetStarted}>Get Started Now</button>
    </div>
  );
}
