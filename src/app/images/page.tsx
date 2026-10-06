import type { Metadata } from "next";
import TypeGallery from "@/components/materials/TypeGallery";

export const metadata: Metadata = { title: "Изображения" };

export default async function ImagesPage(props: PageProps<"/images">) {
  const { category } = await props.searchParams;
  return <TypeGallery type="image" category={typeof category === "string" ? category : undefined} />;
}
