export default class Person {
  greeting: string
  constructor(mes: string) {
    this.greeting = mes
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}