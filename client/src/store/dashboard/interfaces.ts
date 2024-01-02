export interface User {
  id?: string;
  first_name: string;
  email: string;
  password: string;
}
export interface UserTeams {
  id: string;
  name: string;
  logo: string;
}

export interface DashBoardState {
  user: User[];
  userTeams: UserTeams[];
  activeTeam: UserTeams | null;
  metricsForToday: string | null;
  linesMetrics: string[] | null;
  dataAmount: string[] | null;
  shortRecomendation: string | null;
  isLoading: boolean;
  //@ts-expect-error 'fafaf'
  membersActiveTeam: Members | [];
  modalOpen: boolean;
}
