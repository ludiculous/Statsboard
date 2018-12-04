const express = require('express');
const Entry = require('../controllers/entry');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('hit api home page');
})

router.get('/searchSymbol/:symbol', Entry.searchSymbol);
router.get('/showCollection', Entry.showCollection);
router.post('/create', Entry.create);
router.put('/update', Entry.update);
router.delete('/remove/:id', Entry.remove);

module.exports = router;