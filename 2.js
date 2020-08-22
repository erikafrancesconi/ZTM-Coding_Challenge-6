// Question 2: Write a javascript function that takes
// an array of numbers and a target number.
// The function should find two different numbers in the array that, 
// when added together, give the target number. 
// For example: answer([1,2,3], 4) should return [1,3]

const trovami = (arr, totale) => {
  let aggiunti = [];

  return arr.reduce((acc, val, idx, currArr) => {
    if (aggiunti.includes(val)) {
      return acc;
    }

    if (val === totale) {
      aggiunti.push(val);
      acc.push(val);
    } else {
      currArr.forEach(obj => {
        if (val + obj === totale) {
          aggiunti.push(val);
          aggiunti.push(obj);
          acc.push([val, obj]);
        }
      });
    }
    return acc;
  }, []);
};

const test1 = trovami([1, 2, 3, 4, 5, 6, 7, -1, 0], 5);

console.log("----- QUESTION 2 -----");
console.log('1', test1);
console.log('');