import { Board, Cell } from './Board' ;
import { Player, PlayerType } from './Player';

export class Game {
    
    private turn = 0; // 차례 - 몇번째 하고 있는지
    private gameInforEl = document.querySelector('.alert'); //게임상황 개체
    private state: 'STARTED' | 'END' = 'STARTED';//게임 상황 둘중하나, 기본값 스타트
    private selectedCell:Cell;//선택된 셀
    readonly npcPlayer = new Player(PlayerType.NPC);
    readonly userPlayer = new Player(PlayerType.USER);

    //readonly board = new Board(this.npcPlayer, this.userPlayer);         
    //readonly npcZone = new handZone('NPC');
    //readonly userZone = new handZone('USER');


    constructor(){
        const boardContainer = document.querySelector('.board-container');//게임보드판
        document.querySelector('#user_zone').addEventListener('click', function(e){
            if(this.state === 'END'){ //게임의 상황이 엔드면 클릭해도 무반응
                return false;
            }

             //이벤트 위임처리
             if(e.target instanceof HTMLElement){
                 
                //무조건 e.target은 HTMLElement
                let cellEl: HTMLElement; //셀을 클릭하고 싶음!

                if(e.target.classList.contains('cell')){ //셀이라는 클래스를 가진 타겟이라면 그 타겟을클릭셀에 대입
                    cellEl = e.target;
                } else if (e.target.classList.contains('hands')){ //손이라는 클래스를 가진 타겟이라면 타겟의 부모를 클릭셀에 대입
                    cellEl = e.target.parentElement;
                } else { // 셀, 손 클래스 없으면 무반응
                    return false;
                }

                const cell = this.board.map.get(cellEl); // 게임의 맵은 위크맵, 클릭셀이 키가 됨

                if(this.isCurrentUserPiece(cell)){ //플레이어가 자기 말을 제대로 누른경우
                    this.select(cell);// 클릭한 셀 선택된 셀로 보내기 -> 액티브, 그리기
                    return false;
                }

                if(this.selectedCell){ //이미 선택된 셀이 있다면
                    this.move(cell); //클릭된 셀을 셀움직이기로 보내기 -> 비활성화, 죽이거나
                    this.changeTurn();// 턴 바꾸기
                }
            }
        })
    }
    isCurrentUserPiece(cell:Cell){
        //받아온 셀이 공백이 아니고, 셀의 hand가 공백이 아니고
        return cell != null && cell.hand! != null && cell;
    }

    renderInfo(extraMessage?: string){
        this.gameInforEl.innerHTML = `#${this.turn}번째 게임 ${(extraMessage)? '| ' + extraMessage : ''}`;
        //게임의 상황 개체에 게임의 턴, 차례, 메세지(메세지나 공백) 쓰기
    }
    changeTurn(){
        //this.selectedCell = null;// 선택된 셀 비우기

        if( this.state === 'END' ){ // 게임 상황이 엔드면 
            this.renderInfo('END!') //게임의 상황에 엔드 적기
        } else { //게임 종료 아니면
            this.turn += 1; //게임의 턴 수 증가
            this.renderInfo();//게임 상황 그리기
        }

        //this.board.render();//게임 보드 그리기
    }
    

}