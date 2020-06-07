import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.punkapi.com/v2/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllBeers = (query?: string) =>
  instance.get('beers?perpage=50&' + query);

export default instance;
