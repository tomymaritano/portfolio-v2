import type { Metadata } from "next";
import { PageLayout, PageHeader } from "@/components/PageLayout";
import { GuestbookForm } from "./GuestbookForm";
import { GuestbookEntries } from "./GuestbookEntries";

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Leave a message and say hi! Sign my digital guestbook.",
};

export const revalidate = 60;

export default function GuestbookPage() {
  return (
    <PageLayout size="md">
      <PageHeader
        badge="Community"
        title="Guestbook"
        description="Leave a message, share your thoughts, or just say hi! This is my digital guestbook."
      />

      <GuestbookForm />
      <GuestbookEntries />
    </PageLayout>
  );
}
