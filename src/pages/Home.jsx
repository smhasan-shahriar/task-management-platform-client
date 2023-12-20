import React from 'react';
import Banner from '../components/Banner';
import useAuth from '../hooks/useAuth';
import Dashboard from '../components/Dashboard';
import { Helmet } from 'react-helmet';

const Home = () => {
    const {user} = useAuth();
    return (
        <div>
            <Helmet>
        <title>Swift Task Planner</title>
      </Helmet>
            {
                !user && <Banner />
            }
            {
                user && <Dashboard />
            }
        </div>
    );
};

export default Home;