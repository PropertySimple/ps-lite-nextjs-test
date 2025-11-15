import type { Metadata } from "next";
import CampaignWelcome from "@/pages-src/CampaignWelcome";

export async function generateMetadata({ params: _params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `Campaign Order Received | PropertySimple`,
    description: "Your campaign order has been received and is being processed",
  };
}

export default function CampaignWelcomePage() {
  return <CampaignWelcome />;
}
