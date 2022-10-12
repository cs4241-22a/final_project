import {ICell} from "./DB_Schema/cellSchema";

export interface CellOperation {
	index: number
	newCell: ICell
}