import type DSVRowArray from "@types/d3"

export interface Volume {
  Perc?: number | null;
  Pre: number | null;
  LLN?: number | null;
  ULN?: number | null;
  PostVol?: number | null;
  PostPerc?: number | null;
  Z: number | null;
  ZPost?: number | null;
}

export interface Prompt {
  [key: string]: string;
}

