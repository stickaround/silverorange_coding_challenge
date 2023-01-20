import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { getRepositoriesSync, selectRepositories } from './repositorySlice';

import { Repository } from '../../types';

function RepositoryList() {
  const dispatch = useAppDispatch();
  const repositories: Repository[] = useAppSelector(selectRepositories);

  React.useEffect(() => {
    dispatch(getRepositoriesSync());
  }, [dispatch]);

  return (
    <Container sx={{ my: '70px' }}>
      <Paper>
        <Table>
          <TableHead sx={{ fontSize: '18px' }}>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Fork Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repositories.length ? (
              repositories.map((repository, index) => (
                <TableRow key={repository.id} sx={{ cursor: 'pointer' }} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Link to={`${repository.id}`}>{repository.name}</Link>
                  </TableCell>
                  <TableCell>{repository.description}</TableCell>
                  <TableCell>{repository.language}</TableCell>
                  <TableCell>{repository.forks_count}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell sx={{ textAlign: 'center' }} colSpan={5}>
                  No Repository
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export { RepositoryList };
