import { AuthButton } from "@/features/auth";
import { CompanyName, Container } from "@/shared/ui";
import CartWidget from "@/widgets/CartWidget";

export default function Header() {
  return (
    <header className="sticky top-0 p-2 pt-4">
      <Container className="flex items-center justify-between p-2 rounded-md shadow backdrop-blur-sm bg-white/30">
        <CompanyName />

        <div className="flex items-center gap-2 sm:gap-4">
          <AuthButton />

          <div className="h-6 w-px bg-gray-200" />
          
          <CartWidget />
        </div>
      </Container>
    </header>
  );
}
