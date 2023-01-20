import axios from 'axios';

import { Repository } from '../types';

const api = axios.create({
  baseURL: process.env.API_URL ?? 'http://localhost:4000',
});

export const getRepositories = (language = '') =>
  api.get<Repository[]>(`/repos?language=${language}`);
export const getRepository = (repositoryName: string) =>
  api.get<Repository>(`/repos/${repositoryName}`);
