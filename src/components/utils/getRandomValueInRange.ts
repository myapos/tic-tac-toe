const getRandomValueInRange = (upperRangeLimit: number) => {
  const randomNumber = Math.floor(Math.random() * upperRangeLimit)
  return randomNumber
}

export default getRandomValueInRange
