import { Footer } from "@/widgets/Footer/ui/Footer";
import Header from "@/widgets/Header/ui/Header";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="min-h-screen">
        <Header />
        {children}
        <Footer />
      </main>
    </>
  );
}
