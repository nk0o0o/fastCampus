function add(x:number,y:number):number{
    return x + y;
}

//에러 : add(1, '2')
const result = add(1, 2); 

function buildUserInfo (name="-", email= "-", num:number=0, address?:string){ //기본값 설정가능, 변수 없는 경우가 있는경우(초기값) 물음표
    //return {name:name, email:email} 변수와 반환값의 이름이 같으면 생략가능
    return {name, email}
}

const user = buildUserInfo();


//화살표함수 
// const add2 = function(a:number, b:number){
//     return a + b;
// } 
const add2 = (a:number, b:number):number => a + b;

interface Strorage {
    a:"통조림"
}
interface ColdStrorage {
    b:"아이스크림"

}
function store(type:"통조림"):Strorage
function store(type:"아이스크림"):ColdStrorage
function store(type:"통조림" | "아이스크림"){
    if(type === "통조림"){
        return {a:"통조림"}
    } else if (type === "아이스크림"){
        return { b : "아이스크림"}
    } else {
        throw new Error ( 'unsupported type');
    }
}

const s = store("통조림");
const cs = store("아이스크림");
s.a;
cs.b;