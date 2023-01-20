import axios from 'axios';

import { Repo } from '../models/Repo';
import { apiUrl } from '../config/constants';

const api = axios.create({
  baseURL: apiUrl,
});

export const getRepos = () => api.get<Repo[]>('/repos');
