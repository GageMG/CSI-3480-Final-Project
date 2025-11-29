export function randomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }

  return result;
}

export function isValidEmail(email: string) {
  if (typeof email !== 'string') {
    throw new TypeError('Email must be typeof string.');
  }

  return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email);
}

const minimumPasswordLength = 8;
const minimumPasswordNumberCount = 1;
export function passwordMeetsRequirements(password: string) {
  if (password.length < minimumPasswordLength) {
    return false;
  }
  if ((password.match(/\d/g) ?? []).length < minimumPasswordNumberCount) {
    return false;
  }

  return true;
}
