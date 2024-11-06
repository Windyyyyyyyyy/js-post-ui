import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://js-post-ui.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
