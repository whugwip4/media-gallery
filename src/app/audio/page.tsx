import type { Metadata } from "next";
import TypeGallery from "@/components/materials/TypeGallery";

export const metadata: Metadata = { title: "Аудио" };

export default async function AudioPage(props: PageProps<"/audio">) {
  const { category } = await props.searchParams;
  return <TypeGallery type="audio" category={typeof category === "string" ? category : undefined} />;
}
