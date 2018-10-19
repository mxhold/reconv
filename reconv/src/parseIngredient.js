export default function parseIngredient(text) {
  const re = /^((?:\d+ )?\d+[/.]?\d*)([A-z]+) +(.+)$/;
  const matches = re.exec(text);
  if (matches != null) {
    return { quantity: matches[1], unit: matches[2], name: matches[3] };
  } else {
    return null;
  }
}
