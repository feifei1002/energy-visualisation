import React from 'react';
import DataViewPerRegion from '../components/graphs/analytics/DataViewPerRegion';
import PageViewPerMonth from '../components/graphs/analytics/PageViewPerMonth';
import '../css/AdminAnalytics.css';
const AdminAnalytics = () => {
    return (
        <div className="analytics-dashboard">
            <div className="dashboard-item">
                <DataViewPerRegion />
            </div>
            <div className="dashboard-item">
                <PageViewPerMonth />
            </div>
        </div>
    );
};

export default AdminAnalytics;
