export default function parseIngredient(text) {
  const re = /^(\d+)(\/(\d+))?([A-z]+) +([A-z]+)$/;
  const matches = re.exec(text);
  if (matches != null) {
    const quantity = formatQuantity(matches[1], matches[3]);
    return { quantity: quantity, unit: matches[4], name: matches[5] };
  } else {
    return null;
  }
}

function formatQuantity(n, d) {
  if (d == null) {
    return n;
  } else {
    return `${n}/${d}`;
  }
}
