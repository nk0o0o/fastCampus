//열거형 
enum StarbuksGrade {
    WELCOME = 0,
    GREEN = "Grren",
    GOLD = 2
}

function getDiscound(v:StarbuksGrade):number {
    switch (v){
        case StarbuksGrade.WELCOME:
            return 0;
        case StarbuksGrade.GREEN:
            return 5;
        case StarbuksGrade.GOLD:
            return 10;        
    }
}
console.log(getDiscound(StarbuksGrade.GREEN)) // 1이 찍힘 0,1,2
console.log(StarbuksGrade);
/* {
    예상
    '0'= 'WELCOME',
    '1' = 'GREEN',
    '2'= 'GOLD'S
} */
console.log(StarbuksGrade.GREEN);
//console.log(StarbuksGrade[GREEN]);//객체
// {
//      예상
//     "GREEN"
// }