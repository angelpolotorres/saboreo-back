const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  seller: { type: Schema.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  portion: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  ingredients: { type: String, require: true },
  allergens: { type: String, require: true },
  vegan: { type: String, require: true },
  glutenFree: { type: Boolean, require: true },
});

module.exports = mongoose.model('Dish', UserSchema);

// name, portion, description, images, ingredientes, allergens, vegan, vegetarian, glutenFree
