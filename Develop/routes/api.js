const router = require("express").Router();
const Transaction = require("../models/transaction.js");
// requiring our model and a means to route

// post --- route
// we want mongoose data to be an object so we do it right in the
// paramaters of the callback instead of doing req then req.body we can just use 'body'
router.post("/api/transaction", ({ body }, res) => {
  // mongoose create new document with data from body
  Transaction.create(body)
    .then((dbTransaction) => {
      res.json(dbTransaction);
    })
    .catch((err) => {
      // remember on err we want to send a proper server status!
      res.status(404).json(err);
    });
});
// looks like a post---route that we want if we are offline. When we are back online we can post all the transactions in the queue
router.post("/api/transaction/bulk", ({ body }, res) => {
  Transaction.insertMany(body)
    .then((dbTransaction) => {
      res.json(dbTransaction);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});
// get --- route for the history of transactions to display and chart data
router.get("/api/transaction", (req, res) => {
  // empty mongoose call finds all
  Transaction.find({})
    // sorts by first date
    .sort({ date: -1 })
    .then((dbTransaction) => {
      res.json(dbTransaction);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

module.exports = router;
