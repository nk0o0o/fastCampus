import { Lion, Piece } from './Piece';
import { Player, PlayerType } from './Player';

export interface Position {
    //위치라는 것은 숫자로된 행과 열이다
    row: number;
    col: number;
}

export class Cell {
    //셀이라는 네모하나 <div class="cell"><img class="piece UPPER" src=""></div> 
    //말이 있을 수도 없을 수도
    //활성화일수도 비활성화 일수도
    private isActive = false; //액티브되어있나 기본값 아니오
    readonly _el: HTMLElement = document.createElement('div') //셀의 개체 만들기

    constructor ( public readonly position : Position, private piece: Piece ){
        //셀에는 위치(인스턴스)와 말(클래스)이 필요함 
        //this.position = Position
        //this.piece = piece.필요한거~~~
        this._el.classList.add('cell') //셀의 개체에 클래스 붙여주기
    }
    //말 놓기 (셀의 말자리에 가져온 말 대입)
    put (piece: Piece) {
        this.piece = piece;
    }
    //셀의 놓여진 말 꺼내주기
    getPiece(){
        return this.piece;
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

        this._el.innerHTML = (this.piece) ? this.piece.render() : ''; //말이 있으면 말도 뿌려주기
    }
}

export class Board {
    cells: Cell[] = [];
    _el: HTMLElement = document.createElement('div');
    map: WeakMap <HTMLElement, Cell> = new WeakMap();
    //es6의 맵 사용
    //weakmap은 약한 참조를 가진 배열 
    //let john = { name: "John" };의 john을 null로 덮으면 name: "John" 이라는 객체가 삭제됨
    //맵의 장점은 키(htmlelment)를 객체로 줌
    //키가 사라지면 밸류도 사라짐
    constructor( upperPlayer: Player, lowerPlayer: Player ){
        //this.upperPlayer = Player.UPPER;
        //this.lowerPlayer = Player.LOWER;
        this._el.className = 'board'

        for (let row = 0; row < 4; row++) {
            const rowEl = document.createElement('div');
            rowEl.className = 'row';
            this._el.appendChild(rowEl);

            for (let col = 0; col < 3; col++) {
                const piece =
                upperPlayer.getPieces().find(({ currentPosition }) =>
                    currentPosition.col === col && currentPosition.row === row
                    //화살표함수 젤 줄인거
                ) || 
                lowerPlayer.getPieces().find(({ currentPosition }) => {                
                    return currentPosition.col === col && currentPosition.row === row;
                })
            //find(function(el){return el관한 판별식}) : 판별함수를 만족하는 첫번째 요소의 값을 반환
            //upperPlayer.getPieces().find((v) => {v.currentPosition})
            //getPieces는 배열
            //currentPosition은 객채{row:0, col:0} 
            //currentPosition의 열이 col과 같고, currentPosition의 행이 row와 같음을 만족하는 첫번째 currentPosition
            const cell = new Cell({row, col}, piece);            
            this.map.set(cell._el, cell)
            this.cells.push(cell);
            rowEl.appendChild(cell._el);
                
            }            
        }
    }

    render(){
        this.cells.forEach(v => v.render());//보드의 셀배열의 요소갯수 만큼 셀배열의 요소의 render하기 (말이나 공백)
    }

}

export class DeadZone {     
    private cells: Cell[] = [];//데드존의 셀들의 배열
    readonly deadzoneEl = document.getElementById(`${this.type}_deadzone`).querySelector('.card-body');
    //데드존의 타입가져와서 html개체 만들기 

    constructor( public type: 'UPPER' | 'LOWER'){ //위쪽 아래쪽 데드존
        //this.type : 위/아래
        const row = 0; //데드존 1행 만들기
        for (let col = 0; col < 4; col++) {//데드존 4열 만들기
            const cell = new Cell( { row, col }, null ); //데드존의 칸에 셀과 말 넣기(겜시작할때는 말 없음)
            this.cells.push(cell); //데드존 셀 배열에 말없는 빈셀들 넣기
            this.deadzoneEl.appendChild(cell._el);//데드존 개체에 셀 개체(div) 추가하기
        }
    }

    put(piece:Piece) { // 데드존에 말 넣기
        const emptyCell = this.cells.find(v => v.getPiece() == null);//빈셀은 데드존의 셀 중 null인 말을 가진 셀중 첫째
        //배열.find(function(el)=>{return el > 0 ;}): 배열중에 0보다 큰값 중 첫번째 요소 찾기
        emptyCell.put(piece); //빈셀 배열에 받아온 말 넣기
        emptyCell.render();// 첨에 말없는 빈셀이나 말 받아온 셀을 그려주기
    }

    render(){
        this.cells.forEach(v=>v.render());
        //데드존의 셀배열의 갯수, 4 만큼 셀배열의 요소를 render하기 (-> 셀의 render 말있으면 -> 말의 render : 말의 이미지 태그/말없으면 공백)
       /*
        this.cells.forEach(function(v){
            v.render();
        }) */
    }

}