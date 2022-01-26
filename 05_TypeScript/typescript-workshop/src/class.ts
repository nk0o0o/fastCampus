interface User{
    name: string
}
interface Product {
    id: string;
    price: number;
}
class Cart {
    //프로퍼티(속성)
    //protected user: User; 생성자 함수에서 접근제한자설정하면서 변수 사용하면 속성쓸때 생략할 수 있음
    //private store: object; 
    //접근제한자 속성, 메소드의 범위를 제한 할 수 있음
    //접근제한자 private : class 안에서만 사용 인스턴스 레벨에서 사용할 수없음
    //접근제한자 protected : 사용 인스턴스 레벨에서 사용할 수 없지만, 상속받은 클래스에서는 사용할 수 있음
    //접근제한자 아닌 디폴트 public

    //생성자 함수 : constructor 
    //생성자 함수 변수 설정할 때 접근제한자 바로 설정할 수 있음
    constructor( protected user:User, private store:object ={} ) {
        // this.user = user;
        // this.store = {};
    }
    //메소드
    put(id: string, product: Product){
        this.store[id] = product;

    }
    get(id:string) {
        return this.store[id];
    }
}

class PromotionCart extends Cart {
    addPromotion(){
        this.user.name
        //Cart의 public, protected로 제한된 속성, 메소드를 상속 받을 수 있음
        //인스턴스 레벨에서는 사용할 수 없음
    }
}
const cart2 = new PromotionCart({name: 'john'});
cart2.get
const cartJohn = new Cart({name: 'john'});
//cartJohn = Cart의 인스턴스들
cartJohn.put
//에러 접근 제한되어서 cartJohn.user
// john
const cartJay = new Cart({name: 'jay'});
