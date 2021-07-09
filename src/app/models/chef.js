const db = require("../../config/db");
const Base = require("./base");
Base.init({ table: "chefs" });

module.exports = {
  ...Base,
  async all(filter) {
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
  async find(id) {
    try {
      const results = await db.query(`SELECT chefs.*,
      (SELECT COUNT(*) FROM RECIPES WHERE CHEFS.ID = RECIPES.CHEF_ID) AS TOTAL_RECIPES ,
      files.path, files.id as fileId FROM chefs
LEFT JOIN files ON (files.id = chefs.file_id)

      WHERE chefs.id=${id}
      ORDER BY name
      
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
ORDER BY name `
      );

      return results.rows;
    } catch (err) {
      console.log(err);
    }
  },
  async chefRecipes(id) {
    try {
      const results = await db.query(
        `SELECT * FROM recipes WHERE chef_id='${id}'`
      );
      return results.rows;
    } catch (err) {
      console.log(err);
    }
  },
};
