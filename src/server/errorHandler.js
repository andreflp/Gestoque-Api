function errorHandler (res, error, next) {
  if (error.name === 'SequelizeUniqueConstraintError') {
    res.send(400, { error: error.parent.sqlMessage })
    next()
  } else if (error.name === 'SequelizeValidationError') {
    res.send(400, { error: error.message })
    next()
  }
}

export default errorHandler
