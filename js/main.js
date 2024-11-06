import axiosClient from './api/axiosClient';
import axios from 'axios';

console.log('Hello from main.js');

async function main() {
  const response = await axiosClient.get('/posts');
  console.log(response);
}

main();
