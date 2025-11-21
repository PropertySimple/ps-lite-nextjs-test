import { CampaignPreviewContent } from '@/components/CampaignPreviewContent';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CampaignPreviewPage(props: PageProps) {
  const params = await props.params;
  const campaignId = params.id;
  const propertyAddress = '345 Rim Shadows Dr, Sedona, AZ 86336';

  return <CampaignPreviewContent campaignId={campaignId} propertyAddress={propertyAddress} />;
}
