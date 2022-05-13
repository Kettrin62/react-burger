import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import profileStyles from './profile.module.css';
import ProfileNav from '../components/profile-nav/profile-nav';
import { ProfileProfilePage } from './profile-profile';
import { ProfileOrdersPage } from './profile-orders';


export function ProfilePage() {

  return (
    <section className={profileStyles.container}>
      <Router>
        <ProfileNav />
        <Switch>
          <Route path='/profile' exact={true}>
            <ProfileProfilePage />
          </Route>
          <Route path='/profile/orders' exact={true}>
            <ProfileOrdersPage />
          </Route>
        </Switch>
      </Router>
    </section>
  );
}
