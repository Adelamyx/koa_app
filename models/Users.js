const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 实例化数据化模板
const UserSchema = new Schema({
  name: {
    type: String,
    require: true, // 是否必须填写 true是
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  }
})


// 将UserSchema编译成model
module.exports = Users = mongoose.model("users", UserSchema);

