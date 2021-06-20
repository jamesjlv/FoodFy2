const db = require("../../config/db");

module.exports = {
  async all(limit, filter) {
    try {
      let queryFilter = ``;
      let queryLimit = ``;
      let query = ``;

      if (limit) {
        queryLimit = `LIMIT ${limit}`;
      }

      if (filter) {
        queryFilter = `
        WHERE recipes.title ILIKE '%${filter}%'
        `;
      }

      query = `
      SELECT recipes.*, chefs.name AS author
      FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      ${queryFilter}
      ${queryLimit}
      `;

      const results = await db.query(query);
      return results.rows;
    } catch (err) {
      console.log(err);
    }
  },
  async create(recipe) {
    try {
      const query = `
            INSERT INTO recipes(
                title,
                ingredients,
                preparation,
                information,
                chef_id,
                created_at
            ) values (
                $1, $2, $3, $4, $5, NOW()
            ) RETURNING ID
            `;
      const data = [
        recipe.title,
        recipe.ingredients,
        recipe.preparation,
        recipe.information,
        recipe.chef_id,
      ];

      const results = await db.query(query, data);

      return results.rows[0].id;
    } catch (err) {
      console.log(err);
    }
  },
  async find(id) {
    try {
      const results =
        await db.query(`SELECT recipes.*, chefs.id as chefId,chefs.name AS author
      FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      WHERE recipes.id=${id}
      `);
      return results.rows[0];
    } catch (err) {
      console.log(err);
    }
  },
  async update(recipe) {
    try {
      const query = `
            UPDATE recipes SET
                title = $1,
                ingredients = $2,
                preparation = $3,
                information = $4
                WHERE id = $5
            `;
      const data = [
        recipe.title,
        recipe.ingredients,
        recipe.preparation,
        recipe.information,
        recipe.id,
      ];

      const results = await db.query(query, data);

      return;
    } catch (err) {
      console.log(err);
    }
  },
  async delete(id) {
    try {
      const query = `DELETE FROM recipes WHERE id=$1`;
      const data = [Number(id)];
      await db.query(query, data);
      return;
    } catch (err) {
      console.log(err);
    }
  },
  async chefsAll() {
    try {
      const results = await db.query(
        "SELECT chefs.*, (SELECT COUNT(*) FROM RECIPES WHERE CHEFS.ID = RECIPES.CHEF_ID) AS TOTAL_RECIPES  FROM chefs ORDER BY name"
      );

      return results.rows;
    } catch (err) {
      console.log(err);
    }
  },
  async images(id) {
    try {
      const query = `SELECT files.*, recipe_files.id AS recipeFileId FROM files
      LEFT JOIN recipe_files ON ( recipe_files.file_id = files.id)
      WHERE recipe_files.recipe_id = $1`;

      const recipeId = [id];
      const images = await db.query(query, recipeId);

      return images.rows;
    } catch (err) {
      console.log(err);
    }
  },
};
