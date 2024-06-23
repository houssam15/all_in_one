export enum Position {
    LEFT,
    RIGHT
}

export interface Action{
    key : number;
    title : string;
    isAction : boolean;
    action : any;
    position: Position
}