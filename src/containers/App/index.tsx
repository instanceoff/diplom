import React, { useEffect } from 'react';

import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import Loader from 'components/Loader';
import PrivateRoute from 'components/PrivateRoute';
import Login from 'containers/Login';
import MainCourse from 'containers/MainCourse';
import Decisions from 'containers/Decisions';
import Courses from 'containers/Courses';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from 'api/firebase';
import { getAccount } from 'api/account';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAccount } from './actions';
import { IUser } from 'types/user';
import { createStructuredSelector } from 'reselect';
import { selectCurrentAccount } from './selectors';

import 'flowbite';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  collection,
  orderBy,
  query,
  documentId,
  where,
} from 'firebase/firestore';
import Loading from 'components/Loading';
import Register from 'containers/Register';
import DarkMode from 'components/DarkMode';
import Results from 'containers/Results';

const App = () => {
  const currentPage =
    document.location.pathname === '/'
      ? 'login'
      : document.location.pathname.slice(1);
  const [courses, loading, error] = useCollection(
    query(
      collection(firestore, 'courses'),
      where(documentId(), '==', currentPage),
    ),
  );
  const currentCourse = courses?.docs.find(doc => {
    return doc.id === document.location.pathname.slice(1);
  });

  return (
    <>
      <BrowserRouter>
        <DarkMode>
          {loading ? (
            <Loading />
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Login />} />s
              <Route path="/*" element={<Login />} />
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/courses" element={<Courses />} />
                <Route path="/decisions" element={<Decisions />} />
                <Route path="/results" element={<Results />} />
                <Route
                  path={`/${currentCourse?.id}`}
                  element={<MainCourse id={currentCourse?.id} />}
                />
              </Route>
            </Routes>
          )}
        </DarkMode>
      </BrowserRouter>
      <Loader />
    </>
  );
};

export default App;
