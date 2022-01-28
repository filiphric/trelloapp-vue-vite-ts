const message = (errors: string[]) => {

  const message =  errors.length > 1
    ? errors.slice(0, -1).join(', ') + ' and ' + errors.slice(-1)
    : errors[0]

  return message
}

export const listValidation = ( { body }, res, next) => {

  const errors = []

  if (!body.boardId) errors.push('\'boardId\'')
  if (!body.name) errors.push('\'name\'')

  if (errors.length) {
    return res.status(400).jsonp({
      error: `You need to provide ${message(errors)} in request body.`
    });
  }

  next()

};

export const cardValidation = ( { body }, res, next) => {

  const errors = []

  if (!body.boardId) errors.push('\'boardId\'')
  if (!body.listId) errors.push('\'listId\'')
  if (!body.name) errors.push('\'name\'')

  if (errors.length) {
    return res.status(400).jsonp({
      error: `You need to provide ${message(errors)} in request body.`
    });
  }

  next()

};