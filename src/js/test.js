import '../css/test.scss'
import '../css/m.css'
let arr = [1, 2, 4];
let arrB = arr.map(item => item * 2);
console.log(arrB.includes(8));
console.log("new Set(arrB) is ", new Set(arrB));