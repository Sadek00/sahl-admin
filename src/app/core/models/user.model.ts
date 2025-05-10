export interface User {
  id: number;
  username: string;
  email: string;
  token?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  roles?: string[];
}