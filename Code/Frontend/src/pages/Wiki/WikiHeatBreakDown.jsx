import "../../css/WikiPages.css"
import { Table, Button, Modal, Form} from 'react-bootstrap';
import React from 'react';

export default function WikiHeatBreakDown() {
    return (
        <div className="landing-page">
            <main>
                <div className="wiki-page">
                <div className="video-responsive video-frame">
                        <iframe
                        width="853"
                        height="480"
                        src={`https://www.youtube.com/embed/K8KlTB23yk8?si=_ChLB1pZ9ivFRqiZ`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                        />
                    </div>
                 <div className="video-transcript">
                 <button className="video-button"  
                 ><a href="https://youtubetranscript.com/?v=K8KlTB23yk8" className="video-link">Show Transcript</a></button>
                 </div>
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