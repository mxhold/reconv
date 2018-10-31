function parseIngredient(string) {
  const re = /^((?:\d+ )?\d+[/.]?\d*)([A-z]+) +(.+)$/;
  const matches = re.exec(string);
  if (matches != null) {
    return { 
      success: true,
      result: {
        quantity: matches[1],
        unit: matches[2],
        name: matches[3],
      },
    };
  } else {
    return {
      success: false,
      error: 'provided string "' + string + '" cannot be parsed with regex ' + re,
    };
  }
}

module.exports = parseIngredient;