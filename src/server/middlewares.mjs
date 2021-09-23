import createError from 'http-errors';

export function catchAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
}

export function notFoundHandler(req, res, next) {
  next(createError(404));
}

export function errorHandler(err, req, res) {
  res.status(err.status || 500);
  res.send(err.message);
}
