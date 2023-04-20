export type ITabCategories =
  | "headtop"
  | "head"
  | "torso"
  | "arms"
  | "legs"
  | "accessory";

export interface IUserData {
  cash: number;
  displayname: string;
  eventboxes: number;
  eventkeys: number;
  messages: number;
  points: number;
  stars: number;
  lootboxes: number;
  flootboxes: number;
  essa: number;
  moc: number;
  heads: string[];
  headtops: string[];
  legs: string[];
  torsos: string[];
  arms: string[];
  currentarms: string;
  currenthead: string;
  currentheadtop: string;
  currentlegs: string;
  currenttorso: string;
}
