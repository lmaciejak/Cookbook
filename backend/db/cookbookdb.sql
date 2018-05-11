DROP DATABASE IF EXISTS cookbookdb;
CREATE DATABASE cookbookdb;

\c cookbookdb

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  email VARCHAR,
  first_name VARCHAR,
  last_name VARCHAR,
  user_img VARCHAR);

CREATE TABLE groupowners (
  group_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users,
  group_name VARCHAR NOT NULL UNIQUE,
  group_description VARCHAR);

CREATE TABLE groupfollows (
  groupfollow_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users,
  group_id INTEGER REFERENCES groupowners);

CREATE TABLE recipes (
  recipe_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users,
  recipe_name VARCHAR,
  description VARCHAR,
  recipe VARCHAR,
  img VARCHAR,
  isVegeterian BOOLEAN,
  isVegan BOOLEAN,
  fork BOOLEAN,
  forkedFrom VARCHAR,
  forkedID INTEGER,
  public BOOLEAN,
  recipe_timestamp timestamp not null default CURRENT_TIMESTAMP);

CREATE TABLE grouprecipes (
  grouprecipe_id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES recipes,
  user_id INTEGER REFERENCES users,
  group_id INTEGER REFERENCES groupowners,
  recipe_timestamp timestamp not null default CURRENT_TIMESTAMP);

CREATE TABLE favorites (
  favorites_id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES recipes,
  seen BOOLEAN,
  user_id INTEGER REFERENCES users);

CREATE TABLE followings (
  follows_id SERIAL PRIMARY KEY,
  follower_id INTEGER REFERENCES users,
  seen BOOLEAN,
  followee_id INTEGER REFERENCES users);

CREATE TABLE comments (
  comments_id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES recipes,
  user_id INTEGER REFERENCES users,
  comment VARCHAR,
  seen BOOLEAN,
  comments_timestamp timestamp not null default CURRENT_TIMESTAMP);

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
  name VARCHAR,
  notes VARCHAR);

CREATE TABLE potlucks (
  potluck_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users,
  potluck_name VARCHAR NOT NULL,
  potluck_description VARCHAR,
  potluck_date DATE,
  potluck_time TIME,
  potluck_location VARCHAR);

CREATE TABLE potluckinvitations (
  invite_id SERIAL PRIMARY KEY,
  potluck_id INTEGER REFERENCES potlucks,
  user_id INTEGER REFERENCES users,
  seen BOOLEAN,
  invitee_rsvp VARCHAR);

CREATE TABLE potluckitems (
  item_id SERIAL PRIMARY KEY,
  potluck_id INTEGER REFERENCES potlucks,
  user_id INTEGER REFERENCES users,
  item_name VARCHAR,
  item_type VARCHAR,
  recipe_id INTEGER REFERENCES recipes);

CREATE TABLE potluckmessages (
  potluckmessage_id SERIAL PRIMARY KEY,
  potluck_id INTEGER REFERENCES potlucks,
  user_id INTEGER REFERENCES users,
  comments_timestamp timestamp not null default CURRENT_TIMESTAMP);

/* username: test password: testtest
   username: Mary password: marymary
   username: Larry password: larrylarry  */

