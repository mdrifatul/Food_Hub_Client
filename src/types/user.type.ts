export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserSession {
  user: User;
  token?: string;
}
