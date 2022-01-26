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
const cartJay = new Cart({ name: 'jay' });
