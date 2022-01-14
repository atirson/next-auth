export default class AuthError extends Error {
  constructor() {
    super('Error with authentication token.');
  }
}