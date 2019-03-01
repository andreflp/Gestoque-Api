function errorHandler (res, error, next) {
  if (error.name === 'SequelizeUniqueConstraintError') {
    const param = error.errors[0].path
    res.send(400, {
      error: error.parent.sqlMessage,
      message: `Registro com ${param} já existente`
    })
    next()
  } else if (error.name === 'SequelizeValidationError') {
    res.send(400, { error: error.message })
    next()
  }
}

export default errorHandler
