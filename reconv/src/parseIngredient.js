export default function parseIngredient(text) {
  const re = /^((\d )?(\d+\/)?(\d+\.)?(\d))([A-z]+) +(.+)$/;
  const matches = re.exec(text);
  if (matches != null) {
    return { quantity: matches[1], unit: matches[6], name: matches[7] };
  } else {
    return null;
  }
}
