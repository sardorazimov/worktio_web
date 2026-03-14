import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SettingsClient from "@/components/dashboard/settings-client";

export default async function SettingsPage() {
  const session = await auth();
  if (!session) redirect("/");
  return <SettingsClient />;
}