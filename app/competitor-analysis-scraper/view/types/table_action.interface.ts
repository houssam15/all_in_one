export enum Position {
    LEFT,
    RIGHT
}

export interface Action{
    title : string;
    isAction : boolean;
    action : any;
    position: Position;
    classes? : string;
}