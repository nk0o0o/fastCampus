import { Hand } from './Hands';
import { Player, PlayerType } from './Player';


export class Board {
    _el: HTMLElement = document.createElement('div');

    constructor(npcPlayer: Player, userPlayer: Player ){
        this._el.className = 'board'
    }

    render(){
        
    }

}