import { CompanyName, Container } from "@/shared/ui";
import CartWidget from "@/widgets/CartWidget";

export default function Header() {
  return (
    <header className="sticky top-0 p-2 pt-4">
      <Container className="flex items-center justify-between p-2 rounded-md shadow backdrop-blur-sm bg-white/30">
        <CompanyName />

        <CartWidget />
      </Container>
    </header>
  );
}
