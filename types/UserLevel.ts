import { Level } from "./Level";
import { User } from "./user";

export interface CreateUserLevelPayload {
  user_id: number;
  level_id: number;
}


export interface UserLevel {
  id: number;
  user: User;
  level: Level;
}
