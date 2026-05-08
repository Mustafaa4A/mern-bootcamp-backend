const ErrorHandler = (err, req, res, next) => {
  let errStatus = err.statusCode || 500;
  let errMsg = err.message || "Something went wrong";

  // Handling MongoDB duplicate key error
  if (err.code === 11000) {
    errStatus = 400; // Bad Request

    const duplicateField = err.message.split("key:").slice(-1)[0];

    errMsg = `Duplicate key error at '${duplicateField}'`;
  }

  // Handling MongoDB validation error
  if (err.name === "ValidationError") {
    errStatus = 400; // Bad Request
    errMsg = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

export default ErrorHandler;
