const db = require("../../config/db");
const fs = require("fs");
module.exports = {
  async create(data) {
    try {
      const query = `INSERT INTO files(
                name, 
                path) 
                VALUES (
                $1, 
                $2) RETURNING id`;
      let file = [data.filename, data.path];
      const fileId = await db.query(query, file);
      file = [data.recipeId, fileId.rows[0].id];
      const recipeFile = await db.query(
        `INSERT INTO recipe_files(recipe_id, file_id) VALUES ($1, $2)`,
        file
      );
      return;
    } catch (err) {
      console.log(err);
    }
  },
  async delete(id) {
    try {
      const files = await db.query(`SELECT * from files where id='${id}'`);

      fs.unlinkSync(files.rows[0].path);

      const relation = await db.query(
        `DELETE FROM recipe_files where file_id=${files.rows[0].id}`
      );
      const results = await db.query(
        `DELETE FROM files WHERE id=${files.rows[0].id}`
      );
      return;
    } catch (err) {
      console.log(err);
    }
  },
};
