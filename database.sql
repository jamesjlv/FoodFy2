
CREATE TABLE chefs
(
    id SERIAL NOT NULL,
    name text,
    created_at timestamp without time zone DEFAULT (now()),
    file_id integer,
    updated_at timestamp without time zone DEFAULT (now()),
    PRIMARY KEY (id)
);

CREATE TABLE files
(
    id SERIAL NOT NULL,
    name text,
    path text NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE recipe_files
(
    id SERIAL NOT NULL,
    recipe_id integer,
    file_id integer,
    PRIMARY KEY (id)
);

CREATE TABLE recipes
(
    id SERIAL NOT NULL,
    chef_id integer,
    title text NOT NULL,
    ingredients text[],
    preparation text[],
    information text,
    created_at timestamp without time zone DEFAULT (now()),
    updated_at timestamp without time zone DEFAULT (now()),
    user_id integer NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE session
(
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL,
    PRIMARY KEY (sid)
);

CREATE TABLE users
(
    id SERIAL NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    reset_token text,
    reset_token_expires text,
    is_admin boolean,
    created_at timestamp without time zone DEFAULT (now()),
    updated_at timestamp without time zone DEFAULT (now()), 
    PRIMARY KEY (id)
);

ALTER TABLE chefs
    ADD FOREIGN KEY (file_id)
    REFERENCES files (id)
    NOT VALID;


ALTER TABLE recipe_files
    ADD FOREIGN KEY (file_id)
    REFERENCES files (id)
    NOT VALID;


ALTER TABLE recipe_files
    ADD FOREIGN KEY (recipe_id)
    REFERENCES recipes (id)
    NOT VALID;


ALTER TABLE recipes
    ADD FOREIGN KEY (user_id)
    REFERENCES users (id)
    NOT VALID;
    

-- Create Procedure

CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN 
  NEW.updated_at=NOW();
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

-- auto update_at products

CREATE TRIGGER trigger_set_timestamp
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER trigger_set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER trigger_set_timestamp
BEFORE UPDATE ON chefs
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();



-- Softdelete

ALTER TABLE "recipe_files" DROP CONSTRAINT recipe_files_recipe_id_fkey,
ADD CONSTRAINT recipe_files_recipe_id_fkey
FOREIGN KEY ("recipe_id")
REFERENCES "recipes" ("id")
ON DELETE CASCADE;


ALTER TABLE "recipes" DROP CONSTRAINT recipes_user_id_fkey,
ADD CONSTRAINT recipes_user_id_fkey
FOREIGN KEY ("user_id")
REFERENCES "users" ("id")
ON DELETE CASCADE;