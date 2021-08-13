const Dish = require('../models/dishes');
const { catchAsyncErrors } = require('../middleware/errors/errors');

/* --------------------------------------*/
/* ------ CREATE DISH WITH PICTURE ------*/
/* --------------------------------------*/

export const createDish = catchAsyncErrors(async (req, res) => {
  const {
    seller,
    name,
    portion,
    description,
    image,
    ingredients,
    allergens,
    vegan,
    glutenFree,
  } = req.body;

  const newDish = new Dish({
    seller,
    name,
    portion,
    description,
    image,
    ingredients,
    allergens,
    vegan,
    glutenFree,
  });

  newDish.save();

  res.status(201).json({
    status: 'ok',
    name: 'dish created',
  });
});
