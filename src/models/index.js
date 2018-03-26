const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://60.205.179.15:27017/tally-book';

// 连接数据库
mongoose.connect(DB_URL, (err, db) => {
  if (!err) {
    console.log('connected success');
  } else {
    console.log('connected fail');
  }
});

const models = {
  record: {
    amount: { type: Number, require: true },
    desc: String,
    type1: String,
    type2: String,
    create_time: { type: Number, require: true },
  },
  user: {
    name: { type: String, require: true },
    sex: { type: String, require: false },
    gender: { type: String, require: false },
    city: { type: String, require: false },
    country: { type: String, require: false },
    create_time: { type: Number, require: true },
  },
};

for (const m in models) {
  if (Object.prototype.hasOwnProperty.call(models, m)) {
    mongoose.model(m, new mongoose.Schema(models[m]));
  }
}

module.exports = {
  getModel(name) {
    return mongoose.model(name);
  },
};
