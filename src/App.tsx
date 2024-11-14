import { Route, Routes } from 'react-router-dom';

import TopLayout from './layouts/TopLayout';
import TVShows from './containers/TVShows/TVShows';

import DetailedView from './components/DetailedView/DetailedView';
import Page404 from './components/Page404/Page404';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<TopLayout />}>
          <Route element={<TVShows />}>
            <Route index element={<DetailedView />} />
            <Route path='shows/:id' element={<DetailedView />} />
          </Route>
          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
