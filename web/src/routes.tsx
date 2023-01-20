import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from './core/components/Layout';
import { RepositoryList } from './pages/Repository/RepositoryList';
import { RepositoryDetail } from './pages/Repository/RepositoryDetail';
import { App } from './App';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/repositories" element={<RepositoryList />} />
          <Route
            path="/repositories/{repository_id}"
            element={<RepositoryDetail />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export { AppRoutes as Routes };
