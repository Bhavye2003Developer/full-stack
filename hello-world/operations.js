function add(...exp) {
    let sum = 0;
    for (let i = 0; i < exp.length; ++i) {
        sum += exp[i]
    }
    return sum
}


function multiply(...exp) {
    let mul = 1;
    for (let i = 0; i < exp.length; ++i) {
        mul *= exp[i]
    }
    return mul
}


function factorial(num) {
    let fact = 1
    for (let i = 2; i <= num; ++i) {
        fact *= i
    }
    return fact
}

// console.log(add(...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))

module.exports = { add, multiply, factorial }