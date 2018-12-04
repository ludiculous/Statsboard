const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntrySchema = new Schema(
  {
    symbol: String,
    pnl: Number,
    updated: {type: Date, default: Date.now}
  },
  { timestamps: true}
)

const Entry = mongoose.model('entry', EntrySchema);
module.exports = Entry;
