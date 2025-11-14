import { Metadata } from "next";
import Contact from "./Contact";

export const metadata: Metadata = {
  title: "Contact | Club",
  description:
    "Get in touch with Club. We're here to help with your next big tech project.",
};

export default function ContactPage() {
  return <Contact />;
}
