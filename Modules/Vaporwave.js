module.exports = (input) => {
  return input
    .replace(
      /[a-zA-Z0-9!\?\.'";:\]\[}{\)\(@#\$%\^&\*\-_=\+`~><]/g, // eslint-disable-line no-useless-escape
      (c) => String.fromCharCode(0xfee0 + c.charCodeAt(0))
    )
    .replace(/ /g, '　'); // eslint-disable-line no-useless-escape
};
