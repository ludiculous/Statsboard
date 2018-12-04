const Entry = require('../models/entry');

const create = (req, res, next) => {
  const entryProps = req.body;
  console.log(entryProps);

  Entry.create(entryProps)
    .then(entry => {
      res.send(entry)
    })
    .catch(next);
}

const searchDate = (req, res, next) => {
  const searchProps = req.body;
  console.log(searchProps)
  Entry.find(searchProps)
    .then(entry => {
      res.send(entry)
    })
    .catch(next);
}

const searchSymbol = (req, res, next) => {
  console.log("running search");
  const searchProps = req.params.symbol;
  console.log(searchProps)

  Entry.find({symbol: searchProps})
    .then(entry => {
      res.send(entry)
    })
    .catch(next);
}

const update = (req, res, next) => {
  const updateProps = req.body;
  console.log(updateProps)
  const id = updateProps._id;

  Entry.findByIdAndUpdate(
    {_id: id},
    updateProps,
    {upsert: true},
    (err, entry) =>{
      if(err) {
        return res.status(422).send({
          error: err
        })
      } else {
        return res.send(entry)
      }
    }
  )
}

const remove = (req, res, next) => {
  const id = req.params.id;
  console.log(id)

  Entry.findByIdAndDelete(
    {_id: id},
    (err, entry)=> {
      if(err) {
        return res.status(422).send({
          error: err
        })
      } else {
        return res.send(entry)
      }
    }
  )
}

const showCollection = (req, res, next) => {
  Entry.find((err, entry)=>{
    if(err) {
      return res.status(422).send({
        error: err
      })
    } else {
      return res.send(entry)
    }
  })
}

module.exports = {
  create: create,
  showCollection: showCollection,
  searchSymbol: searchSymbol,
  searchDate: searchDate,
  update: update,
  remove: remove
};