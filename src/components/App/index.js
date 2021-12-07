import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Header } from '../Header';
import { CrosswordsUser } from '../CrosswordsUser';
import { CrosswordsAdmin } from '../СrosswordsAdmin';
import { AdminPanel } from '../AdminPanel';
import { CrosswordManual } from '../CrosswordManual';
import { AuthForm } from '../AuthForm';

import './App.css';

function App() {
  const [isAuthorized, setIsAuthorized] = useState(
    sessionStorage.getItem('isAuthorized') === 'true' ? true : false
  );

  return (
    <div className='app'>
      <Router>
        <Header isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />

        <main className='main'>
          <div className='main__container'>
            <Routes>
              <Route
                path='/login'
                element={<AuthForm setIsAuthorized={setIsAuthorized} />}
              />
              {isAuthorized ? (
                <>
                  <Route path='/' element={<AdminPanel />} />
                  <Route path='/crosswords' element={<CrosswordsAdmin />} />
                </>
              ) : (
                <>
                  <Route path='/' element={<CrosswordsUser />} />
                </>
              )}
              <Route path='/crosswords/new' element={<CrosswordManual />} />
            </Routes>
          </div>
        </main>

        <footer className='footer'>
          <div className='footer__container'>
            <p>Сведения об этом сайте</p>
          </div>
        </footer>
      </Router>
    </div>
  );
}

export default App;
