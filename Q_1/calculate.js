function calculator(data) {
    let sortedData = data.sort(function (a, b) {
      return +a - +b;
    });
    uniq = [...new Set(sortedData)];
    return uniq;
  }
  
module.exports = calculator;
  