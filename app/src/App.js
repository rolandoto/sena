import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "./helpers";
import { PrivateRoute } from "./helpers";
import { Login } from "./auth";
import { Home } from "./Home";
import cookie from "react-cookies";
import { Navbar } from "./components";
import { authActions, uploadActions } from "./_actions";
import {
    EditProfile,
    Roles,
    EditUsers,
    AddUsers,
    ChangePassword,
    UploadUsers,
    SearchAppretices,
    Citations,
    GenerateMinutes,
    GenerateSolicity,
    UploadInstructors,
    MotivesAndProhibitions,
    Solicities,
    Templates,
    Mails,
    SearchInstructors,
} from "./components";
import "./App.css";
import "./_vars.css";
import "./responsive.css";

class App extends Component {
    constructor(props) {
        super(props);

        const getToken = cookie.load("userToken");
        if (getToken) {
            this.props.validateToken(getToken);
        } else {
            history.push("/login");
        }

        this.state = {
            showNavbar: false,
        };
    }

    eHandleHideAlert = (_) => {
        this.props.hideAlert();
    };

    componentDidMount() {
        this.setState({
            showNavbar: true,
        });
    }

    render() {
        const { authReducer, uploadReducer } = this.props;

        return (
            <Router history={history}>
                {authReducer.auth && uploadReducer.status && (
                    <div className="show_alert_popUp alert_show">
                        <img
                            src="assets/img/check_alert.png"
                            className="image_responsive_popup"
                            alt="alert popup confirm"
                        />
                        <div className="title">Genial</div>
                        <div className="subtitle">Se ha completado la subida</div>
                        <div className="subtitle">
                            Subidos: {uploadReducer.total.Success} - Ignorados:{" "}
                            {uploadReducer.total.Failure}
                        </div>
                        <button className="btn mt-5 btn_teal" onClick={this.eHandleHideAlert}>
                            Entendido
                        </button>
                    </div>
                )}

                {authReducer.auth && this.state.showNavbar && <Navbar />}

                <Switch>
                    <PrivateRoute path="/" exact component={Home} auth={authReducer.auth} />
                    <PrivateRoute
                        path="/editProfile"
                        component={EditProfile}
                        auth={authReducer.auth}
                    />
                    <PrivateRoute path="/roles" component={Roles} auth={authReducer.auth} />
                    <PrivateRoute path="/editUsers" component={EditUsers} auth={authReducer.auth} />
                    <PrivateRoute path="/addUser" component={AddUsers} auth={authReducer.auth} />
                    <PrivateRoute
                        path="/changePassword"
                        component={ChangePassword}
                        auth={authReducer.auth}
                    />
                    <PrivateRoute
                        path="/uploadApprentices"
                        component={UploadUsers}
                        auth={authReducer.auth}
                    />
                    <PrivateRoute
                        path="/uploadInstructors"
                        component={UploadInstructors}
                        auth={authReducer.auth}
                    />
                    <PrivateRoute
                        path="/searchAppretices"
                        component={SearchAppretices}
                        auth={authReducer.auth}
                    />
                    <PrivateRoute
                        path="/searchInstructors"
                        component={SearchInstructors}
                        auth={authReducer.auth}
                    />
                    <PrivateRoute path="/citations" component={Citations} auth={authReducer.auth} />
                    <PrivateRoute
                        path="/generateMinutes/:id"
                        component={GenerateMinutes}
                        auth={authReducer.auth}
                    />
                    <PrivateRoute
                        path="/createSolicitiy"
                        component={GenerateSolicity}
                        auth={authReducer.auth}
                    />
                    <PrivateRoute
                        path="/solicities"
                        component={Solicities}
                        auth={authReducer.auth}
                    />
                    <PrivateRoute
                        path="/motivesAndProhibitions"
                        component={MotivesAndProhibitions}
                        auth={authReducer.auth}
                    />
                    <PrivateRoute path="/mails" component={Mails} auth={authReducer.auth} />
                    <PrivateRoute path="/templates" component={Templates} auth={authReducer.auth} />
                    <Route component={Login} path="/login" />
                </Switch>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { authReducer, uploadReducer } = state;
    return { authReducer, uploadReducer };
}

const actionCreator = {
    validateToken: authActions.validateToken,
    hideAlert: uploadActions.hideAlert,
};

const appComponent = connect(mapStateToProps, actionCreator)(App);
export { appComponent as App };
