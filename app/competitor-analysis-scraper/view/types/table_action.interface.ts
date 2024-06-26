export enum Position {
    LEFT,
    RIGHT
}

export interface TableAction{
    title : string;
    isAction : boolean;
    action : any;
    position: Position;
    classes? : string;
}