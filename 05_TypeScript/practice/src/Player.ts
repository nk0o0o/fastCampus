import { Hand } from "./Hands"

export enum PlayerType {
    NPC = 'NPC',
    USER = 'USER'
}

export class Player {
    
    private hands:Hand[] ;

    constructor(public readonly type:PlayerType) {

        // 초기 플레이어에 해당되는 피스 갖고 있게하기
        if(type == PlayerType.NPC){ 
            this.hands = [
                // new Rock (PlayerType.NPC, { row: 0, col: 0 }),
                // new Paper (PlayerType.NPC, { row: 0, col: 0  }),
                // new scissor(PlayerType.NPC, { row: 0, col: 0  }),
            ]
            //위타입의 플레이어 일때, 각 동물들의 주인과 위치 전달해서 플레이어 말 배열로 가져옴
        } else {
            this.hands = [
                // new Rock (PlayerType.USER, { row: 0, col: 0 }),
                // new Paper (PlayerType.USER, { row: 0, col: 1  }),
                // new scissor(PlayerType.USER, { row: 0, col: 2  }),
            ]
        }
    
    }

    
}
