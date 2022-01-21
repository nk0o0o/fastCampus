function add(x, y) {
    return x + y;
}
const result = add(1, 2);
function buildUserInfo(name = "-", email = "-", num = 0, address) {
    return { name, email };
}
const user = buildUserInfo();
const add2 = (a, b) => a + b;
function store(type) {
    if (type === "통조림") {
        return { a: "통조림" };
    }
    else if (type === "아이스크림") {
        return { b: "아이스크림" };
    }
    else {
        throw new Error('unsupported type');
    }
}
const s = store("통조림");
const cs = store("아이스크림");
s.a;
cs.b;
