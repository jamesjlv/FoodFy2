CREATE TABLE files (
id SERIAL PRIMARY KEY,
  NAME TEXT,
PATH TEXT NOT NULL
)

CREATE TABLE users(
	id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
	password TEXT NOT NULL,
	reset_token TEXT,
  reset_token_expires TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT(now()),
  updated_at TIMESTAMP DEFAULT(now())
)

ALTER TABLE "recipes" ADD COLUMN user_id integer
ALTER TABLE "recipes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id")



ALTER TABLE "recipe_files" DROP CONSTRAINT recipe_files_recipe_id_fkey,
ADD CONSTRAINT recipe_files_recipe_id_fkey
FOREIGN KEY ("recipe_id")
REFERENCES "recipes" ("id")
ON DELETE CASCADE;