import React from 'react';
import ReactDOM from 'react-dom';
import "./modal.css";
import ReactApexChart from 'react-apexcharts';
import Loading from '../loading/Loading';

class ModalLarge extends React.Component {
    constructor() {
        super();
        this.containerModal = React.createRef();

        this.state = {
            series: [],
            options: {},
            title: "",
            body: "",
            subject: "",
            recipients: [],
            lastUpdate: 0,
            created: 0,
            _id: ""
        }
    }

    componentDidMount() {
        if(this.props.currentSurvey) {
            const { yes, no, title, subject, body, recipients, lastUpdate, created, _id } = this.props.currentSurvey;
            
            this.setState({
                _id,
                title,
                subject,
                body,
                lastUpdate,
                created,
                series: [yes, no, recipients.length - yes - no],
                options: {
                    chart: {
                        width: '50%',
                        type: 'pie',
                    },
                    labels: [`Yes (${yes})`, `No (${no})`, `Wait to response (${recipients.length - yes- no})`],
                    theme: {
                        monochrome: {
                            enabled: true
                        }
                    },
                    plotOptions: {
                        pie: {
                            dataLabels: {
                                offset: -5
                            }
                        }
                    },
                    title: {
                        text: "Data tracking"
                    },
                    dataLabels: {
                        formatter(val, opts) {
                            const name = opts.w.globals.labels[opts.seriesIndex]
                            return [name, val.toFixed(1) + '%']
                        }
                    },
                    legend: {
                        show: true
                    }
                }
            })
        }
    }


    handleCloseModal = () => {
        this.props.closeModal();
    }

    render() {
        const  { options, series, title, subject, body, lastUpdate, created, _id } = this.state;
        return ReactDOM.createPortal(
            <div
                ref={this.containerModal} className="modal-container"
                onClick={this.handleCloseModal}
            >
                <Loading />
                <div
                    className="modal-large"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="modal-large-header">
                        <div className="modal-large-header__title">
                            <div>
                                <h2>[{title}] # ...{_id.substr(-4)}</h2>
                                <p>{subject}</p>
                            </div>
                            <div className="date">
                                {/* <div className="date__created">
                                    {new Date(created).toLocaleString()}
                                </div> */}
                                <div className="date__last-update">
                                    {new Date(lastUpdate || created).toLocaleString()}
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="modal-large-header__action">{this.props.actionHeader}</div>
                    </div>

                    <div className="modal-large-body">
                        <p>{body}</p>

                        <div id="chart">
                            <ReactApexChart options={options} series={series} type="pie" />
                        </div>
                    </div>

                    <div className="modal-large-footer">
                        <div className="modal-large-footer__description">
                            {this.props.descriptionFooter}
                        </div>
                        <div className="modal-large-footer__action">
                            {this.props.actionFooter}
                        </div>
                    </div>
                </div>
            </div>,
            document.querySelector("#modal")
        )
    }
}

export default ModalLarge;