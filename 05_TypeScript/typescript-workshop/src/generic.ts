//generic <T> 타입을 T라는 파라미터에 담아 옴 
function createPromise<T>(x:T, timeout:number){
    //타입의 파라미터화 = 타입변수,  x를 T라는 타입을 전달 받을 거임
    //return new Promise ((resolve: (v: T) =>void, reject)=>{
    return new Promise<T> ((resolve, reject)=>{
        setTimeout(()=>{
            resolve(x);
        }, timeout)
    })
}

//createPromise<string>('eh', 100);
//string이라고 정하면 타입변수 지정한 데어 꼭 그 변수 써야함
createPromise('eh', 100)//프로미스에서 타입변수 지정하면 생략가능
.then(v => console.log(v));

function createTuple2<T1,T2>(v:T1, v2:T2):[T1, T2]{
    return [v, v2];
}
function createTuple3<T,U, D>(v:T, v2:U, v3:D):[T, U, D]{
    return [v, v2, v3];
}

const t1 = createTuple2("user1", 1000);