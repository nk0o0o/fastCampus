interface Person {
    name:string;
    say(message:string):void;
    //사람은 이름이 있고 말을 할 수 있다.
}
interface Programmer {
    writeCode(requirment: string):string;
    //프로그래머는 코드를 쓸수 있다.
}
abstract class Korean implements Person {
    //추상 클래스는 특정 속성과 메소드를 하위 타입에서 필수로 갖게 한다.
    public abstract juminNum: number;
    constructor(public name: string) {        
    }    
    say(message: string): void {
        //void 변수는 리턴값이 없는 함수
        throw new Error("Method not implemented.");
    }
    abstract lovekimchi(): void;
    //korean은 주민번호를 가져야하고 김치를 사랑해야 한다. 
    //하위 인스턴스에서 속성, 메소드를 필수로 갖게하고, 거기에서 정의 하도록 함 
}

class KoreanProgrammer extends Korean implements Programmer {//다중 인터페이스
    //한국 사람은 이름이 있고 말을 할 수 있다.
    constructor(public name:string, public juminNum:number){     
        //부모클래스의 생성자를 호출해야함
        super(name);   
    }
    writeCode(requirment: string): string {
        //console.log(requirment);
        return requirment + '....';
    }
    
    say(message:string): string {
        return message + "!";
        //console.log(message);
        //throw new Error("Method not implemented.");자동완성 하면 구현되지 않았다 오류 메세지 있음
    }
    
    lovekimchi(){
        return 'I~ love~ kimchi~';
    }
}


const jay = new KoreanProgrammer('jay', 32132);
const nkLee = new KoreanProgrammer('nk', 301013);

console.log(jay.name)
console.log(jay.juminNum)
console.log(jay.lovekimchi())
console.log(jay.writeCode('gkgk'))

console.log(nkLee.name)
console.log(nkLee.juminNum)
console.log(nkLee.lovekimchi())

//const jay3 = new Korean('jay');
//추상클래스는 인스턴스화 시킬 수 없음, 하위 클래스를 만들어서 추상속성이나 추상메소드를 정의한 후에 하위클래스를 인스턴스화 시켜야 한다.
