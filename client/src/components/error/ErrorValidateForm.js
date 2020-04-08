import React from 'react';

const ErrorValidateForm = props => {
    return (
        <div className="surveys__body-validate">
            <div className="content">Missing {props.error}</div>
        </div>
    )
}

export default ErrorValidateForm;