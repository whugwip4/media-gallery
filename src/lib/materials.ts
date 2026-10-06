import { mockCategories, mockMaterials } from "./mock-data";
import type { Category, Material, MaterialType } from "./types";

// Слой доступа к данным. Сейчас функции читают тестовые данные из mock-data.ts,
// а на втором этапе внутри них появятся SQL-запросы к MySQL.
// Страницы вызывают только эти функции, поэтому переписывать их не придётся.

export type MaterialFilters = {
  type?: MaterialType;
  /** Код категории из адреса, например "music". */
  category?: string;
  /** Строка поиска по названию. */
  q?: string;
  authorId?: number;
  limit?: number;
};

export type CategoryWithCount = Category & { count: number };

export async function getCategories(): Promise<Category[]> {
  return mockCategories;
}

export async function getCategoriesWithCounts(): Promise<CategoryWithCount[]> {
  return mockCategories.map((category) => ({
    ...category,
    count: mockMaterials.filter((m) => m.categoryId === category.id).length,
  }));
}

export async function getMaterials(filters: MaterialFilters = {}): Promise<Material[]> {
  const query = filters.q?.trim().toLowerCase();

  const materials = mockMaterials
    .filter((m) => !filters.type || m.type === filters.type)
    .filter((m) => !filters.category || m.categorySlug === filters.category)
    .filter((m) => !query || m.title.toLowerCase().includes(query))
    .filter((m) => filters.authorId === undefined || m.authorId === filters.authorId)
    .toSorted((a, b) => b.createdAt.localeCompare(a.createdAt));

  return filters.limit ? materials.slice(0, filters.limit) : materials;
}

export async function getLatestMaterials(limit: number): Promise<Material[]> {
  return getMaterials({ limit });
}

export async function getMaterialById(id: number): Promise<Material | null> {
  return mockMaterials.find((m) => m.id === id) ?? null;
}

export async function countByType(): Promise<Record<MaterialType, number>> {
  const counts: Record<MaterialType, number> = { image: 0, video: 0, audio: 0 };
  for (const material of mockMaterials) counts[material.type] += 1;
  return counts;
}
