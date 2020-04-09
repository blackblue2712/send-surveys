import React from 'react';
import './notify.css';

const Notify = props => {
    return (
        <div id="notify">
            <div className={`notify-image ${props.stats}`}></div>
            <div className="notify-content">{props.content}</div>
        </div>
    )
}

export default Notify;