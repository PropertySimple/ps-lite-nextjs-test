import { CampaignPreviewContentRedesigned } from '@/components/CampaignPreviewContent-REDESIGNED';

export default function CampaignPreviewV2Page() {
  const campaignId = 'demo-v2';
  const propertyAddress = '345 Rim Shadows Dr, Sedona, AZ 86336';

  return <CampaignPreviewContentRedesigned campaignId={campaignId} propertyAddress={propertyAddress} />;
}
