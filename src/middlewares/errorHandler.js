//Manejo de error para url inexistente
export const notFound = (req, res, next) => {
  return res
    .status(404)
    .send({ status: "error", message: `No Found - ${req.originalUrl}` });
};

export const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError")
    return res
      .status(400)
      .send({ status: "error", message: `${error.field} ${error.message}` });

  if (error.name === "NotFound")
    return res
      .status(404)
      .send({ status: "error", message: `${error.entityType} not found` });

  if (error.name === "DuplicatedResource")
    return res
      .status(409)
      .send({ status: "error", message: `${error.entityType} already exists` });

  return res
    .status(500)
    .send({ status: "error", message: "Something went wrong" });
};
