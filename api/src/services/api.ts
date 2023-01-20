import axios from 'axios';

import { Repo } from '../models/Repo';
import { Commit } from '../models/Commit';
import { repoListUrl, repoUrl, readMeUrl } from '../config/constants';

const api = axios.create();

export const getRepos = () => api.get<Repo[]>(repoListUrl);

export const getRepository = (repoName: string) =>
  api.get<Repo>(`${repoUrl}/${repoName}`);

export const getCommits = (repoName: string) =>
  api.get<Commit[]>(`${repoUrl}/${repoName}/commits`);

export const getReadMe = (repoName: string) =>
  api.get<string>(readMeUrl(repoName));
