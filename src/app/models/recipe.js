const db = require("../../config/db");
const Base = require("./base");

Base.init({ table: "recipes" });
module.exports = {
  ...Base,
  async all(limit, filter) {
    try {
      let queryFilter = ``;
      let queryLimit = ``;
      let query = ``;

      if (limit) {
        queryLimit = `LIMIT ${limit} `;
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
      ORDER BY recipes.created_at 
      ${queryLimit}
      
      `;

      const results = await db.query(query);

      return results.rows;
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
  async chefsAll() {
    try {
      const results = await db.query(
        `SELECT chefs.*, (SELECT COUNT(*) 
        FROM RECIPES 
        WHERE CHEFS.ID = RECIPES.CHEF_ID) AS TOTAL_RECIPES ,
        files.path
FROM chefs 
LEFT JOIN files ON (files.id =file_id)
ORDER BY created_at `
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
