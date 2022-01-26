//parcel이 알아서 js로 컴파일 해줌
console.log('hello world!') 
//import ClassA from './type';
import HelloHi from './type';
import { Hello, user} from './type';

const helloMessage : Hello = {
    text: ' hello world '
}

console.log(user.name)

/* const classA = new ClassA().a;
window.addEventListener('click', classA) */

const u : HelloHi = {
    hi(){

    },
    text : 'gkgk'
}