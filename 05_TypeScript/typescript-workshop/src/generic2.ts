//generic 인터페이스도 사용가능
interface DB<T>{
    add(v:T):void;
    get():T;
}
class D<T> implements DB<T>{
    add(v:T): void{
        throw new Error("method not implemented")
    }
    get():T {
        throw new Error("method not implemented")
    }
}

interface JSONSerializer {
    serialize():string;
}
//generic 클래스를 정의할 때도 사용됨
class LocalDB<T extends JSONSerializer> implements DB<T>{
    //키를 전달받아 인터넷에 아이템을 받아오고 저장하고 

    constructor(private localStorageKey: string){
    }
    add(v: T){ // User 인터페이스를 넣고
        localStorage.setItem(this.localStorageKey, v.serialize());
    }
    get():T{ //User 인터페이스로 받아오기
        const v = localStorage.getItem(this.localStorageKey);
        return (v) ? JSON.parse(v) : null;
    }
}

//generic 조건부 타입  
interface Vegitable {
    v: string;
}
interface Meat {
    m: string;
}
interface Cart2<T> {
    getItem(): T  extends Vegitable ? Vegitable : Meat; 
}
const cart1: Cart2<Vegitable> = {
    getItem(){
        return {
            v: ''
        }
    }
} 
cart1.getItem();
