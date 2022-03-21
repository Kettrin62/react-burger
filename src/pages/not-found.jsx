import React, { useEffect } from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';
import notFoundStyles from './not-found.module.css';


export function NotFound404() {
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <div className={notFoundStyles.container}>
      <div className={notFoundStyles.content}>
        <h1>Oops! 404 Error</h1>
        <p>The page you requested does not exist</p>
        <br />
        <br />
        <p>check the address or try <Link to='/' className={notFoundStyles.link}>homepage</Link></p>
      </div>
    </div>
  );
}