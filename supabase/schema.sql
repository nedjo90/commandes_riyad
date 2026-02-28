-- ============================================
-- LE RIAD - Iftar Commandes
-- Supabase Schema for commandes_riyad
-- ============================================

-- Menu items table
CREATE TABLE IF NOT EXISTS menu_items (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('boisson', 'entree', 'plat', 'dessert')),
  name TEXT NOT NULL,
  price NUMERIC(6,2) NOT NULL DEFAULT 0
);

-- Orders table (one row per guest, references menu items directly)
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  guest_name TEXT NOT NULL,
  boisson_id INTEGER REFERENCES menu_items(id),
  entree_id INTEGER REFERENCES menu_items(id),
  plat_id INTEGER REFERENCES menu_items(id),
  dessert_id INTEGER REFERENCES menu_items(id),
  remarks TEXT,
  total NUMERIC(8,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Public read access to menu
CREATE POLICY "Menu items are viewable by everyone"
  ON menu_items FOR SELECT
  USING (true);

-- Public full access to orders (ephemeral app, no auth needed)
CREATE POLICY "Orders are viewable by everyone"
  ON orders FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update orders"
  ON orders FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete orders"
  ON orders FOR DELETE
  USING (true);

-- ============================================
-- SEED DATA: Le Riad Menu
-- ============================================

-- BOISSONS
INSERT INTO menu_items (category, name, price) VALUES
  ('boisson', 'Rosport classique ou gazeuse (1/2)', 4.20),
  ('boisson', 'Rosport blue (1/2)', 4.20),
  ('boisson', 'Rosport viva (1/2)', 4.20),
  ('boisson', 'Eau plate (1L)', 7.40),
  ('boisson', 'Eau gazeuse (1L)', 7.40),
  ('boisson', 'Coca / Zero / Light', 2.90),
  ('boisson', 'Fanta', 2.90),
  ('boisson', 'Ice tea', 2.90),
  ('boisson', 'Sprite', 2.90),
  ('boisson', 'Schweppes tonic', 2.90),
  ('boisson', 'Schweppes bitter lemon', 2.90),
  ('boisson', 'Jus d''orange / Pomme / Ananas', 3.60),
  ('boisson', 'Jus de tomate', 3.60),
  ('boisson', 'Jus de mangue', 3.60),
  ('boisson', 'Cafe / Expresso', 2.70),
  ('boisson', 'Double expresso', 3.80),
  ('boisson', 'Capuccino chantilly', 3.90),
  ('boisson', 'Cafe marocain + canelle', 3.50),
  ('boisson', 'The menthe marocain (1 theiere)', 4.80),
  ('boisson', 'The gourmand (the + 3 patisseries)', 8.80),
  ('boisson', 'Cafe gourmand (cafe + 3 patisseries)', 8.80),
  ('boisson', 'Cocktail Le Riad (mangue, orange, menthe)', 7.60),
  ('boisson', 'Cocktail Fraicheur (peche, orange)', 5.80),
  ('boisson', 'Avocat fruits sec + lait', 7.50),
  ('boisson', 'Pas de boisson', 0.00);

-- ENTREES
INSERT INTO menu_items (category, name, price) VALUES
  ('entree', 'Harira (soupe marocaine)', 6.00),
  ('entree', 'Harira avec viande', 6.80),
  ('entree', 'Brick kefta', 6.20),
  ('entree', 'Brick thon', 6.40),
  ('entree', 'Brick vegetarienne', 6.30),
  ('entree', 'Assortiments de brick', 9.80),
  ('entree', 'Pastilla poulet', 8.20),
  ('entree', 'Pastilla fruits de mer', 9.20),
  ('entree', 'Assortiment salade marocaine', 9.50),
  ('entree', 'Salade feves citron confit', 6.60),
  ('entree', 'Salade d''aubergine (caviar)', 5.90),
  ('entree', 'Salade betteraves orient', 6.80),
  ('entree', 'Pas d''entree', 0.00);

-- PLATS
INSERT INTO menu_items (category, name, price) VALUES
  ('plat', 'Tajine agadir poulet (olives, citron)', 16.60),
  ('plat', 'Tajine poulet legumes de saison', 17.50),
  ('plat', 'Tajine kadra poulet pruneaux amandes', 16.80),
  ('plat', 'Tajine fassi poulet ananas noix', 17.90),
  ('plat', 'Tajine kefta boeuf oeuf tomate', 16.20),
  ('plat', 'Tajine zagoura boeuf figues miel', 18.60),
  ('plat', 'Tajine boeuf pruneaux amandes', 18.70),
  ('plat', 'Tajine village boeuf legumes', 18.60),
  ('plat', 'Tajine boeuf artichauts petit pois', 23.80),
  ('plat', 'Tajine souris agneau (abricots, dattes)', 21.80),
  ('plat', 'Tajine agneau caramelise poires miel', 19.80),
  ('plat', 'Tajine M''galli aubergines', 18.30),
  ('plat', 'Tajine agneau feves', 18.50),
  ('plat', 'Tajine agneau pruneaux amandes', 18.70),
  ('plat', 'Tajine agneau petits pois oignons', 19.20),
  ('plat', 'Tajine berbere (vegetarien)', 15.90),
  ('plat', 'Tajine scampis (crevettes, legumes)', 18.80),
  ('plat', 'Tajine pil pil (crevettes, poivrons)', 17.90),
  ('plat', 'Tanjia marakchia', 27.90),
  ('plat', 'Irfissa marocaine au poulet', 24.70),
  ('plat', 'Tajine pied de veau pois chiche', 26.30),
  ('plat', 'Couscous poulet', 16.40),
  ('plat', 'Couscous brochettes poulet', 16.70),
  ('plat', 'Couscous merguez', 17.20),
  ('plat', 'Couscous cotes d''agneau', 18.60),
  ('plat', 'Couscous brochettes d''agneau', 18.40),
  ('plat', 'Couscous ragout d''agneau', 18.60),
  ('plat', 'Couscous ragout de boeuf', 17.40),
  ('plat', 'Couscous kefta', 17.50),
  ('plat', 'Couscous fassi poulet', 17.90),
  ('plat', 'Couscous royal (poulet,merguez,kefta,agneau)', 21.80),
  ('plat', 'Couscous brochettes mixtes', 18.90),
  ('plat', 'Couscous riad mixte (poulet+boeuf+agneau)', 19.10),
  ('plat', 'Mechoui epaule d''agneau', 28.20),
  ('plat', 'Couscous berbere (vegetarien)', 15.90),
  ('plat', 'Riz fruits de mer (epices Atlas)', 20.10),
  ('plat', 'Riz scampis chermoula', 19.80),
  ('plat', 'Riz du prince (poulet, agneau, boeuf)', 19.70),
  ('plat', 'Riz du riad (agneau + legumes)', 19.40),
  ('plat', 'Riz du village (vegetarien)', 15.40),
  ('plat', 'Brochettes mixtes (poulet + agneau)', 18.60),
  ('plat', 'Cotes d''agneau grillees', 19.50),
  ('plat', 'Assortiment viandes grillees', 21.40),
  ('plat', 'Poulet grille au four', 17.10),
  ('plat', 'Mechoui epaule agneau rotie grillee', 28.00),
  ('plat', 'Poissons grilles (selon arrivage)', 23.90),
  ('plat', 'Menu enfant (couscous/poulet/merguez+frites)', 10.90),
  ('plat', 'Menu decouverte (entree+plat+dessert)', 35.00);

-- DESSERTS
INSERT INTO menu_items (category, name, price) VALUES
  ('dessert', 'Patisserie orientale (1 piece)', 1.90),
  ('dessert', 'Salade d''orange', 5.40),
  ('dessert', 'Tiramisu facon grand-mere', 6.80),
  ('dessert', 'Feuilletage marocaine (miel, amandes)', 4.50),
  ('dessert', 'Fondant au chocolat', 6.20),
  ('dessert', 'Glace 2 boules', 4.20),
  ('dessert', 'Glace 2 boules + chantilly', 4.80),
  ('dessert', 'Glace 3 boules', 5.80),
  ('dessert', 'Glace 3 boules + chantilly', 6.20),
  ('dessert', 'Citron givre', 5.40),
  ('dessert', 'Orange givree', 3.30),
  ('dessert', 'Coco givre', 6.50),
  ('dessert', 'Pas de dessert', 0.00);
