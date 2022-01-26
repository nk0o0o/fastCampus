import { Piece } from './Piece'

//열거형 타입 
export enum PlayerType {
    UPPER = 'UPPER',
    LOWER = 'LOWER'
}

export class Player {
    private pieces:Piece[]

    constructor(public readonly type:PlayerType){
        // PlayerType.UPPER
        // PlayerType.LOWER
    }
}