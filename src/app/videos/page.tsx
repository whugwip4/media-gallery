import type { Metadata } from "next";
import TypeGallery from "@/components/materials/TypeGallery";

export const metadata: Metadata = { title: "Видео" };

export default async function VideosPage(props: PageProps<"/videos">) {
  const { category } = await props.searchParams;
  return <TypeGallery type="video" category={typeof category === "string" ? category : undefined} />;
}
