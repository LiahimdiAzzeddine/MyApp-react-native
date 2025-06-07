export interface Level {
  id: number;
  goal: number;
  title: string;
  next_goal?: number | null;
}

export interface LevelApiResponse {
  success: boolean;
  total_requests: number;
  levels: Level[];
  current_levels: Level[] | null;
}
