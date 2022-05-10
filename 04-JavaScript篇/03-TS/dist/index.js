"use strict";
// basic type
let str;
let num;
let bool;
let x;
let un; // undefined
str = 'hello world';
num = 123;
un = 333;
un = `hello world`;
bool = true;
x = 'some';
// array
let ids;
ids = [1, 2, 3];
// Tuple
let person;
let persons;
// enum
var direction1;
(function (direction1) {
    direction1[direction1["Up"] = 0] = "Up";
    direction1[direction1["Down"] = 1] = "Down";
    direction1[direction1["Left"] = 2] = "Left";
    direction1[direction1["Right"] = 3] = "Right";
})(direction1 || (direction1 = {}));
console.log('enum', direction1.Up);
var direction2;
(function (direction2) {
    direction2[direction2["Up"] = 1] = "Up";
    direction2[direction2["Down"] = 2] = "Down";
    direction2[direction2["Left"] = 3] = "Left";
    direction2[direction2["Right"] = 4] = "Right";
})(direction2 || (direction2 = {}));
console.log('eunm2', direction2.Up);
var direction3;
(function (direction3) {
    direction3["Up"] = "Up";
    direction3["Down"] = "Down";
    direction3["Left"] = "Left";
    direction3["Right"] = "Right";
})(direction3 || (direction3 = {}));
console.log('enum3', direction3.Up);
// Object
const user1 = {
    id: 123,
    name: 'John',
};
const user2 = {
    id: 12,
    name: 'sala',
};
// Type Assertion
let cid = 1;
// let customerId = <number>cid
let customerId = cid;
// Function
function addNum(x, y) {
    return x + y;
}
// Void
function log(message) {
    console.log(message);
}
const user3 = {
    name: 'Hayes',
    id: 0,
};
class UserAccount {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
}
const user4 = new UserAccount('nurphy', 1);
