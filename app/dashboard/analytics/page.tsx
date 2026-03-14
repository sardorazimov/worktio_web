import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AnalyticsClient from "@/components/dashboard/analytics-client";

export default async function AnalyticsPage() {
  const session = await auth();
  if (!session) redirect("/");
  return <AnalyticsClient />;
}