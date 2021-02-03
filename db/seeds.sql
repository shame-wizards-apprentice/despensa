USE despensa;

-- THEMES --
INSERT INTO themes (iconClass, images, advice, createdAt, updatedAt) VALUES("metro", "[]", "[]", NOW(), NOW());
INSERT INTO themes (iconClass, images, advice, createdAt, updatedAt) VALUES("goth", "[]", "[]", NOW(), NOW());
INSERT INTO themes (iconClass, images, advice, createdAt, updatedAt) VALUES("space", "[]", "[]", NOW(), NOW());
INSERT INTO themes (iconClass, images, advice, createdAt, updatedAt) VALUES("cute", "[]", "[]", NOW(), NOW());

-- USERS --
INSERT INTO users (username, email, password, ThemeId) VALUES ("Leora Harlyn", "name@email.com", "password", 4); -- bunnies! ("kawaii" theme)
INSERT INTO users (username, email, password, ThemeId) VALUES ("Hella Margrave", "name@email.com", "password", 2); -- gothic theme
INSERT INTO users (username, email, password, ThemeId) VALUES ("Cas Reynolds", "name@email.com", "password", 3); -- sci-fi / space theme
INSERT INTO users (username, email, password, ThemeId) VALUES ("Adelaide Stromnahl", "name@email.com", "password", 1); -- default theme

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

-- CONTAINERS --
-- should we add 'position(s)'? Provide a dropdown for those as well: top, middle, bottom, left, right?
INSERT INTO containers (type, description, LocationId, UserId) VALUES ("Shelf", "Top left", 1, 1);
INSERT INTO containers (type, description, LocationId, UserId) VALUES ("Shelf", "top right", 1, 1);
INSERT INTO containers (type, description, LocationId, UserId) VALUES ("Shelf", "middle", 1, 1);
INSERT INTO containers (type, description, LocationId, UserId) VALUES ("Drawer", 1, 1);
INSERT INTO containers (type, description, LocationId, UserId) VALUES ("Shelf", 3, 2);
INSERT INTO containers (type, description, LocationId, UserId) VALUES ("Shelf", 3, 2);
INSERT INTO containers (type, description, LocationId, UserId) VALUES ("Shelf", 3, 2);
INSERT INTO containers (type, description, LocationId, UserId) VALUES ("Drawer", 3, 2);
INSERT INTO containers (type, description, LocationId, UserId) VALUES ("Shelf", 3, 2);
INSERT INTO containers (type, description, LocationId, UserId) VALUES ("Shelf", "A", 4, 2);
INSERT INTO containers (type, description, LocationId, UserId) VALUES ("Shelf", "B", 4, 2);
INSERT INTO containers (type, description, LocationId, UserId) VALUES ("Shelf", "C", 4, 2);
INSERT INTO containers (type, description, LocationId, UserId) VALUES ("Shelf", "", 2, 1);
INSERT INTO containers (type, description, LocationId, UserId) VALUES ("Shelf", "", 6, 3);
INSERT INTO containers (type, description, LocationId, UserId) VALUES ("Shelf", "", 7, 3);
INSERT INTO containers (type, description, LocationId, UserId) VALUES ("Shelf", "", 8, 4);
INSERT INTO containers (type, description, LocationId, UserId) VALUES ("Shelf", "", 9, 4);
INSERT INTO containers (type, description, LocationId, UserId) VALUES ("Shelf", "", 10, 4);

-- FOODS --
INSERT INTO food (name, brand, expirationDate, isCheese, amount, ContainerId, UserId, LocationId) VALUES ("milk", "Krogers", "2021-02-12", 0, 128, 1, 1, 1);
INSERT INTO food (name, brand, expirationDate, isCheese, amount, ContainerId, UserId, LocationId) VALUES ("strawberry yogurt", "Yoplait", "2021-03-12", 0, 32, 1, 1, 1);
INSERT INTO food (name, brand, expirationDate, isCheese, amount, ContainerId, UserId, LocationId) VALUES ("Mayonnaise", "Best Foods", "2021-04-12", 0, 20, 2, 1, 1);
INSERT INTO food (name, brand, expirationDate, isCheese, amount, ContainerId, UserId, LocationId) VALUES ("Crackers, Original", "Ritz", null, 0, 13.7, 6, 2, 3);
INSERT INTO food (name, brand, expirationDate, isCheese, amount, ContainerId, UserId, LocationId) VALUES ("Orange Juice, Pulp Free", "Simply Orange", "2021-06-12", 0, 52, 1, 1, 1);
INSERT INTO food (name, brand, expirationDate, isCheese, amount, ContainerId, UserId, LocationId) VALUES ("Butter (Canola Oil)", "Land O' Lakes", "2021-07-12", 0, 15, 2, 1, 1);