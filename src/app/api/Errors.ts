const getError = (type: string) => {
  const ErrorsMap = {
    Conflict: 'Пользователь с тамим именем уже существует',
    Unauthorized: 'Пользователь с таким именем и паролем не существует',
  }

  return ErrorsMap[type as keyof typeof ErrorsMap] ?? 'Ошибка'
}

export default getError
