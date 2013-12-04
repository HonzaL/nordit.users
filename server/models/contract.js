
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var ContractSchema = new Schema({
  _id: String, 
  id: String,
  port: Number, 
  title: String, 
  active: Boolean
});

mongoose.model('Contract', ContractSchema)
