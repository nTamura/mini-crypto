const maxChar = str => {
  if (str.length >= 12) {
    return str.substr(0, 10).concat('...')
  } else {
    return str
  }
}
export default maxChar
