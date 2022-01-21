//generic 클래스를 정의할 때도 사용됨
class LocalDB {
    //키를 전달받아 인터넷에 아이템을 받아오고 저장하고 

    constructor(private localStorageKey: string){
    }
    add(v: User){
        localStorage.setItem(this.localStorageKey, JSON.stringify(v));
    }
    get():User{
        const v = localStorage.getItem(this.localStorageKey);
        return (v) ? JSON.parse(v) : null;
    }
}

interface User {name:string}

const userDb = new LocalDB('user');
userDb.add({name:'jay'});
const userA = userDb.get();
userA.name;