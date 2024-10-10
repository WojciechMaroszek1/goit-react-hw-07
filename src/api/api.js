import axios from 'axios';

const api = axios.create({
	baseURL: 'https://6708098b8e86a8d9e42de37c.mockapi.io/contacts',
});

export default api;
