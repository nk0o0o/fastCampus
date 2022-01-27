import { Board, Cell, DeadZone } from './Board';
import { Lion } from './Piece';
import { Player, PlayerType } from './Player';

export class Game {
    private selectedCell:Cell;//선택된 셀
    private turn = 0; // 차례
    private currentPlayer: Player;//현재 플레이어
    private gameInforEl = document.querySelector('.alert'); //게임상황 개체
    private state: 'STARTED' | 'END' = 'STARTED';//게임 상황 둘중하나, 기본값 스타트

    readonly upperPlayer = new Player(PlayerType.UPPER); //게임의 위 플레이어 정의!
    readonly lowerPlayer = new Player(PlayerType.LOWER);//게임의 아래 플레이어 정의!

    readonly board = new Board(this.upperPlayer, this.lowerPlayer); 
    //생성자 함수 안에 쓰면 영역 안에서만,,, 여기에 쓰면 필드로 사용....이 무슨 말이지/................
    
    readonly upperDeadZone = new DeadZone('UPPER'); //게임의 데드존 위
    readonly lowerDeadZone = new DeadZone('LOWER'); //게임의 데드존 아래


    constructor(){
        const boardContainer = document.querySelector('.board-container');//게임보드판
        boardContainer.firstChild.remove(); //게임보드판에 뭐있으면 지우기
        boardContainer.appendChild(this.board._el);//게임보드판에 보드 개체 추가

        this.currentPlayer = this.upperPlayer; //처음 플레이어는 위플레이어
        
        this.board.render();// 게임 보드의 셀그리기 
        this.renderInfo(); //게임 보드의 상황 개체에 상황설명하는 글 그리기

        this.board._el.addEventListener('click', e => { //게임 보드를 클릭할때 (이벤트 위임)
            if(this.state === 'END'){ //게임의 상황이 엔드면 클릭해도 무반응
                return false;
            }

            //이벤트 위임처리
            if(e.target instanceof HTMLElement){
                //무조건 e.target은 HTMLElement
                let cellEl: HTMLElement; //셀을 클릭하고 싶음!
                if(e.target.classList.contains('cell')){ //셀이라는 클래스를 가진 타겟이라면 그 타겟을클릭셀에 대입
                    cellEl = e.target;
                } else if (e.target.classList.contains('piece')){ //말이라는 클래스를 가진 타겟이라면 타겟의 부모를 클릭셀에 대입
                    cellEl = e.target.parentElement;
                } else { // 셀, 말 클래스 없으면 무반응
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
        //받아온 셀이 공백이 아니고, 셀의 말이 공백이 아니고, 셀의 말의 주인의 타입과 게임의 현재플레이어의 타입이 같을때 
        return cell != null && cell.getPiece()! != null && cell.getPiece().ownerType === this.currentPlayer.type;
        //ture / false
    }
    select(cell:Cell){
        if(cell.getPiece() == null){// 말이 없는 셀 선택시 무반응
            return;
        }

        if(cell.getPiece().ownerType !== this.currentPlayer.type){ //본인의 말이 아닌 말이있는 셀을 선택시 무반응
            return;
        }
        if(this.selectedCell){ //선택된말이 있다면
            this.selectedCell.deactive(); // 선택된 말 선택못하게 해주고
            this.selectedCell.render();// active된거 없애기
        }

        this.selectedCell = cell; //선택된 셀에 받아온 셀 넣기
        cell.active(); //셀 활성화
        cell.render(); //셀 그리기
    }
    move(cell:Cell){//선택된 셀을 받아서
        this.selectedCell.deactive(); //게임의 이미 선택된 셀은 비활성화 하기
        const killed = this.selectedCell.getPiece().move(this.selectedCell, cell).getKilled();
        //죽은 피스는 선택된셀의 말을 선택된셀의 위치에서 새로 선택된 셀의 위치로 이동시키고 killedPiece에 대입시킨 말 받아오기
        //죽은 말이 있다면 데드존으로 자리 이동시키기
        
        if(killed){//killed가 있으면
            if(killed.ownerType === PlayerType.UPPER){ //해당 말의 주인의 타입에 따라 데드존에 위치시키기
                this.lowerDeadZone.put(killed);
            }else {
                this.upperDeadZone.put(killed);
            }

            if(killed instanceof Lion){//사자가 죽은 거면 
                this.state = 'END';//게임 종료 
            }
        }
        
    }
    renderInfo(extraMessage?: string){
        this.gameInforEl.innerHTML = `#${this.turn}턴 ${this.currentPlayer.type} 차례 ${(extraMessage)? '| ' + extraMessage : ''}`;
        //게임의 상황 개체에 게임의 턴, 차례, 메세지(메세지나 공백) 쓰기
    }
    changeTurn(){
        this.selectedCell.deactive(); // 선택된 셀은 비활성화하기
        this.selectedCell = null;// 선택된 셀 비우기

        if( this.state === 'END' ){ // 게임 상황이 엔드면 
            this.renderInfo('END!') //게임의 상황에 엔드 적기
        } else { //게임 종료 아니면
            this.turn += 1; //게임의 턴 수 증가
            this.currentPlayer = (this.currentPlayer === this.lowerPlayer)? this.upperPlayer : this.lowerPlayer;
            //현재 플레이어어 교체
            this.renderInfo();//게임 상황 그리기
        }
        this.board.render();//게임 보드 그리기
    }
}
