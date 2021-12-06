const router = require('express').Router();
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require("./accounts-middleware");
const Accounts = require("./accounts-model");

router.get('/', (req, res, next) => {
  try {
    throw new Error('brokennnn')
  } catch (e) {
    next(e)
  }
})

router.get('/:id', (req, res, next) => {
  try {

  } catch (e) {
    next(e)
  }
})

router.post('/', (req, res, next) => {
  try {

  } catch (e) {
    next(e)
  }
})

router.put('/:id', (req, res, next) => {
  try {

  } catch (e) {
    next(e)
  }
});

router.delete('/:id', (req, res, next) => {
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
