export type IResetPassword = {
  token: string;
  new_password?: string;
  password_confirm?: string;
};
