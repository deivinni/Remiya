module.exports = (text, maxLen = 1000) => {
  return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
}