var hello = 'hello';
var hello2 = 'hello2'; //(tsc hello.ts --target es6)
var timeoutPromise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve("1 sec");
    }, 1000);
});
