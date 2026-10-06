export type MaterialType = "image" | "video" | "audio";

export type UserRole = "user" | "admin";

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Material {
  id: number;
  title: string;
  description: string;
  type: MaterialType;
  categoryId: number;
  categoryName: string;
  categorySlug: string;
  /** Адрес загруженного файла (картинка, видео или аудио). */
  fileUrl: string | null;
  /** Ссылка на видео со стороннего сайта, если файл не загружали. */
  externalUrl: string | null;
  authorId: number;
  authorName: string;
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}
