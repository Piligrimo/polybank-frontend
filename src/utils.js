export const pluralize = (amount, [one, two, five]) => {
    if (amount >=5 && amount <=20) return `${amount} ${five}`
    const div = amount % 10
    if (div === 1) return `${amount} ${one}`
    if (div >= 2 && div <= 4) return `${amount} ${two}`
    return `${amount} ${five}`
  }

export const setToInterval = (val, min, max) => {
  if (val < min) return min
  if (val > max) return max
  return val
}

export const currencyDictionary = {
  maxcoins: ['Макскоин','Макскоинов','Макскоинов'],
  nissomani: ['Ниссомони','Ниссомони','Ниссомони'],
  piski: ['Дичка','Дички','Дичек'],
  ilushekels: ['Илюшекель','Илюшекеля','Илюшекелей'],
  rudies: ['Рудия','Рудии','Рудий'],
}