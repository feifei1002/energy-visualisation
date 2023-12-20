import React from 'react';
import DataViewPerRegion from '../components/graphs/analytics/DataViewPerRegion';
import PageViewPerMonth from '../components/graphs/analytics/PageViewPerMonth';
import '../css/AdminAnalytics.css';
import Header from "../Header.jsx";

const AdminAnalytics = () => {
    return (
        <div>
            <Header />

            <div className="analytics-dashboard">
                <div className="dashboard-item">
                    <h2 className="graph-title">Data View Per Region</h2>
                    <DataViewPerRegion />
                </div>
                <div className="dashboard-item">
                    <h2 className="graph-title">Page View Per Month</h2>
                    <PageViewPerMonth />
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
