const router = require('express').Router();
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require("./accounts-middleware");
const Accounts = require("./accounts-model");

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll();
    res.json(accounts);
  } catch (e) { next(e) }
})

router.get('/:id', checkAccountId, (req, res) => {
  res.json(req.account);
})

router.post(
  '/', 
  checkAccountPayload, 
  checkAccountNameUnique, 
  async (req, res, next) => {
  try {
    const newAccount = await Accounts.create(req.body);
    res.status(201).json(newAccount);
  } catch (e) {
    next(e)
  }
})

router.put(
  '/:id', 
  checkAccountId,
  checkAccountPayload,
  async (req, res, next) => {
  try {
    const updatedAccount = await Accounts.updateById(req.params.id, req.body);
    res.json(updatedAccount);
  } catch (e) {
    next(e)
  }
});

router.delete(
  '/:id', 
  checkAccountId, 
  async (req, res, next) => {
  try {
    await Accounts.deleteById(req.params.id);
    res.json(req.account);
  } catch (e) {
    next(e)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
});
})

module.exports = router;
