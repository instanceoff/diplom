import React, { useEffect } from 'react';

import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import Test from 'containers/TestContainer';
import Loader from 'components/Loader';
import Login from 'containers/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'api/firebase';
import { getAccount } from 'api/account';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAccount } from './actions';
import { IUser } from 'types/user';
import { createStructuredSelector } from 'reselect';
import { selectCurrentAccount } from './selectors';
import Courses from 'containers/Courses';
import PrivateRoute from 'components/PrivateRoute';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/courses" element={<Courses />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Loader />
    </>
  );
};

export default App;
