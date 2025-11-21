import { redirect } from 'next/navigation';
import { sedonaListing } from '@/data/mockListingData';

export default function ListingsRedirect() {
  // Redirect to the Sedona listing by default
  redirect(`/listing/${sedonaListing.id}`);
}