INSERT INTO users (username, password, email, first_name, last_name, user_img)
  VALUES ('luiza', '$2a$10$tHvwaxuv8qwR18wMXmQesuUWOxFT3xjQTTnvauZwYrZ6bM/r53kVW',
  'test@gmail.com', 'Luiza','Maciejak', 'https://openclipart.org/download/247324/abstract-user-flat-1.svg'),
   ('eion', '$2a$10$3xwk/yyvVXb/zf2n7uR93u1CtmMNhJmrPaIFUu0OjqEPN0Kq3/N7m', 'mary@gmail.com', 'Eion',
  'Snow', 'https://openclipart.org/download/247324/abstract-user-flat-1.svg'),
   ('Larry', '$2a$10$.MVvgjXGDNY5BspJcHdfqOMr5oEu3AxYiIxjOu8aUiA0LBXlXIWEq', 'larry@gmail.com', 'Larry',
  'Snow', 'https://openclipart.org/download/247324/abstract-user-flat-1.svg'),
   ('David','$2a$10$.MVvgjXGDNY5BspJcHdfqOMr5oEu3AxYiIxjOu8aUiA0LBXlXIWEq', 'david@gmail.com', 'david',
   'justice', 'https://openclipart.org/download/247324/abstract-user-flat-1.svg'),
   ('Gerado','$2a$10$.MVvgjXGDNY5BspJcHdfqOMr5oEu3AxYiIxjOu8aUiA0LBXlXIWEq', 'gerado@gmail.com', 'gerado',
   'justice', 'https://openclipart.org/download/247324/abstract-user-flat-1.svg'),
   ('Alton','$2a$10$.MVvgjXGDNY5BspJcHdfqOMr5oEu3AxYiIxjOu8aUiA0LBXlXIWEq', 'Alton@gmail.com', 'Alton',
   'justice', 'https://openclipart.org/download/247324/abstract-user-flat-1.svg'),
   ('Imani','$2a$10$.MVvgjXGDNY5BspJcHdfqOMr5oEu3AxYiIxjOu8aUiA0LBXlXIWEq', 'Imani@gmail.com', 'imani',
   'justice', 'https://openclipart.org/download/247324/abstract-user-flat-1.svg'),
   ('Tammy','$2a$10$.MVvgjXGDNY5BspJcHdfqOMr5oEu3AxYiIxjOu8aUiA0LBXlXIWEq', 'Tammy@gmail.com', 'tammy',
   'justice', 'https://openclipart.org/download/247324/abstract-user-flat-1.svg'),
   ('Lexus','$2a$10$.MVvgjXGDNY5BspJcHdfqOMr5oEu3AxYiIxjOu8aUiA0LBXlXIWEq', 'lexus@gmail.com', 'lexus',
   'justice', 'https://openclipart.org/download/247324/abstract-user-flat-1.svg'),
   ('Leon','$2a$10$.MVvgjXGDNY5BspJcHdfqOMr5oEu3AxYiIxjOu8aUiA0LBXlXIWEq', 'leon@gmail.com', 'leon',
   'justice', 'https://openclipart.org/download/247324/abstract-user-flat-1.svg'),
   ('Tate','$2a$10$.MVvgjXGDNY5BspJcHdfqOMr5oEu3AxYiIxjOu8aUiA0LBXlXIWEq', 'Tate@gmail.com', 'Tate',
   'justice', 'https://openclipart.org/download/247324/abstract-user-flat-1.svg'),
   ('Shaedon','$2a$10$.MVvgjXGDNY5BspJcHdfqOMr5oEu3AxYiIxjOu8aUiA0LBXlXIWEq', 'stealthy@gmail.com', 'Shaedon',
   'Blackman', 'https://openclipart.org/download/247324/abstract-user-flat-1.svg');

