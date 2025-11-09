import type { Metadata } from "next";
import CampaignDetail from "@/pages-src/CampaignDetail";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Campaign #${id} | PropertySimple`,
    description: "View and manage your real estate campaign",
  };
}

export default function CampaignDetailPage() {
  return <CampaignDetail />;
}
