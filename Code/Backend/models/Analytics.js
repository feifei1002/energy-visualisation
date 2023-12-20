const mongoose = require('mongoose');

const analyticLogSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: false
    },
    event: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: false
    },
    pageUrl: {
        type: String,
        required: true //for page view events for analysing later
    },
    additionalDetails: {
        type: Map,
        of: String //can store additional data as key-value pairs
    }
}, { timestamps: true }); //this adds createdAt and updatedAt fields automatically

const AnalyticLog = mongoose.model('AnalyticLogs', analyticLogSchema, 'AnalyticLogs');

module.exports = AnalyticLog;
