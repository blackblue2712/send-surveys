import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ErrorValidateForm from '../error/ErrorValidateForm';

class MDE extends Component {
    render() {
        let { value, setValue, name, labelName, errors } = this.props;
        return (
            <div className="form-control" style={{marginBottom: '1rem'}}>
                {errors.indexOf(name) !== -1 && <ErrorValidateForm error={name} />}
                <label htmlFor={name}>{labelName}</label>
                <CKEditor
                    editor={ ClassicEditor }
                    data={value}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setValue(name, data)
                    } }
                />
            </div>
        );
    }
}

export default MDE;