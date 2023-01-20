import { Router, Request, Response } from 'express';

import {
  getCommits,
  getReadMe,
  getRepos,
  getRepository,
} from '../services/api';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  const allRepos = await getRepos().then((response) => response.data);
  let repositories = allRepos.filter((repository) => !repository.fork);

  if (_.query.language) {
    repositories = repositories.filter(
      (repo) => repo.language === _.query.language
    );
  }

  return res.status(200).json(repositories);
});

repos.get('/:name', async (req: Request<{ name: string }>, res: Response) => {
  const repository = await getRepository(req.params.name).then(
    (response) => response.data
  );

  const commits = await getCommits(repository.name).then(
    (response) => response.data
  );

  const readMe = await getReadMe(repository.full_name).then(
    (response) => response.data
  );

  return res.status(200).json({ ...repository, commits, readMe });
});
