// Question 3:
// Write a function that convertToRgbs HEX to RGB.
// Then Make that function autodect the formats
// so that if you enter HEX color format it returns RGB
// and if you enter RGB color format it returns HEX.
// Bonus: Release this tool as a npm package.

const convertToRgb = hex => {
  const allowed = [4, 5, 7, 9]; // Lunghezze valide
  if (!hex.startsWith('#') || !allowed.includes(hex.length)) {
    return 'Invalid Color';
  }

  let r, g, b, op, rd, gd, bd, opd, rgbcolor;
  
  if (hex.length === 7 || hex.length === 9) {
    r = hex.substr(1, 2);
    g = hex.substr(3, 2);
    b = hex.substr(5, 2);
    if (hex.length === 9) {
      op = hex.substr(7, 2);
    }
  } else {
    r = hex.substr(1, 1).padEnd(2, hex.substr(1, 1))
    g = hex.substr(2, 1).padEnd(2, hex.substr(2, 1));
    b = hex.substr(3, 1).padEnd(2, hex.substr(3, 1));
    if (hex.length === 5) {
      op = hex.substr(4, 1).padEnd(2, hex.substr(4, 1));
    }
  }
  
  rd = parseInt(r, 16);
  gd = parseInt(g, 16);
  bd = parseInt(b, 16);
  rgbcolor = `rgb(${rd}, ${gd}, ${bd}`;
  if (op) {
    opd = (parseInt(op, 16) / 255).toFixed(2);
    rgbcolor += `, ${opd}`;
    rgbcolor = rgbcolor.replace('rgb', 'rgba');
  }
  rgbcolor += ')';
  
  return rgbcolor;
}

const convertToHex = rgb => {
  if (!rgb.startsWith('rgb') || !rgb.includes(',')) {
    return 'Invalid Color';
  }

  rgb = rgb.replace('rgba', '').replace('rgb', '').replace('(', '').replace(')', '');
  const colors = rgb.split(',');

  if (colors.length < 3) {
    return 'Invalid Color';
  }

  let r, g, b, op = '';
  r = (+colors[0]).toString(16).padStart(2, '0');
  g = (+colors[1]).toString(16).padStart(2, '0');
  b = (+colors[2]).toString(16).padStart(2, '0');
  if (colors.length === 4) {
    op = Math.ceil((+colors[3]*255)).toString(16);
  }

  return `#${r}${g}${b}${op}`;
}

const convert = color => {
  if (typeof color !== 'string') {
    return 'Invalid Color';
  }

  if (color.startsWith('#')) {
    return convertToRgb(color);
  }
  if (color.startsWith('rgb')) {
    return convertToHex(color);
  }
  return 'Invalid Color';
}

console.log("----- QUESTION 3 -----");

// Valid
console.log('#fc327d', convert('#fc327d'));
console.log('#fbb', convert('#fbb'));
console.log('#fbb2', convert('#fbb2'));
console.log('#fc327d78', convert('#fc327d78'));
console.log('rgb(234, 5, 67)', convert('rgb(234, 5, 67)'));
console.log('rgba(4, 65, 167, 0.3)', convert('rgba(4, 65, 167, 0.3)'));

// Not valid
console.log('#fc32d', convert('#fc32d'));
console.log('rgb(234, 5)', convert('rgb(234, 5)'));
console.log(456, convert(456));
console.log('red', convert('red'));
console.log('');