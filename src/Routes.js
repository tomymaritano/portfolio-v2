// src/routes.js
import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';

const routes = (
  <>
    <Route path="/" element={<HomePage />} />
    <Route path="/Work" element={<ProjectsPage />} />
     {/* <Route path="*" element={<NoMatchPage />} />  Maneja cualquier ruta no definida */}
    {/* Puedes agregar más rutas aquí */}
  </>
);

export default routes;