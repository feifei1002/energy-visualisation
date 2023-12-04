import "../../css/WikiPages.css"

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
                </div>
            </main>
        </div>
    );
}