import axios from 'axios';

import { Repository } from '../types';

const api = axios.create({
  baseURL: process.env.API_URL ?? 'http://localhost:4000',
});

export const getRepositories = () => api.get<Repository[]>('/repos');
export const getRepository = (repository_id: number) =>
  api.get<Repository>(`/repos/${repository_id}`);
