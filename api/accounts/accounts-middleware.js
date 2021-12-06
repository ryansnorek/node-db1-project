const Accounts = require("./accounts-model");
const db = require("../../data/db-config");


exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  switch(true) {
    case (name === undefined || budget === undefined):
      return (
        next({ status: 400, message: "name and budget are required" })
      );
    case (typeof name !== "string"):
      return (
        next({ status: 400, message: "name of account must be a string" })
      );
    case (name.trim().length < 3 || name.trim().length > 100):
      return (
        next({ status: 400, message: "name of account must be between 3 and 100" })
      );
    case (typeof budget !== "number" || isNaN(budget)):
      return (
        next({ status: 400, message: "budget of account must be a number" })
      );
    case (budget < 0 || budget > 1000000):
      return (
        next({ status: 400, message: "budget of account is too large or too small" })
      );
    default:
      return next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
   const nameExists = await db("accounts")
    .where("name", req.body.name.trim())
    .first()
    if (nameExists) {
      next({ status: 400, message: "that name is taken" })
    } else {
      next()
    }
  } catch (e) { next(e) }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id);
    if (!account) {
      next({ status: 404, message:"not found" })
    } else {
      req.account = account;
    }
  } catch (e) { next(e) }
}
