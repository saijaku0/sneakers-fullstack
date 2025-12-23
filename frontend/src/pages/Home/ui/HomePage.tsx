import { ProductList } from "@/entities/product";
import { Container } from "@/shared/ui";

export default function HomePage() {
  return (
    <Container>
      <Container className="mt-10">
        <ProductList />
      </Container>
    </Container>
  );
}
