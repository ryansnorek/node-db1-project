const db = require("../../data/db-config");

// SELECT * FROM accounts;
const getAll = () => db("accounts");

// SELECT * FROM accounts WHERE id = id;
const getById = id => db("accounts").where("id", id).first();

const create = async newAccount => {
  // INSERT INTO accounts (name, budget) VALUES ('name', ####);
  const [accountID] = await db("accounts").insert(newAccount);
  const createdAccount = await getById(accountID);
  return createdAccount;
} 

const updateById = async (id, account) => {
  // UPDATE accounts SET name = 'updated account' WHERE id = id;
  await db("accounts").update(account).where("id", id);
  const updatedAccount = await getById(id);
  return updatedAccount;
}

const deleteById = async id => {
  // DELETE FROM accounts WHERE id = id;
  await db("accounts").delete().where("id", id);
  return `deleted ${id}`;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
