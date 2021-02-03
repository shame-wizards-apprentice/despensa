USE despensa;

-- ADVICE --
INSERT INTO advice(content, createdAt, updatedAt) VALUES("Never be far from a can of corn", NOW(), NOW());
INSERT INTO advice(content, createdAt, updatedAt) VALUES("Refrigerator does not have a d in it", NOW(), NOW());

-- THEMES --
INSERT INTO themes (iconClass, images, createdAt, updatedAt) VALUES("metro", "[]", "[]", NOW(), NOW());
INSERT INTO themes (iconClass, images, createdAt, updatedAt) VALUES("goth", "[]", "[]", NOW(), NOW());
INSERT INTO themes (iconClass, images, createdAt, updatedAt) VALUES("space", "[]", "[]", NOW(), NOW());
INSERT INTO themes (iconClass, images, createdAt, updatedAt) VALUES("cute", "[]", "[]", NOW(), NOW());

-- USERS --
INSERT INTO users (username, email, ThemeId) VALUES ("Leora Harlyn", "name@email.com", 4); -- bunnies! ("kawaii" theme)
INSERT INTO users (username, email, ThemeId) VALUES ("Hella Margrave", "name@email.com", 2); -- gothic theme
INSERT INTO users (username, email, ThemeId) VALUES ("Cas Reynolds", "name@email.com", 3); -- sci-fi / space theme
INSERT INTO users (username, email, ThemeId) VALUES ("Adelaide Stromnahl", "name@email.com", 1); -- default theme

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
INSERT INTO food (name, brand, daysToUse, isCheese, amount, ContainerId, UserId) VALUES ("milk", "Krogers", 8, 0, 128, 1, 1);
INSERT INTO food (name, brand, daysToUse, isCheese, amount, ContainerId, UserId) VALUES ("strawberry yogurt", "Yoplait", 87, 0, 32, 1, 1);
INSERT INTO food (name, brand, daysToUse, isCheese, amount, ContainerId, UserId) VALUES ("Mayonnaise", "Best Foods", 231, 0, 20, 2, 1);
INSERT INTO food (name, brand, daysToUse, isCheese, amount, ContainerId, UserId) VALUES ("Crackers, Original", "Ritz", 497, 0, 13.7, 6, 2);
INSERT INTO food (name, brand, daysToUse, isCheese, amount, ContainerId, UserId) VALUES ("Orange Juice, Pulp Free", "Simply Orange", 23, 0, 52, 1, 1);
INSERT INTO food (name, brand, daysToUse, isCheese, amount, ContainerId, UserId) VALUES ("Butter (Canola Oil)", "Land O' Lakes", 42, 0, 15, 2, 1);