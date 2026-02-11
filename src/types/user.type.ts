export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserSession {
  user: User;
  token?: string;
}
