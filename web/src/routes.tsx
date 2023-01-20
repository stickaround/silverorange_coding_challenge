import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from './core/components/Layout';
import { RepositoryList } from './pages/Repository/RepositoryList';
import { RepositoryDetail } from './pages/Repository/RepositoryDetail';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/repositories" element={<RepositoryList />} />
          <Route
            path="/repositories/:repositoryName"
            element={<RepositoryDetail />}
          />
          <Route path="*" element={<Navigate to="/repositories" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export { AppRoutes as Routes };
