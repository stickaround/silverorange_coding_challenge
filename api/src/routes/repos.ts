import { Router, Request, Response } from 'express';

import { getRepos } from '../services/api';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  const allRepos = await getRepos().then((response) => response.data);
  const repositories = allRepos.filter((repository) => !repository.fork);

  return res.status(200).json(repositories);
});
