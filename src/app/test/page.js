"use client";

import { Link } from "@chakra-ui/next-js";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <Link href="/" color="blue.400" _hover={{ color: "blue.500" }}>
      Home
    </Link>
  );
}
