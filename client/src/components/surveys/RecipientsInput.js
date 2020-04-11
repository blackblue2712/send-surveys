import React from 'react';
import Tag from '../tag/Tag';

class RecipientsInput extends React.Component {
    constructor() {
        super();

        this.state = {
            tags: [],
        }

        this.el = React.createRef();
    }

    checkValidEmail = email => {
        let pattern = /^[a-zA-Z_]\w{3,}@(\w{2,}\.){1,4}\w{2,}$/gi;
        return pattern.test(email);
    }

    handleChange = e => {
        if(e.keyCode === 13 || e.keyCode === 32) {
            let email = this.el.current.value;
            if(this.checkValidEmail(email)) {
                // Make sure email not duplicate
                if(this.state.tags.indexOf(email) === -1) {
                    this.setState({ tags: [...this.state.tags, email.trim()] }, () => {
                        this.el.current.value = "";
                        // Send tags back to CreateSurvey
                        this.props.getRecipients(() => {
                            return this.state.tags;
                        });
                    });
                } else {
                    console.log("show error")
                }
            } else {
                console.log("show error")
            }
        }
    }
    
    closeTag = tag => {
        let { tags } = this.state;
        let index = tags.indexOf(tag);
        tags.splice(index, 1);
        this.setState({ tags });
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({ tags: props.initRecipients });
    }

    render() {
        const { tags } = this.state;
        return (
            <>
                <label htmlFor="title">Recipients ({tags.length}) - <small>Hit enter or white space to add recipient</small></label>
                <input
                    name="recipients" id="recipients" type="email"
                    onKeyDown={e => this.handleChange(e)}
                    ref={this.el}
                />

                <div className="survey__body-recipients">
                    {
                        tags.map( tag => <Tag closeTag={this.closeTag} key={tag} name={tag} />)
                    }
                </div>
            </>
        )
    }
}

export default RecipientsInput;