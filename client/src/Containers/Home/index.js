import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { WEB_URL } from '../../Config'
class Home extends Component {
    render() {
        return (
            <div className="Container p-5">
                <h1 className="display-1 text-center mt-5"> 
                    FPRT-1 
                </h1>
                <p className="lead text-center">
                    click below start the demo
                </p>
                <div className="d-flex w-100 justify-content-center align-items-center">
                    <button className="btn btn-primary"
                        onClick={() => this.props.history.push(WEB_URL.User_Login)}
                    >
                    Start
                    </button>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);