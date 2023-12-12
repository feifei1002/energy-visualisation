import "../../css/WikiPages.css"
import React from 'react';
import {Table} from "react-bootstrap";

export default function WikiResistanceHeaters() {
    return (
        <div className="landing-page">
            <main>
                <div className="table">
                    <h3>Table Terms</h3>
                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th>Term</th>
                            <th>Meaning</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>UK daily OAT</td>
                            <td>the UK daily average outside air temperature</td>
                        </tr>
                        <tr>
                            <td>KWh</td>
                            <td>Kilowatt Hours</td>
                        </tr>
                        <tr>
                            <td>GWh</td>
                            <td>Gigawatt Hours</td>
                        </tr>
                        <tr>
                            <td>Heat Production</td>
                            <td>Hour share of annual heat production for resistance heaters</td>
                        </tr>
                        <tr>
                            <td>Electricity Consumption</td>
                            <td>Hour share of annual electricity consumption for resistance heaters</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="futher-info">
                    <button className="video-button">
                    <a className="video-link" href="https://www.nature.com/articles/s41597-022-01356-9">
                     Read more about the dataset used
                    </a>
                    </button>
                </div>
            </main>
        </div>
    );
}