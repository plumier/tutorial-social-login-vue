export interface DomainBase {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

export interface Todo extends DomainBase {
  title: string;
  completed?: boolean;
}

export interface User extends DomainBase {
  name: string;
  email: string;
  picture: string;
  password: string;
  role: string;
}

export interface RegisterValidationMessage {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterSubmit {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
