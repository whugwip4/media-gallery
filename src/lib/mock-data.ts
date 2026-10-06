import type { Category, Material, User } from "./types";

// Временные данные первой недели: по ним видно, как будут выглядеть страницы.
// Когда подключим MySQL, эти записи будут браться из базы данных.

export const mockCategories: Category[] = [
  { id: 1, name: "Фотографии", slug: "photos" },
  { id: 2, name: "Музыка", slug: "music" },
  { id: 3, name: "Обучение", slug: "education" },
  { id: 4, name: "Развлечения", slug: "entertainment" },
  { id: 5, name: "Другое", slug: "other" },
];

export const mockUser: User = {
  id: 2,
  name: "Иван Петров",
  email: "ivan.petrov@example.com",
  role: "user",
  createdAt: "2026-10-01T10:15:00",
};

const authors: Record<number, string> = {
  1: "Администратор",
  2: "Иван Петров",
  3: "Анна Смирнова",
  4: "Мария Ковалёва",
};

type MockMaterial = Omit<Material, "categoryName" | "categorySlug" | "authorName">;

const rawMaterials: MockMaterial[] = [
  {
    id: 1,
    title: "Закат над городом",
    description: "Вечерний город с высоты: последние лучи солнца и силуэты домов.",
    type: "image",
    categoryId: 1,
    fileUrl: "/demo/sunset.svg",
    externalUrl: null,
    authorId: 3,
    createdAt: "2026-10-06T18:40:00",
  },
  {
    id: 2,
    title: "Lo-fi для учёбы",
    description: "Спокойная инструментальная музыка, под которую удобно заниматься.",
    type: "audio",
    categoryId: 2,
    fileUrl: null,
    externalUrl: null,
    authorId: 2,
    createdAt: "2026-10-06T12:10:00",
  },
  {
    id: 3,
    title: "Как работает Git за 5 минут",
    description: "Короткое объяснение коммитов, веток и слияния на простом примере.",
    type: "video",
    categoryId: 3,
    fileUrl: null,
    externalUrl: null,
    authorId: 4,
    createdAt: "2026-10-05T16:00:00",
  },
  {
    id: 4,
    title: "Горное озеро",
    description: "Озеро в горах ранним утром, в воде отражаются вершины.",
    type: "image",
    categoryId: 1,
    fileUrl: "/demo/lake.svg",
    externalUrl: null,
    authorId: 2,
    createdAt: "2026-10-05T09:30:00",
  },
  {
    id: 5,
    title: "Таймлапс ночного города",
    description: "Ускоренная съёмка: как меняется город с вечера до глубокой ночи.",
    type: "video",
    categoryId: 4,
    fileUrl: null,
    externalUrl: null,
    authorId: 3,
    createdAt: "2026-10-04T21:05:00",
  },
  {
    id: 6,
    title: "Схема «браузер — сервер — база данных»",
    description: "Как браузер, сервер Next.js и база данных MySQL обмениваются данными.",
    type: "image",
    categoryId: 3,
    fileUrl: "/demo/scheme.svg",
    externalUrl: null,
    authorId: 4,
    createdAt: "2026-10-04T14:20:00",
  },
  {
    id: 7,
    title: "Подкаст: путь во фронтенд",
    description: "Разговор о том, с чего начать изучение веб-разработки.",
    type: "audio",
    categoryId: 3,
    fileUrl: null,
    externalUrl: null,
    authorId: 3,
    createdAt: "2026-10-03T19:45:00",
  },
  {
    id: 8,
    title: "Неоновая абстракция",
    description: "Цифровой арт с яркими неоновыми линиями.",
    type: "image",
    categoryId: 4,
    fileUrl: "/demo/neon.svg",
    externalUrl: null,
    authorId: 2,
    createdAt: "2026-10-03T11:00:00",
  },
  {
    id: 9,
    title: "Утренний джаз",
    description: "Лёгкий джаз для начала дня: фортепиано, контрабас и щётки.",
    type: "audio",
    categoryId: 2,
    fileUrl: null,
    externalUrl: null,
    authorId: 4,
    createdAt: "2026-10-02T08:25:00",
  },
  {
    id: 10,
    title: "Прогулка по набережной",
    description: "Видео с вечерней прогулки: огни, река и уличные музыканты.",
    type: "video",
    categoryId: 5,
    fileUrl: null,
    externalUrl: null,
    authorId: 1,
    createdAt: "2026-10-01T15:35:00",
  },
  {
    id: 11,
    title: "Звуки дождя",
    description: "Запись дождя за окном, десять минут для отдыха и концентрации.",
    type: "audio",
    categoryId: 5,
    fileUrl: null,
    externalUrl: null,
    authorId: 3,
    createdAt: "2026-10-01T09:05:00",
  },
];

export const mockMaterials: Material[] = rawMaterials.map((material) => {
  const category = mockCategories.find((c) => c.id === material.categoryId);
  return {
    ...material,
    categoryName: category?.name ?? "Без категории",
    categorySlug: category?.slug ?? "",
    authorName: authors[material.authorId] ?? "Неизвестный автор",
  };
});
