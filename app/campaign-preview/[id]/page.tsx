import { CampaignPreviewContentRedesigned } from '@/components/CampaignPreviewContent-REDESIGNED';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CampaignPreviewPage({ params }: PageProps) {
  const { id } = await params;
  const propertyAddress = '345 Rim Shadows Dr, Sedona, AZ 86336';

  return <CampaignPreviewContentRedesigned campaignId={id} propertyAddress={propertyAddress} />;
}
