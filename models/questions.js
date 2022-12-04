const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionsSchema = new Schema({
  _id: mongoose.Types.ObjectId,
    title:String,
    imgUrl: String,
    question:String,
    answers:[{
      text:String,
      correct:{
        type:Boolean,
        default: false
      }
    }]
}, {_id: false}
)

module.exports = {Question: mongoose.model("Question", questionsSchema)}