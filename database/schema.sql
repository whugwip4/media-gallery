-- База данных «Мультимедийная галерея» (MySQL / MariaDB из XAMPP)
-- Импорт: phpMyAdmin → «Импорт» или mysql -u root -P 3307 < database/schema.sql

CREATE DATABASE IF NOT EXISTS media_gallery
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE media_gallery;

-- Пользователи сайта. Пароль хранится только в виде хеша.
CREATE TABLE IF NOT EXISTS users (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role          ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB;

-- Категории материалов: фотографии, музыка, обучение и т. д.
CREATE TABLE IF NOT EXISTS categories (
  id   INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_categories_name (name),
  UNIQUE KEY uq_categories_slug (slug)
) ENGINE=InnoDB;

-- Материалы галереи. У материала есть либо загруженный файл, либо ссылка (для видео).
CREATE TABLE IF NOT EXISTS materials (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title        VARCHAR(200) NOT NULL,
  description  TEXT NULL,
  type         ENUM('image', 'video', 'audio') NOT NULL,
  category_id  INT UNSIGNED NOT NULL,
  file_path    VARCHAR(255) NULL,
  external_url VARCHAR(500) NULL,
  mime_type    VARCHAR(100) NULL,
  user_id      INT UNSIGNED NOT NULL,
  created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_materials_type (type),
  KEY idx_materials_title (title),
  KEY idx_materials_created (created_at),
  CONSTRAINT fk_materials_category FOREIGN KEY (category_id)
    REFERENCES categories (id) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_materials_user FOREIGN KEY (user_id)
    REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT chk_materials_source CHECK (file_path IS NOT NULL OR external_url IS NOT NULL)
) ENGINE=InnoDB;

-- Сессии входа: в cookie браузера лежит только случайный токен,
-- а здесь хранится, какому пользователю он принадлежит и до какого времени действует.
CREATE TABLE IF NOT EXISTS sessions (
  id         CHAR(64) NOT NULL,
  user_id    INT UNSIGNED NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_sessions_user (user_id),
  CONSTRAINT fk_sessions_user FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB;
