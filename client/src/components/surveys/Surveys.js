import React from 'react';
import "./Surveys.css";
import { withRouter } from 'react-router-dom';
import Image from '../../images/sending-surveys-header-2x.png';
import { connect } from 'react-redux';
import ModalLogin from '../modal/ModalLogin';

class Surveys extends React.Component {
    state = {
        openModal: false
    }

    checkLogin = () => {
        if(!this.props.auth) {
            this.setState({ openModal: true });
        } else {
            const { _id } = this.props.auth;
            this.props.history.push(`/services/create/${_id}`);
        }
    }


    render() {
        let { openModal } = this.state;
        return (
            <main>
                {openModal && <ModalLogin closeModal={() => this.setState({ openModal: false })}/>}
                <section id="features-surveys">
                    <div className="surveys__header">
                        <h1>Send Surveys</h1>
                    </div>
                    <div className="surveys__body">
                        <p>
                            There are so many ways to get your surveys to the ideal audience. With Zoho Survey, no one is too far away to reach.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, vitae?
                        </p>

                        <button
                            className="btn btn-outline btn-green btn-bold btn__create-survey"
                            onClick={this.checkLogin}
                        ></button>
                    </div>
                    <div className="surveys__image">
                        <img src={Image} alt="send-survey"/>
                    </div>

                </section>
            </main>
        )
    }
}

const mapStateToProps = state => {
    return { auth: state.auth }
}

export default connect(
    mapStateToProps
)(withRouter(Surveys));