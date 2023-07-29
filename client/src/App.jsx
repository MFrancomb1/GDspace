import { Fragment } from 'react'
import './App.css'

// components
import ListUsers from './components/ListUsers';
import Registration from './components/Registration';


function App() {
  return (
    <Fragment>
       <ListUsers></ListUsers>
       <Registration></Registration>
    </Fragment>
  );
};

export default App;
