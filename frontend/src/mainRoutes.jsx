

import { Routes, Route } from 'react-router-dom';
import MoviesTable from './MoviesTable';
import StoresTable from './StoresTable';
// import NotFound from './NotFound';

function MainRoutes() {
  return (
    <Routes>
      <Route path="/movies" element={<MoviesTable />} />
      <Route path="/stores" element={<StoresTable />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default MainRoutes;
