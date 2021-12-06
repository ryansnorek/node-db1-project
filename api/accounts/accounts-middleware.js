const Accounts = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  switch(true) {
    case (!name || !budget):
      return (
        res.status(400).json({ message: "name and budget are required" })
      );
    case (typeof name !== "string"):
      return (
        res.status(400).json({ message: "name of account must be a string" })
      );
    case (name.trim() < 3 || name.trim() > 100):
      return (
        res.status(400).json({ message: "name of account must be between 3 and 100" })
      );
    case (typeof budget !== "number"):
      return (
        res.status(400).json({ message: "budget of account must be a number" })
      );
    case (budget < 0 || budget > 1000000):
      return (
        res.status(400).json({ message: "budget of account is too large or too small" })
      );
    default:
      return next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll();
    const nameExists = accounts.find(account => account.name === req.body.name);
    if (nameExists) {
      return res.status(400).json({ message: "that name is taken" });
    } else next();
  } catch (e) {
    next(e);
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const accountExists = await Accounts.getById(req.params.id);
    if (!accountExists) res.status(404).json({ message: "account not found" });
  } catch (e) {
    next(e);
  }
}
