const AUTH_TOKEN = 'six-cities-token';

export type Token = string;

export const getAuthToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return token ?? '';
};

export const saveAuthToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN, token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN);
};
