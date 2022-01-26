var StarbuksGrade;
(function (StarbuksGrade) {
    StarbuksGrade[StarbuksGrade["WELCOME"] = 0] = "WELCOME";
    StarbuksGrade[StarbuksGrade["GREEN"] = 1] = "GREEN";
    StarbuksGrade[StarbuksGrade["GOLD"] = 2] = "GOLD";
})(StarbuksGrade || (StarbuksGrade = {}));
function getDiscound(v) {
    switch (v) {
        case StarbuksGrade.WELCOME:
            return 0;
        case StarbuksGrade.GREEN:
            return 5;
        case StarbuksGrade.GOLD:
            return 10;
    }
}
console.log(getDiscound(StarbuksGrade.GREEN));
console.log(StarbuksGrade);
console.log(StarbuksGrade.GREEN);
