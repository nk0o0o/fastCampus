import lionImage from './images/lion.png';
import elophantImage from './images/elophant.png';
import griffImage from './images/griff.png';
import chickenImage from './images/chicken.png';

import { Cell, Position } from './Board';
import { Player, PlayerType } from './Player';

export class MoveResult {
    constructor(private killedPiece:Piece){    
        //말 변수 생성 
        //말의 주인(UPPER, LOWER)
        //말의 움직임
        //말
    }
    getKilled(){
        return this.killedPiece;
    }
}

export interface Piece {
    ownerType: PlayerType;
    currentPosition: Position;
    move(from: Cell, to: Cell) : MoveResult;
    render():string;    
}
/* 모든 말 공통된 움직임 */
//abstract ===== 하위에서 정의해라
abstract class DefaultPiece implements Piece {
    constructor(
        public readonly ownerType : PlayerType, 
        public currentPosition: Position
    ) {}

    move(from: Cell, to: Cell) {
        //움직인거에 대한 내용
        //특정 포지셔닝 전달해야함
        if (!this.canMove(to.position)){
            throw new Error ('can no move!')
        }

        const moveResult = new MoveResult(
            (to.getPiece() != null)? to.getPiece() : null
        );
        to.put(this);
        from.put(null);
        this.currentPosition = to.position;
        return moveResult;
    }

    //움직일 수 있는 범위랑 뿌려주는 거는 각각 동물 하위 클래스에서 정의하기
    abstract canMove(position:Position): boolean;
    abstract render();
}

/* 사자 말의 움직임 */
export class Lion extends DefaultPiece {
    canMove(pos: Position) {
      const canMove = (pos.row === this.currentPosition.row + 1 && pos.col === this.currentPosition.col)
        || (pos.row === this.currentPosition.row - 1 && pos.col === this.currentPosition.col)
        || (pos.col === this.currentPosition.col + 1 && pos.row === this.currentPosition.row)
        || (pos.col === this.currentPosition.col - 1 && pos.row === this.currentPosition.row)
        || (pos.row === this.currentPosition.row + 1 && pos.col === this.currentPosition.col + 1)
        || (pos.row === this.currentPosition.row + 1 && pos.col === this.currentPosition.col - 1)
        || (pos.row === this.currentPosition.row - 1 && pos.col === this.currentPosition.col + 1)
        || (pos.row === this.currentPosition.row - 1 && pos.col === this.currentPosition.col - 1);
      return canMove;
    }
  
    render(): string {
      return `<img class="piece ${this.ownerType}" src="${lionImage}" width="90%" height="90%"/>`;
    }
  }

/* 코끼리 말의 움직임 */
  export class Elephant extends DefaultPiece {
    canMove(pos: Position) {
      return (pos.row === this.currentPosition.row + 1 && pos.col === this.currentPosition.col + 1)
        || (pos.row === this.currentPosition.row + 1 && pos.col === this.currentPosition.col - 1)
        || (pos.row === this.currentPosition.row - 1 && pos.col === this.currentPosition.col + 1)
        || (pos.row === this.currentPosition.row - 1 && pos.col === this.currentPosition.col - 1);
    }
  
    render(): string {
      return `<img class="piece ${this.ownerType}" src="${elophantImage}" width="90%" height="90%"/>`;
    }
  }
/* 기린 말의 움직임 */ 
  export class Griff extends DefaultPiece {
    canMove(pos: Position) {
      return (pos.row === this.currentPosition.row + 1 && pos.col === this.currentPosition.col)
        || (pos.row === this.currentPosition.row - 1 && pos.col === this.currentPosition.col)
        || (pos.col === this.currentPosition.col + 1 && pos.row === this.currentPosition.row)
        || (pos.col === this.currentPosition.col - 1 && pos.row === this.currentPosition.row);
    }
  
    render(): string {
      return `<img class="piece ${this.ownerType}" src="${griffImage}" width="90%" height="90%"/>`;
    }
  }
/* 닭 말의 움직임 */ 
  export class Chick extends DefaultPiece {
    canMove(pos: Position) {
      return this.currentPosition.row + ((this.ownerType == PlayerType.UPPER) ? +1 : -1) === pos.row;
    }
  
    render(): string {
      return `<img class="piece ${this.ownerType}" src="${chickenImage}" width="90%" height="90%"/>`;
    }
  }
  