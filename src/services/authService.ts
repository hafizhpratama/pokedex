import axios from 'axios';
import { LOGIN_API_URL } from '../constants/loginConstants';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(LOGIN_API_URL, { email, password });
    return response.data;
  } catch (err) {
    throw new Error('Login failed. Please try again.');
  }
};
