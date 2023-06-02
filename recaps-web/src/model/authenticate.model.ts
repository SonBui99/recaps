export interface UserDetail {
  token: string;
  user: {
    email: string;
    id: number;
    userName: string;
  };
}

export interface AuthenticateModel {
  user: UserDetail | any;
  token: string;
  loading: boolean;
}
