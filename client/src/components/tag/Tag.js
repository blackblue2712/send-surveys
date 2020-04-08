import React from 'react';
import "./tag.css";

const Tag = props => {
    
    const closeTag = (name) => {
        console.log(name)
        props.closeTag(name);
    }

    return (
        <div className="tag">
            <div className="tag-name">{props.name}</div>
            <div className="tag-action">
                <i onClick={() => closeTag(props.name)} className="ti-close"></i>
            </div>
        </div>
    )
}

export default Tag;