import "../../css/WikiPages.css"
import { Table, Button, Modal, Form} from 'react-bootstrap';
import React from 'react';

export default function WikiHeatDemand() {
    return (
        <div className="landing-page">
            <main>
                <div className="wiki-page">
                <div className="video-responsive video-frame">
                        <iframe
                        width="853"
                        height="480"
                        src={`https://www.youtube.com/embed/SdnGXUX3HEw?si=Ighmgh7Q9j_oEWTk`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                        />
                    </div>
                 <div className="video-transcript">
                 <button className="video-button"  
                 ><a href="https://youtubetranscript.com/?v=SdnGXUX3HEw&t=1" className="video-link">Show Transcript</a></button>
                 </div>
                </div>
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
                        <td>LSOA Code</td>
                        <td>Lower Layer Super Output Areas</td>
                        </tr>
                        <tr>
                        <td>KWh</td>
                        <td>Kilowatt Hours</td>
                        </tr>
                        <tr>
                        <td>GWh</td>
                        <td>Gigawatt Hours</td>
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