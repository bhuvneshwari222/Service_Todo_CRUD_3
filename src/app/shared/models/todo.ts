export interface Itodo {
    todoItem: string;
    todoID: string;
}
export interface ItodoRes<T>{
    msg: string,
    data: T
}