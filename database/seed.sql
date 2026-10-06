-- Начальные данные: категории материалов.
USE media_gallery;

INSERT IGNORE INTO categories (id, name, slug) VALUES
  (1, 'Фотографии', 'photos'),
  (2, 'Музыка', 'music'),
  (3, 'Обучение', 'education'),
  (4, 'Развлечения', 'entertainment'),
  (5, 'Другое', 'other');
