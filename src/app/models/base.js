const db = require("../../config/db");
const bcrypt = require("bcryptjs");
const { Query } = require("pg");

function find(filters, table) {
  try {
    let query = `SELECT * FROM ${table}`;

    if (filters) {
      Object.keys(filters).map((key) => {
        query += ` ${key} `;

        Object.keys(filters[key]).map((field) => {
          query += ` ${field}='${filters[key][field]}'`;
        });
      });
    }
    return db.query(query);
  } catch (err) {
    console.log(err);
  }
}

const Base = {
  init({ table }) {
    if (!table)
      throw new Error("Invalid Params, you need to pass the table parameter");

    this.table = table;

    return this;
  },
  async find(filters) {
    try {
      const results = await find(filters, this.table);
      return results.rows[0];
    } catch (err) {
      console.log(err);
    }
  },
  async findOne(id) {
    try {
      const results = await find({ where: { id: id } }, this.table);

      return results.rows[0];
    } catch (err) {
      console.log(err);
    }
  },
  async findAll(filters) {
    try {
      const results = await find(filters, this.table);
      return results.rows;
    } catch (err) {
      console.log(err);
    }
  },
  async create(fields) {
    try {
      let query = `INSERT INTO ${this.table}(`;

      Object.keys(fields).map((field, index, array) => {
        if (index + 1 != array.length) {
          query += `${field}, `;
        } else {
          query += `${field})`;
        }
      });

      query += `VALUES(`;

      Object.keys(fields).map((field, index, array) => {
        if (index + 1 != array.length) {
          // for arrays its necessary to construct the value like ARRAY['value','value2'], so the if above makes this.
          if (typeof fields[field] == "object") {
            query += `ARRAY[`;
            fields[field].map((value, index, array) => {
              if (index + 1 != array.length) {
                query += `'${value}',`;
              } else {
                query += `'${value}'`;
              }
            });
            query += `],`;
          } else {
            query += `'${fields[field]}', `;
          }
        } else {
          // for arrays its necessary to construct the value like ARRAY['value','value2'], so the if above makes this.
          if (typeof fields[field] == "object") {
            query += `ARRAY[`;
            fields[field].map((value, index, array) => {
              if (index + 1 != array.length) {
                query += `'${value}',`;
              } else {
                query += `'${value}'`;
              }
            });
            query += `]`;
          } else {
            query += `'${fields[field]}') `;
          }
        }
      });

      query += ` RETURNING id`;

      const results = await db.query(query);
      return results.rows[0].id;
    } catch (err) {
      console.log(err);
    }
  },
  async update(id, fields) {
    try {
      if (fields.password) {
        fields.password = bcrypt.hashSync(fields.password, 8);
      }

      let query = `UPDATE ${this.table} SET `;

      Object.keys(fields).map((field, index, array) => {
        if (index + 1 != array.length) {
          if (typeof fields[field] == "object") {
            query += `${field} = ARRAY[`;
            fields[field].map((value, index, array) => {
              if (index + 1 != array.length) {
                query += `'${value}', `;
              } else {
                query += `'${value}'`;
              }
            });
            query += `], `;
          } else {
            query += ` ${field} = '${fields[field]}', `;
          }
        } else {
          if (typeof fields[field] == "object") {
            query += `${field} = ARRAY[`;
            fields[field].map((value, index, array) => {
              if (index + 1 != array.length) {
                query += `'${value}', `;
              } else {
                query += `'${value}'`;
              }
            });
            query += `] `;
          } else {
            query += ` ${field} = '${fields[field]}' `;
          }
        }
      });

      query += ` WHERE id='${id}'`;

      await db.query(query);
      return;
    } catch (err) {
      console.log(err);
    }
  },
  async delete(id) {
    try {
      await db.query(`DELETE FROM ${this.table} WHERE id='${id}'`);
      return;
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = Base;
