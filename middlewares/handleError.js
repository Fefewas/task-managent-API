const handleError = (err, res) => {
  const statusCode = err.statusCode || 500;
  const logDetails = {
    message: err.message,
    stack: err.stack,
    timestamp: new Date().toISOString()
  };

  console.error("Error Details:", logDetails);

  res.status(statusCode).send({
    message: "Ocurrió un error interno en el servidor",
    details: statusCode === 500 ? "Por favor, intenta más tarde." : err.message,
  });
};

module.exports = handleError;
