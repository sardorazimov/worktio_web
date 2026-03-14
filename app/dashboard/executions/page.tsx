import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ExecutionsClient from "../../../components/dashboard/executions-client";


export default async function ExecutionsPage() {
  const session = await auth();
  if (!session) redirect("/");
  return <ExecutionsClient />;
}