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
                image,
                title,
                ingredients,
                preparation,
                information,
                chef_id,
                created_at
            ) values (
                $1, $2, $3, $4, $5,$6, NOW()
            ) RETURNING ID
            `;
      const data = [
        recipe.image,
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
                image = $1,
                title = $2,
                ingredients = $3,
                preparation = $4,
                information = $5
                WHERE id = $6
            `;
      const data = [
        recipe.image,
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
};
