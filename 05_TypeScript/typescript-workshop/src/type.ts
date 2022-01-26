export interface Hello {
    text : string;
}
export const user = {
    name: '유저 이름 1'
}
//default export 값 지정할 수 있음 (클래스, 함수, 인터페이스, 등등)
//default 의 클래스, 함수의 이름은 필요 없음
//모듈은 기본 내보내기(default export)가 하나밖에 되지 않는다. 

/* export default class A {
    a(){
        alert('A 클래스')
    }
}  */

type d = Hello & { hi():void}
export default d;