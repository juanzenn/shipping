import { getCurrentUser } from "@/lib/user";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Shipping app",
};

export default async function Home() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
