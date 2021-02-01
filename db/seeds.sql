USE despensa;

-- THEMES --
INSERT INTO themes (icon_class, images, advice) VALUES("metro", "[]", "[]");
INSERT INTO themes (icon_class, images, advice) VALUES("goth", "[]", "[]");
INSERT INTO themes (icon_class, images, advice) VALUES("space", "[]", "[]");
INSERT INTO themes (icon_class, images, advice) VALUES("cute", "[]", "[]");

-- USERS --
INSERT INTO users (username, email, theme_id) VALUES ("Leora Harlyn", "name@email.com", 4); -- bunnies! ("kawaii" theme)
INSERT INTO users (username, email, theme_id) VALUES ("Hella Margrave", "name@email.com", 2); -- gothic theme
INSERT INTO users (username, email, theme_id) VALUES ("Cas Reynolds", "name@email.com", 3); -- sci-fi / space theme
INSERT INTO users (username, email, theme_id) VALUES ("Adelaide Stromnahl", "name@email.com", 1); -- default theme

-- LOCATIONS --
-- ID 1
INSERT INTO locations (name, type, user_id) VALUES ("Kitchen Fridge", "Refridgerator", 1);
-- ID 2
INSERT INTO locations (name, type, user_id) VALUES ("Kitchen Freezer", "Freezer", 1);
-- ID 3
INSERT INTO locations (name, type, user_id) VALUES ("Fridge, Kitchen", "Refridgerator", 2);
-- ID 4
INSERT INTO locations (name, type, user_id) VALUES ("Freezer, Cellar", "Freezer", 2);
-- ID 5
INSERT INTO locations (name, type, user_id) VALUES ("Pantry", "Pantry", 2);
-- ID 6
INSERT INTO locations (name, type, user_id) VALUES ("Big Fridge", "Refridgerator", 3);
-- ID 7
INSERT INTO locations (name, type, user_id) VALUES ("Chest Freezer", "Freezer", 3);
-- ID 8
INSERT INTO locations (name, type, user_id) VALUES ("Cold Storage", "Refridgerator", 4);
-- ID 9
INSERT INTO locations (name, type, user_id) VALUES ("Ice Box", "Freezer", 4);
-- ID 10
INSERT INTO locations (name, type, user_id) VALUES ("Larder", "Pantry", 4);

-- CONTAINERS --
-- should we add 'position(s)'? Provide a dropdown for those as well: top, middle, bottom, left, right?
INSERT INTO containers (type, description, location_id, user_id) VALUES ("Shelf", "Top left", 1, 1);
INSERT INTO containers (type, description, location_id, user_id) VALUES ("Shelf", "top right", 1, 1);
INSERT INTO containers (type, description, location_id, user_id) VALUES ("Shelf", "middle", 1, 1);
INSERT INTO containers (type, description, location_id, user_id) VALUES ("Drawer", 1, 1);
INSERT INTO containers (type, description, location_id, user_id) VALUES ("Shelf", 3, 2);
INSERT INTO containers (type, description, location_id, user_id) VALUES ("Shelf", 3, 2);
INSERT INTO containers (type, description, location_id, user_id) VALUES ("Shelf", 3, 2);
INSERT INTO containers (type, description, location_id, user_id) VALUES ("Drawer", 3, 2);
INSERT INTO containers (type, description, location_id, user_id) VALUES ("Shelf", 3, 2);
INSERT INTO containers (type, description, location_id, user_id) VALUES ("Shelf", "A", 4, 2);
INSERT INTO containers (type, description, location_id, user_id) VALUES ("Shelf", "B", 4, 2);
INSERT INTO containers (type, description, location_id, user_id) VALUES ("Shelf", "C", 4, 2);
INSERT INTO containers (type, description, location_id, user_id) VALUES ("Shelf", "", 2, 1);
INSERT INTO containers (type, description, location_id, user_id) VALUES ("Shelf", "", 6, 3);
INSERT INTO containers (type, description, location_id, user_id) VALUES ("Shelf", "", 7, 3);
INSERT INTO containers (type, description, location_id, user_id) VALUES ("Shelf", "", 8, 4);
INSERT INTO containers (type, description, location_id, user_id) VALUES ("Shelf", "", 9, 4);
INSERT INTO containers (type, description, location_id, user_id) VALUES ("Shelf", "", 10, 4);

-- FOODS --
INSERT INTO food (name, brand, days_to_use, is_cheese, amount, container_id, user_id) VALUES ("milk", "Krogers", 8, 0, 128, 1, 1);
INSERT INTO food (name, brand, days_to_use, is_cheese, amount, container_id, user_id) VALUES ("strawberry yogurt", "Yoplait", 87, 0, 32, 1, 1);
INSERT INTO food (name, brand, days_to_use, is_cheese, amount, container_id, user_id) VALUES ("Mayonnaise", "Best Foods", 231, 0, 20, 2, 1);
INSERT INTO food (name, brand, days_to_use, is_cheese, amount, container_id, user_id) VALUES ("Crackers, Original", "Ritz", 497, 0, 13.7, 6, 2);
INSERT INTO food (name, brand, days_to_use, is_cheese, amount, container_id, user_id) VALUES ("Orange Juice, Pulp Free", "Simply Orange", 23, 0, 52, 1, 1);
INSERT INTO food (name, brand, days_to_use, is_cheese, amount, container_id, user_id) VALUES ("Butter (Canola Oil)", "Land O' Lakes", 42, 0, 15, 2, 1);