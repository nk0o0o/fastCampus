class Cart {
    constructor(user, store = {}) {
        this.user = user;
        this.store = store;
    }
    put(id, product) {
        this.store[id] = product;
    }
    get(id) {
        return this.store[id];
    }
}
class PromotionCart extends Cart {
    addPromotion() {
        this.user.name;
    }
}
const cart2 = new PromotionCart({ name: 'john' });
cart2.get;
const cartJohn = new Cart({ name: 'john' });
cartJohn.put;
console.log(cartJohn);
const _el = document.querySelector('.test');
let gg = [];
gg.push(cartJohn[0]);
gg.push(cartJohn[1]);
gg.push(cartJohn[2]);
console.log(cartJohn[0]);
const cartJay = new Cart({ name: 'jay' });
