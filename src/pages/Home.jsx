import React from 'react';
import Banner from '../components/Banner';
import useAuth from '../hooks/useAuth';
import Dashboard from '../components/Dashboard';

const Home = () => {
    const {user} = useAuth();
    return (
        <div>
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