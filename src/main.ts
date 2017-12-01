import { sayHello } from "./greet";
import Person from './person'
let person = new Person('你好Typescript')

function showHello(divName : string , person: Person) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(person.greeting);
}
let canvas = < HTMLCanvasElement>document.getElementById('canvas') 
let context = canvas.getContext('2d')

showHello("greeting", person);