import Api from "@/services/Api";
import decode from "jwt-decode";

export default {
  AUTH_TOKEN_KEY: "authToken",
  /**
   * Login user
   * @param {*} credentials
   * @returns
   */
  login(credentials) {
    return Api.post("login", credentials);
  },
  /**
   * Set auth token into axios and local storage
   * @param {*} token
   */
  setAuthToken(token) {
    localStorage.setItem(this.AUTH_TOKEN_KEY, token);
  },
  /**
   * Get auth token from local storage
   * @returns token
   */
  getAuthToken() {
    return localStorage.getItem(this.AUTH_TOKEN_KEY);
  },
  /**
   * Clear auth token in axios and local storage
   */
  clearAuthToken() {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
  },
  /**
   * Check if user is logged in
   * @returns boolean
   */
  isLoggedIn() {
    const authToken = this.getAuthToken();
    return !!authToken && !this.isTokenExpired(authToken);
  },
  /**
   * Get user info
   * @returns object
   */
  getUserInfo() {
    if (this.isLoggedIn()) {
      return decode(this.getAuthToken());
    }
  },
  /**
   * Get token expiration date
   * @param {*} encodedToken
   * @returns datetime
   */
  getTokenExpirationDate(encodedToken) {
    const token = decode(encodedToken);
    if (!token.exp) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);

    return date;
  },
  /**
   * Check if token expired
   * @param {*} token
   * @returns
   */
  isTokenExpired(token) {
    const expirationDate = this.getTokenExpirationDate(token);
    return expirationDate < new Date();
  },
};
