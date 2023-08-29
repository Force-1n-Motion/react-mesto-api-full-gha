// utils/auth.js

import axios from "axios";

const BASE_URL = "https://auth.nomoreparties.co";

export function signin(email, password) {
  return axios.post(`${BASE_URL}/signin`, {
    email: email,
    password: password,
  });
}

export function signup(email, password) {
  return axios.post(`${BASE_URL}/signup`, {
    email: email,
    password: password,
  });
}

export function checkToken(token) {
  return axios.post(`${BASE_URL}/users/me`, null, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}