INSERT INTO recipes (user_id, recipe_name, recipe, img, description, isVegeterian, isVegan, fork, forkedFrom, forkedID)
  VALUES (2, 'Shrimp Risotto', 'Melt 2 tablespoons butter in medium skillet.',
  'https://pioneerwoman.files.wordpress.com/2014/07/dsc_35621.jpg', 'some description', false, false, true, null, null),
   (1, 'Fried Calamari', 'Fry the calamari', 'https://d1alt1wkdk73qo.cloudfront.net/images/guide/01751a3e8de64ce289286aa8b75e4bfe/640x478_ac.jpg', 'some description',
   false, false, false, null, null),
    (1, 'Grilled Salmon', 'Grill Salmon', 'https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb', 'some description',false, false, true, null, null),
    (1, 'Chia Blueberry Parfait', 'Stir salad', 'https://images.pexels.com/photos/160805/breakfast-vegan-healthy-eat-160805.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'some description', false, false, false, null, null),
    (2, 'Pomegranate Salad', 'Stir salad', 'https://images.pexels.com/photos/5938/food-salad-healthy-lunch.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'some description',false, false, true, null, null),
    (2, 'Chicken and Kebabs', 'Stir salad', 'https://images.pexels.com/photos/111131/meat-vegetables-gemuesepiess-mushrooms-111131.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb', 'some description',false, false, false, null, null),
    (3, 'fried chicken', '1.test1, 2.test2, 3.test3, 4.test4', 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Fried-Chicken-Leg.jpg', 'some description', false, true, true, null, null),
    (2, 'Lasagna', 'This is a demo silly :-D', 'https://www.bixfilms.fr/wp-content/uploads/2018/03/15RECIPE20DIN-articleLarge.jpg', 'My not-so-secret recipe. Enjoy!',false, false, true, null, null),
    (11, 'Lasagna', 'This is a demo silly :-D', 'https://www.bixfilms.fr/wp-content/uploads/2018/03/15RECIPE20DIN-articleLarge.jpg', 'My not-so-secret recipe. Enjoy!',false, false, true, 'eion', 8),
    (4, 'Lasagna', 'This is a demo silly :-D', 'https://www.bixfilms.fr/wp-content/uploads/2018/03/15RECIPE20DIN-articleLarge.jpg', 'My not-so-secret recipe. Enjoy!',false, false, true, 'eion', 8);

INSERT INTO favorites (recipe_id, user_id)
  VALUES (1, 2), (1, 3), (2, 2), (2,3), (3,2), (4, 2), (5, 1), (6,1);

INSERT INTO followings (follower_id, followee_id)
  VALUES (1, 2), (1, 3), (2, 1), (2, 3), (3,1), (3,2), (12,1), (12,3);

INSERT INTO comments (recipe_id, user_id, comment)
  VALUES (1, 1, 'awesome recipe!'), (2, 2, 'love it');

INSERT INTO foods (food_name, isVegeterian, isVegan)
  VALUES ('shrimp', false, false), ('arborio rice', true, true);

INSERT INTO ingredients (recipe_id, food_id, amount, name, notes)
  VALUES (1, 1, '1 pound', 'oil', 'medium'), (2, 2, '1 ounce', 'onion', 'null'),
  (7, 2, '1pound', 'salt', 'medium'), (7, 2, '2pound', 'chicken', 'large'), (8, 2, '4', 'eggplants', 'fresh'),
  (8, 2, '3 bags', 'mozzarella', 'vegan'), (8, 2, '5', 'tomatoes', 'diced'),
  (9, 2, '4 bags', 'provolone', 'shredded'), (9, 2, '5', 'tomatoes', 'diced'),(9, 2, '10 slices', 'cheddar', 'white/yellow'),
  (9, 2, '24 oz', 'chicken', 'lean'),(10, 2, '3 bags', 'broccoli', 'crunchy'), (10, 2, '5 bags', 'american cheese', 'sliced');

INSERT INTO groupowners (user_id, group_name, group_description)
  VALUES (3, 'Bronx Cooks', 'we from the bronx bro');

INSERT INTO potlucks (user_id, potluck_name, potluck_description, potluck_date, potluck_time, potluck_location)
  VALUES (1, 'Barbecue', 'Throwing a barbecue party in my backyard', '2018-04-10', '02:00:00', 'My house'),
  (2, 'Annual Cookout', 'Get ready for the best cookout yet', '2018-04-20', '04:00:00', 'Central Park');

INSERT INTO potluckinvitations (potluck_id, user_id, invitee_rsvp, seen)
  VALUES (1, 2, 'yes', false), (1, 3, 'yes', false), (1, 4, 'no', false), (1, 5, 'yes', false), (1, 6, 'maybe', false),
  (2, 3, 'no', false), (2, 4, 'maybe', false), (2, 5, 'yes', false), (2, 6, 'yes', false), (2, 12, 'no', false);

INSERT INTO potluckitems (potluck_id, user_id, item_name, item_type)
  VALUES (1, 3, 'Brownies', 'dessert'), (1, 2, 'Cups', 'utensils'), (1, 5, 'Chicken parm', 'main'),
  (2, 5, 'Cake', 'dessert'), (2, 6, 'Soda', 'beverage');

INSERT INTO potluckitems (potluck_id, item_name, item_type)
  VALUES (1, 'Soda', 'beverage');

