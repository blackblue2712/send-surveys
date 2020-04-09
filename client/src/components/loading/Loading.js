import React from 'react';
import "./loading.css";

const Loading = props => {
    return (
        <div id="main-loading">
            <div className="loading__backdrop"></div>
            {/* <div className="logo"></div> */}
            <div className="star">
                <div className="point"></div>
                <div className="point"></div>
                <div className="point"></div>
                <div className="point"></div>
                <div className="point"></div>
            </div>
        </div>
    )
}

export default Loading;