USE despensa;

-- ADVICE --
INSERT INTO advice(content, createdAt, updatedAt) VALUES("Never be far from a can of corn", NOW(), NOW());
INSERT INTO advice(content, createdAt, updatedAt) VALUES("Refrigerator does not have a d in it", NOW(), NOW());

-- THEMES --
INSERT INTO themes (iconClass, images, createdAt, updatedAt) VALUES("metro", "[]", NOW(), NOW());
INSERT INTO themes (iconClass, images, createdAt, updatedAt) VALUES("goth", "[]", NOW(), NOW());
INSERT INTO themes (iconClass, images, createdAt, updatedAt) VALUES("space", "[]", NOW(), NOW());
INSERT INTO themes (iconClass, images, createdAt, updatedAt) VALUES("cute", "[]", NOW(), NOW());

-- USERS --
INSERT INTO users (username, email, password, ThemeId) VALUES ("Leora Harlyn", "name@email.com", "password", 4); -- bunnies! ("kawaii" theme)
INSERT INTO users (username, email, password, ThemeId) VALUES ("Hella Margrave", "name@email.com","password", 2); -- gothic theme
INSERT INTO users (username, email, password, ThemeId) VALUES ("Cas Reynolds", "name@email.com","password", 3); -- sci-fi / space theme
INSERT INTO users (username, email, password, ThemeId) VALUES ("Adelaide Stromnahl", "name@email.com","password", 1); -- default theme

-- LOCATIONS --
-- ID 1
INSERT INTO locations (name, type, UserId) VALUES ("Kitchen Fridge", "Refridgerator", 1);
-- ID 2
INSERT INTO locations (name, type, UserId) VALUES ("Kitchen Freezer", "Freezer", 1);
-- ID 3
INSERT INTO locations (name, type, UserId) VALUES ("Fridge, Kitchen", "Refridgerator", 2);
-- ID 4
INSERT INTO locations (name, type, UserId) VALUES ("Freezer, Cellar", "Freezer", 2);
-- ID 5
INSERT INTO locations (name, type, UserId) VALUES ("Pantry", "Pantry", 2);
-- ID 6
INSERT INTO locations (name, type, UserId) VALUES ("Big Fridge", "Refridgerator", 3);
-- ID 7
INSERT INTO locations (name, type, UserId) VALUES ("Chest Freezer", "Freezer", 3);
-- ID 8
INSERT INTO locations (name, type, UserId) VALUES ("Cold Storage", "Refridgerator", 4);
-- ID 9
INSERT INTO locations (name, type, UserId) VALUES ("Ice Box", "Freezer", 4);
-- ID 10
INSERT INTO locations (name, type, UserId) VALUES ("Larder", "Pantry", 4);


-- FOODS --
INSERT INTO food (name, brand, daysToUse, isCheese, amount, UserId) VALUES ("milk", "Krogers", 8, 0, 128, 1);
INSERT INTO food (name, brand, daysToUse, isCheese, amount, UserId) VALUES ("strawberry yogurt", "Yoplait", 87, 0, 32, 1);
INSERT INTO food (name, brand, daysToUse, isCheese, amount, UserId) VALUES ("Mayonnaise", "Best Foods", 231, 0, 20, 1);
INSERT INTO food (name, brand, daysToUse, isCheese, amount, UserId) VALUES ("Crackers, Original", "Ritz", 497, 0, 13.7, 2);
INSERT INTO food (name, brand, daysToUse, isCheese, amount, UserId) VALUES ("Orange Juice, Pulp Free", "Simply Orange", 23, 0, 52, 1);
INSERT INTO food (name, brand, daysToUse, isCheese, amount, UserId) VALUES ("Butter (Canola Oil)", "Land O' Lakes", 42, 0, 15, 1);