import Contacts from './components/Contacts';
import Header from './components/Header';
import Home from './components/Home';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import Graph from './components/Graph';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/graph' element={<Graph />} />
      </Routes>
    </>
  )
}

export default App
