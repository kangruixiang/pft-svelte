import type DSVRowArray from "@types/d3"

export interface Volume {
  Perc: number;
  Pre: number;
  LLN: number;
  ULN: number;
  PostVol: number;
  PostPerc: number;
  Z: number;
  ZPost: number;
}

export interface Prompt {
  [key: string]: string;
}

