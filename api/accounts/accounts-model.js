const db = require("../../data/db-config");

const getAll = async () => {
  // SELECT * FROM accounts;
  const accounts = await db("accounts")
    .select("*");
  return accounts;
}

const getById = async id => {
  // SELECT * FROM accounts WHERE id = id;
  const account = await db("accounts")
    .select("*")
    .where("id", "=", id);
  return account;
}

const create = async newAccount => {
  // INSERT INTO accounts (name, budget) VALUES ('name', ####);
  const [accountID] = await db("accounts")
    .insert(newAccount);
  const createdAccount = await getById(accountID);
  return createdAccount;
}

const updateById = (id, account) => {
  
}

const deleteById = id => {
  // DO YOUR MAGIC
  console.log("connected")
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
