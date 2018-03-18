
DROP DATABASE IF EXISTS cookbookdb;
CREATE DATABASE cookbookdb;

\c cookbookdb

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  email VARCHAR,
  first_name VARCHAR,
  last_name VARCHAR);

  CREATE TABLE recipes (
  recipe_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users,
  recipe_name VARCHAR,
  recipe VARCHAR,
  img VARCHAR,
  isVegeterian BOOLEAN,
  isVegan BOOLEAN,
  recipe_timestamp timestamp not null default CURRENT_TIMESTAMP);

CREATE TABLE favorites (
  favorites_id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES recipes,
  user_id INTEGER REFERENCES users);

CREATE TABLE followings (
  follows_id SERIAL PRIMARY KEY,
  follower_id INTEGER REFERENCES users,
  followee_id INTEGER REFERENCES users);

CREATE TABLE comments (
  comments_id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES recipes,
  user_id INTEGER REFERENCES users,
  comment VARCHAR);


CREATE TABLE foods (
  food_id SERIAL PRIMARY KEY,
  food_name VARCHAR,
  isVegeterian BOOLEAN,
  isVegan BOOLEAN);

CREATE TABLE ingredients (
  ingredient_id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES recipes,
  food_id INTEGER REFERENCES foods,
  amount VARCHAR,
  notes VARCHAR);

/* username: test password: testtest 
   username: Mary password: marymary
   username: Larry password: larrylarry  */

INSERT INTO users (username, password, email, first_name, last_name)
  VALUES ('test', '$2a$10$tHvwaxuv8qwR18wMXmQesuUWOxFT3xjQTTnvauZwYrZ6bM/r53kVW',
  'test@gmail.com', 'John','Snow'),
   ('Mary', '$2a$10$3xwk/yyvVXb/zf2n7uR93u1CtmMNhJmrPaIFUu0OjqEPN0Kq3/N7m', 'mary@gmail.com', 'Mary',
  'Snow'), 
   ('Larry', '$2a$10$.MVvgjXGDNY5BspJcHdfqOMr5oEu3AxYiIxjOu8aUiA0LBXlXIWEq', 'larry@gmail.com', 'Larry',
  'Snow');

INSERT INTO recipes (user_id, recipe_name, recipe, img, isVegeterian, isVegan)
  VALUES (2, 'Shrimp Risotto', 'Melt 2 tablespoons butter in medium skillet.', 
  'https://assets.epicurious.com/photos/57990944437fcffe02f722fc/6:4/w_620%2Ch_413/shrimp-risotto.jpg', false, false),
   (1, 'Fried Calamari', 'Fry the calamari', 'https://www.fifteenspatulas.com/wp-content/uploads/2016/01/Fried-Calamari-Recipe-Fifteen-Spatulas-1.jpg', 
   false, false);

INSERT INTO favorites (recipe_id, user_id)
  VALUES (1, 2), (1, 3), (2, 2), (2,3);

INSERT INTO followings (follower_id, followee_id)
  VALUES (1, 2), (1, 3), (2, 1), (2, 3);

INSERT INTO comments (recipe_id, user_id, comment)
  VALUES (1, 1, 'awesome recipe!'), (2, 2, 'love it');

INSERT INTO foods (food_name, isVegeterian, isVegan)
  VALUES ('shrimp', false, false), ('arborio rice', true, true);

INSERT INTO ingredients (recipe_id, food_id, amount, notes)
  VALUES (1, 1, '1 pound', 'medium'), (2, 2, '1 ounce', null);

