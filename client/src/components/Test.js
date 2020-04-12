import React from 'react';
import axios from 'axios';

class Test extends React.Component {
    constructor() {
        super();
        this.ips = React.createRef();
        this.formData = new FormData();
    }

    handleSubmit = () => {
        console.log(this.formData.getAll("files[]"));
        // this.formData.append("title", "test title");
        // this.formData.append("body", "test body");
        // this.formData.append("subject", "test subject");

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        axios.post("http://localhost:5000/services/test", this.formData, config)
            .then(response => console.log(response))
            .catch(errors => console.log(errors));
    }

    addData = async event => {
        console.log(event.target.files)
        let files = event.target.files;

        if (files.length > 0) {
            this.formData.delete("files[]");
            for (let i = 0; i < files.length; i++) {
                console.log(i, files[i])
                this.formData.append('files[]', files[i]);
            }
        }

    }

    readFile = file => {
        // let reader = new FileReader();
        // reader.readAsDataURL(file);
        this.formData.append('files', file);
    }

    render() {
        return (
            <main>
                <form onSubmit={e => e.preventDefault()}>
                    <input
                        ref={this.ips} type="file" multiple
                        accept="image/*, application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={this.addData}
                    />
                    <button onClick={this.handleSubmit}>submit</button>
                </form>
            </main>
        )
    }
}

// accept="image/*, application/pdf, .doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 

export default Test;