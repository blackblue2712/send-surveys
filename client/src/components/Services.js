import React from 'react';
import { connect } from 'react-redux';

class Services extends React.Component {

    sendSurveys = async () => {
        
    }

    render() {
        console.log("services")
        return (
            <section id="services">
                Services
                <button
                    className="btn btn-primary"
                    onClick={this.sendSurveys}
                >
                    Send
                </button>
            </section>
        )
    }
}

export default connect(
    null,
)(Services);