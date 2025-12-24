import Link from "next/link";

export const CompanyName = () => {
  return (
    <Link href="/">
      <h1 className="md:text-lg sm:text-sm antialiased sm:font-bold md:font-black">
        SneakerShop
      </h1>
    </Link>
  );
};
