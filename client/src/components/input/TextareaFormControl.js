import React from 'react';
import ErrorValidateForm from '../error/ErrorValidateForm';

const TextareaFormControl = props => {
    let { name, labelName, setValue, value, errors } = props;
    return (
        <div className="form-control">
            {errors.indexOf(name) !== -1 && <ErrorValidateForm error={name} />}
            <label htmlFor={name}>{labelName}</label>
            <textarea
                name={name} id={name}
                value={value}
                onChange={e => setValue(name, e.target.value)}
            ></textarea>
        </div>
    )
}

export default TextareaFormControl;