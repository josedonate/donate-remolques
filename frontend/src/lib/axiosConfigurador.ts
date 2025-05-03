import axios from 'axios';

const axiosConfigurador = axios.create({
  baseURL: 'http://localhost:3003/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosConfigurador;
