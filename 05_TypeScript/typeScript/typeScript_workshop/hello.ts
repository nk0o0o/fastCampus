var hello = 'hello';
let hello2 = 'hello2'; //(tsc hello.ts --target es6)
let timeoutPromise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve("1 sec");
    }, 1000);
})
