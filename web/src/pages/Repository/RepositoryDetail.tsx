import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  Button,
  Box,
  Typography,
} from '@mui/material';
import MuiMarkdown from 'mui-markdown';

import { Loader } from '../../core/Loader';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import {
  getRepositorySync,
  selectRepository,
  selectLoading,
} from './repositorySlice';

function RepositoryDetail() {
  const dispatch = useAppDispatch();
  const repository = useAppSelector(selectRepository);
  const loading = useAppSelector(selectLoading);
  const { repositoryName } = useParams();

  React.useEffect(() => {
    repositoryName && dispatch(getRepositorySync(repositoryName));
  }, [dispatch, repositoryName]);
  return loading ? (
    <Loader />
  ) : (
    <Container sx={{ my: '80px' }}>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <span>{repository && repository.name}</span>

            <Link
              to="/repositories"
              style={{ textDecoration: 'none', marginLeft: 'auto' }}
            >
              <Button color="primary" size="small">
                Go to list
              </Button>
            </Link>
          </Box>
          <Typography sx={{ my: 1.5 }} color="text.secondary">
            Last commit date:{' '}
            <strong>
              {repository &&
                repository?.commits?.length &&
                repository?.commits[0].commit.author.date}
            </strong>
          </Typography>
          <Typography sx={{ my: 1.5 }} color="text.secondary">
            Author:{' '}
            <strong>
              {repository &&
                repository?.commits?.length &&
                repository.commits[0].commit.author.name}
            </strong>
          </Typography>
          <Typography sx={{ my: 1.5 }} color="text.secondary">
            Commit message:{' '}
            <strong>
              {repository &&
                repository?.commits?.length &&
                repository?.commits[0].commit.message}
            </strong>
          </Typography>
          <Typography sx={{ my: 1.5 }} color="text.secondary">
            ReadMe:
          </Typography>
          <MuiMarkdown>{repository?.readMe}</MuiMarkdown>
        </CardContent>
      </Card>
    </Container>
  );
}

export { RepositoryDetail };
