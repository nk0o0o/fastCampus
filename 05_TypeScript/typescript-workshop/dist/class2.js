class Korean {
    constructor(name) {
        this.name = name;
    }
    say(message) {
        throw new Error("Method not implemented.");
    }
}
class KoreanProgrammer extends Korean {
    constructor(name, juminNum) {
        super(name);
        this.name = name;
        this.juminNum = juminNum;
    }
    writeCode(requirment) {
        return requirment + '....';
    }
    say(message) {
        return message + "!";
    }
    lovekimchi() {
        return 'I~ love~ kimchi~';
    }
}
const jay = new KoreanProgrammer('jay', 32132);
const nkLee = new KoreanProgrammer('nk', 301013);
console.log(jay.name);
console.log(jay.juminNum);
console.log(jay.lovekimchi());
console.log(jay.writeCode('gkgk'));
console.log(nkLee.name);
console.log(nkLee.juminNum);
console.log(nkLee.lovekimchi());
