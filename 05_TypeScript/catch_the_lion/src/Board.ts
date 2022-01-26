import { Lion, Piece } from './Piece';
import { Player, PlayerType } from './Player';

export interface Position {
    row: number;
    col: number;
}

export class Cell {
    private isActive = false;
    readonly _el: HTMLElement = document.createElement('div')

    constructor ( public readonly position : Position, private piece: Piece ){
        //this.position = Position
        //this.piece = piece.필요한거~~~
        this._el.classList.add('cell')
    }
    //말 놓기
    put (piece: Piece) {
        this.piece = piece;
    }
    //놓여진 말 가져오기
    getPiece(){
        return this.piece;
    }
    //활성화 시키기
    active(){
        this.isActive = true;
    }
    //비활성화 시키기
    deactive(){
        this.isActive = false;
    }
    //뿌려주기
    render(){
        if (this.isActive){
            this._el.classList.add('active');
        } else {
            this._el.classList.remove('active');
        }

        this._el.innerHTML = (this.piece) ? this.piece.render() : '';
    }
}

export class Board {
    cells: Cell[] = [];
    _el: HTMLElement = document.createElement('div')
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
            this.cells.push(cell);
            rowEl.appendChild(cell._el);
                    
            }            
        }
    }

    render(){
        this.cells.forEach(v => v.render());
    }

}

export class DeadZone {
    private cells: Cell[] = [];
    readonly deadzoneEl = document.getElementById(`${this.type}_deadzone`).querySelector('.card-body');

    constructor( public type: 'UPPER' | 'LOWER'){ //위쪽 아래쪽 데드존
        const row = 0;
        for (let col = 0; col < 4; col++) {
            const cell = new Cell( { row, col }, null );
            this.cells.push(cell);
            this.deadzoneEl.appendChild(cell._el)
            
        }
    }

    put(piece:Piece) {
        const emptyCell = this.cells.find(v => v.getPiece() == null);
        emptyCell.put(piece);
        emptyCell.render();
    }

    render(){
        this.cells.forEach(v=>v.render());
       /*
        this.cells.forEach(function(v){
            v.render();
        }) */
    }

}