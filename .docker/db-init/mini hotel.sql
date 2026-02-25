CREATE TABLE `groups` (
    id INT PRIMARY KEY,
    group_name VARCHAR(100) NOT NULL UNIQUE,
    `description` VARCHAR(100)
);



CREATE TABLE users (
     id INT PRIMARY KEY,
     username VARCHAR(100) NOT NULL,
     email VARCHAR(100) UNIQUE NOT NULL,
     password_hash VARCHAR(255) NOT NULL,
     group_id INT,
     is_admin BOOLEAN DEFAULT FALSE,
     FOREIGN KEY (group_id) REFERENCES `groups`(id)
     );


CREATE TABLE categories (
    id INT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
    );


CREATE TABLE questions (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    question_text VARCHAR(255) NOT NULL UNIQUE,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE question_options (
    id INT not NULL AUTO_INCREMENT PRIMARY KEY,
    option_text VARCHAR(255) NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    question_id INT,
    FOREIGN KEY (question_id) REFERENCES questions(id)
    -- FOREIGN KEY (question_options_id) REFERENCES question_options(id)
);




CREATE TABLE user_answers (
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    option_id INT NOT NULL,
    PRIMARY KEY (user_id, question_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (question_id) REFERENCES questions(id)
    -- FOREIGN KEY (option_id) REFERENCES question_options(id)
);

 


CREATE VIEW test_results AS
SELECT 
      u.id AS user_id,
      u.username,
      g.group_name,
      c.id AS category_id,
      c.category_name,
      COUNT(q.id) questions_answered,
      SUM (go.is_correct) AS scores,
      ROUND (
           IF(
           COUNNT(q.id) > 0,
           SUM(q.is_correct) * 100.0/ COUNT(q.id),
               0
            )
      , 2) AS success_rate
FROM users u
CROSS JOIN categories c
INNER JOIN questions q ON c.id = q.category_id
INNER JOIN user_answers ua ON u.id = ua.user_id AND q.id = ua.question_id
INNER JOIN question_options qo ON ua.option_id = qo.id
GROUP BY user_id, u.username, category_id, category_name;

DELIMITER //

CREATE PROCEDURE get_question_by_number(IN category_id_param INT, IN question_num INT)
READS SQL DATA 
DETERMINISTIC
BEGIN
    WITH numberred_questions AS (
        SELECT
             id,
             question_text,
             category_id,
             ROW_NUMBER() OVER (ORDER BY id) AS row_num
        FROM questions
        WHERE category_id = category_id_param
     ) SELECT
         q.id AS question_id,
         q.question_text,
         qo.id AS option_id,
         qo.option_text
        FROM numbered_questions q 
        INNER JOIN question_options qo ON q.id = qo.question_id
        WHERE q.row_num = question_num
        ORDER BY qo.id;    
END //
DELIMITER;





CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO services (name) VALUES
('Проектирование систем вентиляции'),
('Монтаж и установка'),
('Обслуживание и ремонт'),
('Поставка оборудования'),
('Выезд на объект, рсчеты и замеры'),
('Выполнение сантехнических работ под ключ'),
('Сервисное обслуживание инженерных систем'),
('Разрабатываем проекты для любых типов объектов'),




CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO products (name) VALUES
('Вентилятор YWF-4-E'),
('Рекуператор тепла'),
('Решетки'),
('Приточная установка'),
('Воздуховод гибкий'),
('Система фильтрации воздуха'),
('Шкаф управления вентиляцией'),




CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL UNIQUE,
    type ENUM('вентиляторы', 'воздуховоды', 'решетки', 'установки') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO categories (name, type) VALUES
('Вентиляторы'), 
('Воздуховоды'), 
('Решетки'), 
('Установки'),


CREATE TABLE contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    phone VARCHAR(100) NOT NULL UNIQUE,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   
);

INSERT INTO contacts (name, email, phone, message) VALUES
('Иванов Иван', 'ivanov@mail.ru', '8 900 345 67 99'), 
('Петров Петр', 'petrov@mail.ru', '8 902 567 77 88'), 
('Кузнецов Дмитрий', 'kuznec@yandex.ru', '8 952 999 54 76'), 
('Сидоров Сергей', 'sidr@mail.ru', '8 950 555 98 32'),



CREATE TABLE product_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    category_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (prodyct_id) REFERENCES product(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    UNIQUE KEY unique_product_categories (prodyct_id, category_id)
);

INSERT INTO product_categories (product_id, category_id)
SELECT product.id, category.id 
FROM product, category
WHERE category.name = 'Вентиляторы' 
AND product.name IN (
    'Вентилятор канальный', 'Вентилятор напольный', 'Вентилятор пожаростойкий'
);

INSERT INTO product_categories (product_id, category_id)
SELECT product.id, category.id 
FROM product, category
WHERE category.name = 'Установки' 
AND product.name IN (
    'Приточная установка', 'Установка с рекуператором тепла', 'Установка напольная'
);




CREATE INDEX idx_product_categories_product_id ON product_categories(product_id);
CREATE INDEX idx_product_categories_category_id ON product_categories(category_id);


END //
DELIMITER;



CREATE DATABASE IF NOT EXISTS `mini hotel`
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `moni hotel`;

-- Курсы 
-- НОМЕРА

CREATE TABLE `course` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `age` int NOT NULL,
  `months` int NOT NULL,
  `items` text NOT NULL,
  `img` text NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Группы
-- УСЛУГИ

CREATE TABLE `groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `courseid` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Записи на занятия
-- АКЦИИ

CREATE TABLE `record` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `phone` text NOT NULL,
  `courseid` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Расписание занятий

CREATE TABLE `timesheet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `time` time NOT NULL,
  `date` date NOT NULL,
  `groupid` int NOT NULL,
  `teacherid` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Оценки

CREATE TABLE `estimation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lessonid` int NOT NULL,
  `studentid` int NOT NULL,
  `score` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Профессии

CREATE TABLE `professions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `items` text NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Отзывы
-- ОТЗЫВЫ

CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `rate` int NOT NULL,
  `studentid` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- F.A.Q
-- ВОПРОСЫ

CREATE TABLE `faq` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Пользователи (ученики, преподаватели и админ)
-- ПОЛЬЗОВАТЕЛИ (ГОСТИ ПОСЕТИТЕЛИ АДМИН)

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` int NOT NULL,
  `login` text NOT NULL,
  `password` text NOT NULL,
  `firstname` text NOT NULL,
  `lastname` text NOT NULL,
  `groupid` int DEFAULT NULL,
  `avgscore` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

END //
DELIMITER;