import axios from 'axios';
console.log(process.env.REACT_APP_SERVER);

export const api = axios.create({
   baseURL: process.env.REACT_APP_SERVER
});