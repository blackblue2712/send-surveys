import React from 'react';
import ErrorValidateForm from '../error/ErrorValidateForm';

const InputFormControl = props => {
    let { name, labelName, setValue, value, errors } = props;
    return (
        <div className="form-control">
            {errors.indexOf(name) !== -1 && <ErrorValidateForm error={name} />}
            <label htmlFor={name}>{labelName}</label>
            <input
                type="text" name={name} id={name}
                value={value}
                onChange={e => setValue(name, e.target.value)}
            />
        </div>
    )
}

export default InputFormControl;