import React from 'react';
import Banner from '../components/Banner';
import useAuth from '../hooks/useAuth';
import Dashboard from '../components/Dashboard';
import { Helmet } from 'react-helmet';
import Beneficiary from '../components/Beneficiary';

const Home = () => {
    const {user, loading} = useAuth();
    if (loading) {
        return (
          <div className="w-full h-[80vh] flex justify-center items-center">
            <span className="loading loading-spinner loading-xs"></span>
            <span className="loading loading-spinner loading-sm"></span>
            <span className="loading loading-spinner loading-md"></span>
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        );
      }
    return (
        <div>
            <Helmet>
        <title>Swift Task Planner</title>
      </Helmet>
            <div>
                {
                    !user && <Banner />
                }
                {
                    user && <Dashboard />
                }
            </div>
            <Beneficiary />
        </div>
    );
};

export default Home;