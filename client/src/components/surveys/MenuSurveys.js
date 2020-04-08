import React from 'react';

class MenuSurveys extends React.Component {

    render() {
        return (
            <div id="menu-surveys">
                <div className="menu-surveys__items">
                    <div className="menu-surveys__item">
                        <i className="ti-save"></i> Save survey
                    </div>
                    <div className="menu-surveys__item">
                        <div>
                            <i className="ti-reload"></i> Load surveys
                        </div>
                    </div>
                    <div className="menu-surveys__item">
                        <i className="ti-layout-grid2"></i> See example
                    </div>
                </div>

                <div className="surveys-history">
                    <ul className="surveys-history__items">
                        <li className="surveys-history__item">
                            Template 1
                        </li>
                        <li className="surveys-history__item">
                            Template 2
                        </li>
                        <li className="surveys-history__item">
                            Template 3
                        </li>
                        <li className="surveys-history__item">
                            Template 4
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default MenuSurveys;