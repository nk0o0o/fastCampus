var score1 = 0;
let score2 = 200;
const defaultScore = 0;

function outer(){

    if(true){
        //var 함수scope 변수
        //let score; let 변수 정의할 때, 타입적지 않고 변수명만 적으면 'any' 타입 재할당이 되기때문에 any타입이면 계속 타입바꿀수있음
        //let score : number; //숫자형만 올수있음
        
        const score = 100; // 숫자형으로 자동 정의, 재할당 안됨
    }
    for (var i = 0; i < 3; i++) {
        setTimeout(function(){
            console.log(i);
        },100);        
    }
    

    
}
outer();