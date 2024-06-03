export const keyLogin = 'loginToken'

const saveToken = (token: string): void => {
  localStorage.setItem(keyLogin, token);
}

const getToken = (): string | null => {
  const token = localStorage.getItem(keyLogin);
  if (token) {
    return token;
  } else {
    return null;
  }
}

export {
  saveToken,
  getToken
}