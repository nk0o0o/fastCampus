import { Hand } from './Hands';
import { Player, PlayerType } from './Player';


export class Board {
    _el: HTMLElement = document.createElement('div');

    constructor(npcPlayer: Player, userPlayer: Player ){
        this._el.className = 'board'
    }

    render(){
        
    }

}

export class Cell {
    private isActive = false; //액티브되어있나 기본값 아니오
    readonly _el: HTMLElement = document.createElement('div');
    constructor ( public hand: Hand ){
        //셀에는 Hand가 필요함 
        this._el.classList.add('cell') //셀의 개체에 클래스 붙여주기
    }
    //말 놓기 (셀의 말자리에 가져온 말 대입)
    put (hand: Hand) {
        this.hand = hand;
    }
    //셀의 놓여진 말 꺼내주기
    gethand(){
        return this.hand;
    }
    //셀 활성화 시키기
    active(){
        this.isActive = true;
    }
    //셀 비활성화 시키기
    deactive(){
        this.isActive = false;
    }
    //셀 뿌려주기
    render(){
        if (this.isActive){
            this._el.classList.add('active'); //액티브 상태는 파란 outline
        } else {
            this._el.classList.remove('active');
        }

        //this._el.innerHTML = (this.hand) ? this.hand.render() : ''; //말이 있으면 말도 뿌려주기
    }
}
