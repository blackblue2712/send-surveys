import React, { useRef, useState } from 'react';
import Tag from '../tag/Tag';

const InputFiles = props => {

    let [files, setFiles] = useState(props.initFiles);
    let [filesData, setFilesData] = useState([]);
    let ips = useRef(null);

    const handleAddFiles = async event => {
        let filesIp = event.target.files;
        
        if (filesIp.length > 0) {
            const filenames = [];
            const filesDataArr = [];
            for (let i = 0; i < filesIp.length; i++) {
                filenames.push(filesIp[i].name);
                filesDataArr.push(filesIp[i]);
            }
            setFiles( [...files, ...filenames] );
            setFilesData( [...filesData, ...filesDataArr] );
            props.getFile(() => {
                return [...filesData, ...filesDataArr];
            });
        }
    }

    const closeTag = name => {
        setFiles(files.filter(fn => fn !== name));

        let filesDataFiltered = filesData.filter(file => file.name !== name);
        setFilesData(filesDataFiltered);

        props.getFile(() => {
            return filesDataFiltered;
        });
    }
    
    return (
        <div className="form-control">
            <label htmlFor="attchments">Attachments ({files.length})</label>
            <a href="#chooseFiles"onClick={() => {ips.current.click(); console.log(ips.current)}} className="btn-attachments">
                <h4>Attach files here.</h4>
                <i className="ti-files"></i>
            </a>
            <input
                ref={ips} type="file" multiple
                accept="image/*, application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleAddFiles}
                id="attchments"
            />
                <div className="survey__body-recipients">
                {
                    files.map( file => <Tag closeTag={closeTag} key={file} name={file} />)
                }
            </div>
        </div>
    )
}

export default InputFiles;