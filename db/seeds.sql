-- USERS --
-- **NOTE** added theme_id here, since users can't have more than 1 theme assigned at a time; we shouldn't have the same theme repeated in the theme table just to assign it to different users
-- if we allow CUSTOM themes would be added to the themes table ... we may have to add a "restriction" column (for user_id) so only that user can view their custom themes
INSERT INTO users (name, theme_id) VALUES ("Leora Harlyn"); -- bunnies! ("kawaii" theme)
INSERT INTO users (name, theme_id) VALUES ("Hella Margrave"); -- gothic theme
INSERT INTO users (name, theme_id) VALUES ("Cas Reynolds"); -- sci-fi / space theme
INSERT INTO users (name, theme_id) VALUES ("Adelaide Stromnahl"); -- default theme

-- THEMES --
-- **NOTE** removed user_id and changed 'advice' to advice_id
-- we should probably also have an advice table to avoid repetition
-- we should probably also put the images in a table, then use a stringified JSON object listing all the urls with their 'target' as the key (e.g. milk: "<url>/themes/<theme>/images/milk.png")
INSERT INTO themes (icon_class, images, advice_id) VALUES("metro-con", "");
INSERT INTO themes (icon_class, images, advice_id) VALUES("gothi-con");
INSERT INTO themes (icon_class, images, advice_id) VALUES("space-con");
INSERT INTO themes (icon_class, images, advice_id) VALUES("cutie-con");

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
INSERT INTO containers (type, container_id) VALUES ("Door Shelf", 1);
INSERT INTO containers (type, container_id) VALUES ("Top Shelf", 1);
INSERT INTO containers (type, container_id) VALUES ("Middle Shelf", 1);
INSERT INTO containers (type, container_id) VALUES ("Drawer", 1);
INSERT INTO containers (type, container_id) VALUES ("Shelf, Top", 3);
INSERT INTO containers (type, container_id) VALUES ("Shelf, Middle", 3);
INSERT INTO containers (type, container_id) VALUES ("Shelf, Bottom", 3);
INSERT INTO containers (type, container_id) VALUES ("Drawer, Bottom", 3);
INSERT INTO containers (type, container_id) VALUES ("Shelf, Door", 3);
INSERT INTO containers (type, container_id) VALUES ("Shelf A", 4);
INSERT INTO containers (type, container_id) VALUES ("Shelf B", 4);
INSERT INTO containers (type, container_id) VALUES ("Shelf C", 4);
INSERT INTO containers (type, container_id) VALUES ("Shelf", 2);
INSERT INTO containers (type, container_id) VALUES ("Shelf", 6);
INSERT INTO containers (type, container_id) VALUES ("Shelf", 7);
INSERT INTO containers (type, container_id) VALUES ("Shelf", 8);
INSERT INTO containers (type, container_id) VALUES ("Shelf", 9);
INSERT INTO containers (type, container_id) VALUES ("Shelf", 10);

-- FOODS --
INSERT INTO foods (name, brand, use_by_date, location_id) VALUES ("milk", "Krogers", "2021-02-11", 1);
INSERT INTO foods (name, brand, use_by_date, location_id) VALUES ("strawberry yogurt", "Yoplait", "2021-04-27", 1);
INSERT INTO foods (name, brand, use_by_date, location_id) VALUES ("Mayonnaise", "Best Foods", "", 2);
INSERT INTO foods (name, brand, use_by_date, location_id) VALUES ("Crackers, Original", "Ritz", "2024-08-21", 6);
INSERT INTO foods (name, brand, use_by_date, location_id) VALUES ("Orange Juice, Pulp Free", "Simply Orange", "2021-03-04", 1);
INSERT INTO foods (name, brand, use_by_date, location_id) VALUES ("Butter (Canola Oil)", "Land O' Lakes", "2021-09-30", 2);