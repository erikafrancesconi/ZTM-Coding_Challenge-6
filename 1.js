// Question 1: Clean the room function:
// given an input of [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20],
// make a function that organizes these into individual array that is ordered.
// For example answer(ArrayFromAbove) should return: 
// [[1,1,1,1],[2,2,2], 4,5,10,[20,20], 391, 392,591]. 
// Bonus: Make it so it organizes strings differently from number types. 
// i.e. [1, "2", "3", 2] should return [[1,2], ["2", "3"]]

const suddividieordina = arr => {
  if (!Array.isArray(arr) || arr.length === 0) { // Se è vuoto non faccio niente
    return arr;
  }

  let res = arr.reduce((acc, obj) => { // Suddivido in due array (numeri e stringhe)
    if (Number.isInteger(obj)) {
      acc[0].push(obj);
    } else {
      acc[1].push(obj);
    }
    return acc;
  }, [[],[]]);
  
  // Ordino gli array se pieni, altrimenti li butto via e appiattisco l'array
  if (res[0].length > 0) { // numeri
    res[0].sort((a, b) => a - b);
  } else {
    res = res.splice(1, 1); // mi tengo solo il secondo (splice restituisce l'elemento eliminato)
    res = res.flat();
  }

  if (res[1].length > 0) { // stringhe
    res[1].sort();
  } else {
    res = res.splice(0, 1); // mi tengo solo il primo
    res = res.flat();
  }
  
  return res;
};

const raggruppami = arr => {
  let tmparr = [];
  let added = [];
  
  arr.forEach(val => {
    if (Array.isArray(val)) {
      // Se l'elemento è un array (in caso di misti numeri / stringhe)
      // Vado di ricorsione
      tmparr.push(raggruppami(val));
    } else {
      if (!added.includes(val)) {
        added.push(val);
        
        // Creo array di elementi uguali
        let gemelli = arr.filter(obj => obj === val);
        
        // Se l'array ha un elemento solo lo disarrayizzo
        tmparr.push(gemelli.length > 1 ? gemelli : gemelli.reduce((acc, val) => {
          return val;
        }, ''));
      }
    }
  });
  return tmparr;
};

const daidaidai = arr => raggruppami(suddividieordina(arr));

const arr1 = [1, 2, 4, 591, 392, 391, 2, 5, 10, 2, 1, 1, 1, 20, 20];
const arr2 = [1, 3, "2", "3", "3", "1", 2, 1];
const arrvuoto = [];

const arr1raggr = daidaidai(arr1);
const arr2raggr = daidaidai(arr2);
const arrvuotoraggr = daidaidai(arrvuoto);

console.log("----- QUESTION 1 -----")
console.log('1', arr1raggr); // [[1,1,1,1],[2,2,2], 4,5,10,[20,20], 391, 392,591]
console.log('2', arr2raggr); // [[[1, 1], 2, 3], ["1", "2", ["3", "3"]]]
console.log('3', arrvuotoraggr); // []
console.log('');