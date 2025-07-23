export default function globalError(err, req, res, next) {


  res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
    stock: err.stack,
  });
}
