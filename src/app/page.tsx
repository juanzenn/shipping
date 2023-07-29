import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Shipping app",
};

export default async function Home() {
  const user = await getUser();

  if (user) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
