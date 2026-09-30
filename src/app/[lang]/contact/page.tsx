import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { productName } from "@/constants";

export const metadata: Metadata = {
  title: `${productName} - Contact`,
};

export default function Contact() {
  return <ContactPage />;
}
