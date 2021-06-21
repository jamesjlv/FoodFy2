const db = require("../../config/db");

module.exports = {
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
  async create(chef) {
    try {
      const query = `
            INSERT INTO chefs(
                name,
                file_id,
                created_at             
            ) values (
                $1, $2, NOW()
            ) RETURNING ID
            `;
      const data = [chef.name, chef.fileId];

      const results = await db.query(query, data);

      return results.rows[0].id;
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
  async update(chef) {
    try {
      let query = ``;
      let data = [];
      if (chef.fileId) {
        query = `
              UPDATE chefs SET
                  name = $1,
                  file_id = $2
                  WHERE id = $3
              `;
        data = [chef.name, chef.fileId, chef.id];
      } else {
        query = `
              UPDATE chefs SET
                  name = $1
                  WHERE id = $2
              `;
        data = [chef.name, chef.id];
      }

      const results = await db.query(query, data);

      return;
    } catch (err) {
      console.log(err);
    }
  },
  async delete(id) {
    try {
      const query = `DELETE FROM chefs WHERE id=$1`;
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
