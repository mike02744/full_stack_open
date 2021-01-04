import axios from "axios";

const baseUrl = "/api/persons";
// const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObj) => {
  return axios.post(baseUrl, newObj);
};

const update = (id, newObj) => {
  return axios.put(`${baseUrl}/${id}`, newObj);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

// eslint-disable-next-line
export default {
  getAll,
  create,
  update,
  remove,
};
