const db = require("../../data/db-config");

// SELECT * FROM accounts;
const getAll = () => db("accounts");

// SELECT * FROM accounts WHERE id = id;
const getById = id => db("accounts").where("id", id).first();

// INSERT INTO accounts (name, budget) VALUES ('name', ####);
const create = async newAccount => {
  const [id] = await db("accounts").insert(newAccount);
  return getById(id);
}; 

// UPDATE accounts SET name = 'updated account' WHERE id = id;
const updateById = async (id, account) => {
  await db("accounts").where("id", id).update(account);
  return getById(id);
}

// DELETE FROM accounts WHERE id = id;
const deleteById = id => db("accounts").where("id", id).del();

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
