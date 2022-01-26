import { Chick, Elephant, Griff, Lion, Piece } from './Piece'

//열거형 타입 
export enum PlayerType {
    UPPER = 'UPPER',
    LOWER = 'LOWER'
}

export class Player {
    private pieces:Piece[]

    getPieces(){
        //console.log(this.pieces)
        //콘솔 결과 pieces[] = [Griff, Lion, Elephant, Chick]
        return this.pieces
    }

    constructor(public readonly type:PlayerType){
        // 초기 플레이어에 해당되는 피스 갖고 있게하기
        if(type == PlayerType.UPPER){
            this.pieces = [
                new Griff(PlayerType.UPPER, { row: 0, col: 0 }),
                new Lion(PlayerType.UPPER, { row: 0, col: 1  }),
                new Elephant(PlayerType.UPPER, { row: 0, col: 2  }),
                new Chick(PlayerType.UPPER, { row: 1, col: 1  })
            ]
        } else {
            this.pieces = [
                new Elephant(PlayerType.LOWER, { row: 3, col: 0 }),
                new Lion(PlayerType.LOWER, { row: 3, col: 1  }),
                new Griff(PlayerType.LOWER, { row: 3, col: 2  }),
                new Chick(PlayerType.LOWER, { row: 2, col: 1  })
            ]
        }
    }
}