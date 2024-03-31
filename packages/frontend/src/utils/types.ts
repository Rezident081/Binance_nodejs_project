import { Signals } from "./constants";

export interface ISignal {
  type: Signals;
  id: number;
}

export type CandleDef = Date & number;