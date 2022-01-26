import { Board, DeadZone } from './Board';
import { Player, PlayerType } from './Player';

export class Game {
    readonly board = new Board(); //생성자 함수 안에 쓰면 영역 안에서만,,, 여기에 쓰면 필드로 사용....
    readonly upperDeadZone = new DeadZone('UPPER'); 
    readonly lowerDeadZone = new DeadZone('LOWER'); 

    readonly upperPlayer = new Player(PlayerType.UPPER)
    readonly lowerPlayer = new Player(PlayerType.LOWER)

    constructor(){
        const boardContainer = document.querySelector('.board-container')
        boardContainer.firstChild.remove(); //뭐있으면 지우기
        boardContainer.appendChild(this.board._el);

        
    }

}
