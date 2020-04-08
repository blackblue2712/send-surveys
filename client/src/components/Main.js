import React from 'react';
import SurveyImg from '../images/header.png';

class Main extends React.Component {

    render() {
        return (
            <main>
                <section id="introduce">
                    <div className="introduce-left">
                        <img src={SurveyImg} alt="survey" />
                    </div>
                    <div className="introduce-right">
                        <h1 className="introduce__title">Send Surveys</h1>
                        <p className="introduce__description">
                            There are so many ways to get your surveys to the ideal audience. With Zoho Survey, no one is too far away to reach.
                        </p>
                        <p className="introduce__description">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, necessitatibus?
                        </p>
                        <button className="btn btn-primary">
                            Learn More
                        </button>
                    </div>
                </section>

                <section id="features">

                </section>
            </main>
        )
    }
}

export default Main;