const Dish = require('../models/dishes');
const { verifyToken } = require('../utils/tokens');
const { catchAsyncErrors } = require('../middleware/errors/errors');
const { verify } = require('jsonwebtoken');

/* --------------------------------------*/
/* ------ CREATE DISH WITH PICTURE ------*/
/* --------------------------------------*/

const createDish = catchAsyncErrors(async (req, res) => {
  if (verifyToken(req.headers.token)) {
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
      price,
    } = req.body;

    const numberPrice = Number(price.replace(',', '.'));

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
      price: numberPrice,
    });

    newDish.save();

    res.status(201).json({
      status: 'ok',
      name: 'dish created',
    });
  } else {
    res.status(401).json({
      status: 'error',
      name: 'Unauthorized',
    });
  }
});

const showDish = (req, res) => {
  console.log(req.body);
  console.log(verifyToken(req.headers.token));

  res.status(201).json({
    status: 'ok',
    name: 'dish created',
  });
};

const getListOfDishes = async (req, res) => {
  //Funcion para gestionar el número de platos a devolver. Minimo 1 y máximo 64. Defecto 12
  const getLimitQuery = (limit) => {
    if (!limit) return 12;
    if (limit < 0) return 1;
    if (limit > 0 && limit <= 64) return limit;
    if (limit > 64) return 64;
  };

  // Funcion para buscar platos por una palabra. Ej: 'Lentejas'
  // El simbolo de $ es por que son campos indexados en mongoose
  const getSearchDish = (search) => {
    if (!search) return;
    if (search) return { $text: { $search: search } };
  };

  // Funcion para evaluar true o false. Se puede usar 'glutenFree'
  const getTrueFalseQuery = (field, trueFalse) => {
    if (!trueFalse || !['true', 'false'].includes(trueFalse)) return;
    if (trueFalse === 'true') return { [field]: 'true' };
    if (trueFalse === 'false') return { [field]: 'false' };
  };

  // Funcion para evaluar vegano - vegetariano

  const getVeganQuery = (veganValue) => {
    if (!veganValue || !['vegan', 'vegetarian', 'novegan'].includes(veganValue))
      return;
    return { vegan: [veganValue] };
  };

  // Query para buscar en la DB
  const resultQuery = await Dish.find({
    ...getSearchDish(req.query.text),
    ...getVeganQuery(req.query.vegan),
    ...getTrueFalseQuery('glutenFree', req.query.glutenFree),
  })
    .sort('-dateCreation')
    .populate('seller', 'name surname email')
    .limit(getLimitQuery(Number(req.query.limit)));

  // Devolvemos resultados
  res.json(resultQuery);
};

module.exports = {
  createDish,
  showDish,
  getListOfDishes,
};
