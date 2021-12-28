import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Header } from '../Header';
import { Footer } from '../Footer';
import { CrosswordsUser } from '../crossword/CrosswordsUser';
import { CrosswordsAdmin } from '../crossword/СrosswordsAdmin';
import { DictionariesAdmin } from '../dictionary/DictionariesAdmin';
import { AdminPanel } from '../AdminPanel';
import { CrosswordManual } from '../crossword/CrosswordManual';
import { AuthForm } from '../AuthForm';
import { InfoDevelopersAdmin } from '../Info/InfoDevelopersAdmin';
import { InfoDevelopersUser } from '../Info/InfoDevelopersUser';
import { InfoSystemAdmin } from '../Info/InfoSystemAdmin';
import { InfoSystemUser } from '../Info/InfoSystemUser';

import { SolveCrossword } from '../crossword/SolveCrossword';
import { SolveCrosswordFromFile } from '../crossword/SolveCrosswordFromFile';

import { ChangeCrossword } from '../crossword/ChangeCrossword';

import './App.css';
<<<<<<< HEAD
=======
import {SolveCrossword} from "../crossword/SolveCrossword";
>>>>>>> c16a6d9a29f96a4591df0740d4d35abdc4250899

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
                  <Route path='/info' element={<InfoDevelopersAdmin />} />
                </>
              ) : (
                <>
                  <Route path='/' element={<CrosswordsUser />} />
                  <Route path='/info' element={<InfoDevelopersUser />} />
                </>
              )}
              <Route path='/crosswords/new' element={<CrosswordManual />} />
              <Route
                path='/crosswords/solve/:crossName'
                element={<SolveCrossword />}
              />
              <Route
                path='/crosswords/solveFile/:formData'
                element={<SolveCrosswordFromFile />}
              />
              <Route
                path='/crosswords/change/:crossName'
                element={<ChangeCrossword />}
              />
              <Route path='/dictionaries/*' element={<DictionariesAdmin />} />
              <Route path='/info/systemA' element={<InfoSystemAdmin />} />
              <Route path='/info/systemU' element={<InfoSystemUser />} />
            </Routes>
          </div>
        </main>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
