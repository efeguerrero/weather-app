import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Favorites from '../pages/Favorites';
import Layout from '../components/Layout';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
