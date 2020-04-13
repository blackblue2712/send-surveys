import React from 'react';
import * as XLSX from 'xlsx';
import Tag from '../tag/Tag';

class XLSXClass extends React.Component {
    constructor() {
        super();
        this.state = {
            tags: []
        }

        this.ip = React.createRef();
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({ tags: props.initRecipients });
    }

    checkValidEmail = email => {
        let pattern = /^[a-zA-Z_]\w{3,}@(\w{2,}\.){1,4}\w{2,}$/gi;
        return pattern.test(email);
    }

    checkValidFileType = fileName => {
        const ext = ["xls", "xlsb", "xlsm", "xlsx", "ods"];
        return ext.includes(fileName.split(".")[fileName.split(".").length - 1]);
    }

    closeTag = tag => {
        let { tags } = this.state;
        let index = tags.indexOf(tag);
        tags.splice(index, 1);
        this.setState({ tags });
    }

    readFileRecipients = event => {
        const file = event.target.files[0];
        const fileName = file.name;
        
        if(this.checkValidFileType(fileName)) {
            let validDataArr = [];
            const reader = new FileReader();
            reader.onload = (evt) => { // evt = on_file_select event
                /* Parse data */
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
                /* Update state */
                data.forEach((itemArr) => {
                    const validData = itemArr.filter(item => this.checkValidEmail(item));
                    validDataArr = [...validDataArr, ...validData];
                });
                
                this.setState({ tags: validDataArr }, () => {
                    this.ip.current.value = "";
                    this.props.getRecipientsViaExcel(() => { 
                        return this.state.tags;
                    });
                });

            };
            reader.readAsBinaryString(file);
        } else {
            alert("Accept file types : xls, xlsb, xlsm, xlsx, ods");
        }

    }


    render() {
        const { tags } = this.state;
        return (
            <div className="form-control">
                <label htmlFor="readFileRecipients">Import recipients via excel</label>
                <a href="#chooseFiles"onClick={() => this.ip.current.click()} className="btn-attachments">
                    <h4>Attach files here.</h4>
                    <i className="ti-import"></i>
                </a>
                <input
                    ref={this.ip}
                    type="file"
                    accept="application/vnd.ms-excel"
                    onChange={this.readFileRecipients}
                    style={{display: "none"}}
                />

                <div className="survey__body-recipients">
                    {
                        tags.map( tag => <Tag closeTag={this.closeTag} key={tag} name={tag} />)
                    }
                </div>
            </div>
        )
    }
}

export default XLSXClass;
