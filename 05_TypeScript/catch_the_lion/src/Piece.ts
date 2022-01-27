import lionImage from './images/lion.png';
import elophantImage from './images/elophant.png';
import griffImage from './images/griff.png';
import chickenImage from './images/chicken.png';

import { Cell, Position } from './Board';
import { Player, PlayerType } from './Player';

export class MoveResult {
    constructor(private killedPiece: Piece){   
      //this.killedPiece : Piece
    }
    getKilled(){
      return this.killedPiece;
    }
}

export interface Piece {
  //말이라는 것은
    ownerType: PlayerType; // 말의 주인
    currentPosition: Position; //말의 현재 위치
    move(from: Cell, to: Cell) : MoveResult; //말이 어느셀에서 어느셀로 이동할건지
    //move의 변수들은 셀이어야하고, 반환값은 MoveResult에서 정의한 타입과 같아야한다.
    render():string;  //말의 뿌려짐은 각각 동물말에서 보내진 이미지 태그로
}

/* 모든 말 공통된 움직임 */
//abstract ===== 하위에서 정의해라
abstract class DefaultPiece implements Piece {
    constructor(
       // 모든 말들은 타입이 다른 주인이 있고, 행렬로 현재위치가 있음
        public readonly ownerType : PlayerType, 
        public currentPosition: Position 
    ) {}

    //모든 말은 셀에서 셀로 이동함
    move(from: Cell, to: Cell) {//움직인거에 대한 내용
      if (!this.canMove(to.position)){ //이동하고자하는 셀로 가지 못할 경우 에러뜸
          throw new Error ('can no move!')
      }

      const moveResult = new MoveResult(
        (to.getPiece() != null)? to.getPiece() : null 
        //이동하고자하는 셀이 null이 아니면, 이동하고자하는 셀의 말을 MoveResult로 반환 null이면 null을 반환
      );
      to.put(this);//이동하고자하는 셀의 말자리에 말 넣기
      from.put(null);//있던 자리는 null로 
      this.currentPosition = to.position;//옮기고자 하는 셀의 위치를 말의 현재위치로 대입
      return moveResult; //반환값은 이동하고자하는 셀의 말 또는 null
    }

    //움직일 수 있는 범위랑 뿌려주는 거는 각각 동물 하위 클래스에서 정의하기
    abstract canMove(position:Position): boolean; //포지션 정보를 받아서 보고 갈수 있다 없다로 반환
    abstract render():string;
}


/* 동물들 말 */
/* 사자 말 */
export class Lion extends DefaultPiece {
    canMove(pos: Position) {
      //this는 말 (상속받음)
      const canMove = (pos.row === this.currentPosition.row + 1 && pos.col === this.currentPosition.col)
        || (pos.row === this.currentPosition.row - 1 && pos.col === this.currentPosition.col)
        || (pos.col === this.currentPosition.col + 1 && pos.row === this.currentPosition.row)
        || (pos.col === this.currentPosition.col - 1 && pos.row === this.currentPosition.row)
        || (pos.row === this.currentPosition.row + 1 && pos.col === this.currentPosition.col + 1)
        || (pos.row === this.currentPosition.row + 1 && pos.col === this.currentPosition.col - 1)
        || (pos.row === this.currentPosition.row - 1 && pos.col === this.currentPosition.col + 1)
        || (pos.row === this.currentPosition.row - 1 && pos.col === this.currentPosition.col - 1);
      return canMove; // 변수를 참거짓으로 만들고 넘길때!!
    }
  
    render(): string { // 주인타입이랑, 이미지소스 넣은 이미지 태그 반환하기
      return `<img class="piece ${this.ownerType}" src="${lionImage}" width="90%" height="90%"/>`;    
    }
  }

/* 코끼리 말 */
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
/* 기린 말 */ 
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
/* 닭 말 */ 
  export class Chick extends DefaultPiece {
    canMove(pos: Position) {
      return this.currentPosition.row + ((this.ownerType == PlayerType.UPPER) ? +1 : -1) === pos.row;
    }
  
    render(): string {
      return `<img class="piece ${this.ownerType}" src="${chickenImage}" width="90%" height="90%"/>`;
    }
  }
  