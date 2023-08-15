import './App.css'
import { Route, Routes} from 'react-router-dom';

// Routes
import Layout from './routes/layout';
import Home from './routes/home';
import Player from './routes/player';
import Login from './routes/Login';
import Register from './routes/register';
import ErrorPage from './error-page';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='player' element={<Player />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
