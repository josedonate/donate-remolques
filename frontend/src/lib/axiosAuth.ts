// frontend/src/lib/axiosAuth.ts
import axios from 'axios';

const axiosAuth = axios.create({
  baseURL: 'http://localhost:3002/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosAuth;
