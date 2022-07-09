import axios from 'axios';
import { handleResponse, handleError } from './response.js';

const BASE_URL = '/api';

const getAll = (resource) => {
  return axios
    .get(`${BASE_URL}/${resource}`)
    .then(handleResponse)
    .catch(handleError);
};

const getSingle = (resource, id) => {
  return axios
    .get(`${BASE_URL}/${resource}/${id}`)
    .then(handleResponse)
    .catch(handleError);
};

const post = (resource, model) => {
  return axios
    .post(`${BASE_URL}/${resource}`, model)
    .then(handleResponse)
    .catch(handleError);
};

const put = (resource, id, model) => {
  return axios
    .put(`${BASE_URL}/${resource}/${id}`, model)
    .then(handleResponse)
    .catch(handleError);
};

const remove = (resource, id) => {
  return axios
    .delete(`${BASE_URL}/${resource}/${id}`, id)
    .then(handleResponse)
    .catch(handleError);
};

const removeAll = (resource) => {
  return axios
    .delete(`${BASE_URL}/${resource}`)
    .then(handleResponse)
    .catch(handleError);
};

const apiProvider = {
  getAll,
  getSingle,
  post,
  put,
  remove,
  removeAll
};

export default apiProvider;


