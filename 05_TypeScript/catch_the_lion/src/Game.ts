import { Board, Cell, DeadZone } from './Board';
import { Player, PlayerType } from './Player';

export class Game {
    private selectedCell:Cell;
    private turn = 0;
    private currentPlayer: Player;
    private gameInforEl = document.querySelector('.alert');
    private state: 'STARTED' | 'END' = 'STARTED';// 둘중하나, 기본값 스타트

    readonly upperPlayer = new Player(PlayerType.UPPER);
    readonly lowerPlayer = new Player(PlayerType.LOWER);

    readonly board = new Board(this.upperPlayer, this.lowerPlayer); //생성자 함수 안에 쓰면 영역 안에서만,,, 여기에 쓰면 필드로 사용....
    
    readonly upperDeadZone = new DeadZone('UPPER'); 
    readonly lowerDeadZone = new DeadZone('LOWER'); 


    constructor(){
        const boardContainer = document.querySelector('.board-container')
        boardContainer.firstChild.remove(); //뭐있으면 지우기
        boardContainer.appendChild(this.board._el);

        this.board.render();        
        this.renderInfo();
    }

    renderInfo(){
        this.gameInforEl.innerHTML = `#${this.turn}턴 ${this.currentPlayer.type} 차례 `
    }
    changeTurn(){
        this.selectedCell.deactive();
        this.selectedCell = null;

        if(this.state === 'END'){
            
        }
    }
}
