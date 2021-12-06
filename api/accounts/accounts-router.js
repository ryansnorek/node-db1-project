const router = require('express').Router();
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require("./accounts-middleware");
const Accounts = require("./accounts-model");

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll();
    res.json(accounts);
  } catch (e) { next(e) }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id);
    res.json(account);
  } catch (e) { next(e) }
})

router.post(
  '/', 
  checkAccountPayload, 
  checkAccountNameUnique, 
  (req, res, next) => {
  try {

  } catch (e) {
    next(e)
  }
})

router.put(
  '/:id', 
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
  try {

  } catch (e) {
    next(e)
  }
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  try {

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
