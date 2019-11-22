const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 实例化数据化模板
const BookSchema = new Schema({
    bookId: {
      type: String,
      required: true
    },
    book_name: {
    type: String,
    default: '',
    // require: true, // 是否必须填写 true是
    },
    book_img: {
        type: String,
        default: '',
    },
    author: {
        type: String,
        default: '',
    },
    publisher: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
      },
      book_count: {
        type: Number,
        default: 0,
      },
      creator_name: {
        type: String,
        default: '', 
      },
      create_time: {
        type: Date,
        default: Date.now(),
      }
})

module.exports = Books = mongoose.model("books", BookSchema);
console.log(22222, Books)
