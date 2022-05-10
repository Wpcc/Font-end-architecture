// basic type
let str: string
let num: Number
let bool: Boolean
let x: any
let un // undefined

str = 'hello world'
num = 123
un = 333
un = `hello world`
bool = true
x = 'some'

// array
let ids: number[]

ids = [1, 2, 3]

// Tuple
let person: [number, string, boolean]
let persons: [number][]

// enum
enum direction1 {
  Up,
  Down,
  Left,
  Right,
}
console.log('enum', direction1.Up)

enum direction2 {
  Up = 1,
  Down,
  Left,
  Right,
}
console.log('eunm2', direction2.Up)

enum direction3 {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right',
}

console.log('enum3', direction3.Up)

// Object
const user1: {
  id: number
  name: string
} = {
  id: 123,
  name: 'John',
}

type TUser = {
  id: number
  name: string
}

const user2: TUser = {
  id: 12,
  name: 'sala',
}

// Type Assertion
let cid: any = 1
// let customerId = <number>cid
let customerId = cid as number

// Function
function addNum(x: number, y: number): number {
  return x + y
}
// Void
function log(message: string | number): void {
  console.log(message)
}

// interface
interface User {
  name: String
  id: Number
}

const user3: User = {
  name: 'Hayes',
  id: 0,
}

class UserAccount {
  name: string
  id: number

  constructor(name: string, id: number) {
    this.name = name
    this.id = id
  }
}

const user4: User = new UserAccount('nurphy', 1)
