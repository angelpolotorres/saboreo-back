const errorMiddleware = (error, req, res, next) => {
  let errorObject;
  if (typeof error.toJson === 'function') {
    errorObject = error.toJson();
  } else {
    errorObject = {
      status: 500,
      name: 'UnknownError',
      message: 'Unknown Error',
    };
  }
  res.status(errorObject.status).json(errorObject);
};

const catchAsyncErrors = (callback) => {
  return async (req, res) => {
    try {
      await callback(req, res);
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }
  };
};

module.exports = {
  errorMiddleware,
  catchAsyncErrors,
};
