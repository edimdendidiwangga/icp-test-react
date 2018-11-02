import apisauce from 'apisauce';

const apiUrl = 'http://test.incenplus.com:5000';
const header = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Accept: 'application/json',
};
const headers = token => ({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    Authorization: token,
  },
});

const API = apisauce.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: header,
});

const APIs = apisauce.create({
  baseURL: apiUrl,
  timeout: 10000,
});

export default API;
export {
  APIs,
  headers,
};
