import React, { useEffect } from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';

import notFoundStyles from './not-found.module.css';

// import { Breadcrumbs } from '../components/breadcrumbs';
// import { HOME_CRUMB } from '../services/breadcrumbs';

export function NotFound404() {
  const history = useHistory();
  const { pathname } = useLocation();

  // useEffect(() => {
  //   const errorBreadcrumb = [HOME_CRUMB, { path: pathname, url: pathname, title: '404' }];
  //   history.replace({ state: errorBreadcrumb });
  // }, [history, pathname])

  return (
    <div className={notFoundStyles.container}>
      {/* <Breadcrumbs /> */}
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