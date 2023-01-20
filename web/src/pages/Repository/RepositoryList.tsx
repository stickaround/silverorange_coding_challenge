import * as React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  MenuItem,
  InputLabel,
  Box,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Loader } from '../../core/Loader';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import {
  getRepositoriesSync,
  selectRepositories,
  selectLoading,
} from './repositorySlice';

import { Repository } from '../../types';
import { LANGUAGES } from '../../constants';

function RepositoryList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const repositories: Repository[] = useAppSelector(selectRepositories);
  const loading: boolean = useAppSelector(selectLoading);
  const [language, setLanguage] = React.useState(
    searchParams.get('language') ?? ''
  );

  React.useEffect(() => {
    dispatch(getRepositoriesSync(language));
  }, [dispatch, language]);

  const handleRowClick = (name: string) => {
    navigate(name);
  };

  const handleLanguageChange = (e: SelectChangeEvent<string>) => {
    setLanguage(e.target.value);
    navigate(`?language=${e.target.value}`);
  };

  return loading ? (
    <Loader />
  ) : (
    <Container sx={{ my: '70px' }}>
      <Paper>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            padding: '10px',
          }}
        >
          <InputLabel id="language-select-label" sx={{ marginRight: '10px' }}>
            Language:{' '}
          </InputLabel>

          <Select
            value={language}
            onChange={handleLanguageChange}
            labelId="language-select-label"
            sx={{ width: '200px' }}
          >
            <MenuItem value="" />
            {LANGUAGES.map((lang) => (
              <MenuItem key={lang} value={lang}>
                {lang}
              </MenuItem>
            ))}
          </Select>
        </Box>
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
                <TableRow
                  key={repository.id}
                  sx={{ cursor: 'pointer' }}
                  onClick={(e) => handleRowClick(repository.name)}
                  hover
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Link to={`${repository.name}`}>{repository.name}</Link>
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
