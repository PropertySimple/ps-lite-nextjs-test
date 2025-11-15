import type { Metadata } from "next";
import ContactDetail from "@/pages-src/ContactDetail";

export async function generateMetadata({ params: _params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `Contact Details | PropertySimple`,
    description: "View and manage contact information",
  };
}

export default function ContactDetailPage() {
  return <ContactDetail />;
}
