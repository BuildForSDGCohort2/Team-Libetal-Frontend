import React, {Component} from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import Home from "./modules/home/Home";
import Contributions from "./modules/repos/contributions/Contributions";
import Theme from "./Theme";
import HoCs from "./Hocs";
import Register from "./modules/users/registration/Register";
import Dashboard from "./modules/dashboard/Dashboard";
import About from "./modules/about/About";
import CreateRepo from "./modules/repos/CreateRepo";
import Repo from "./modules/repos/Repo";
import MaterialTheme from "./widgets/theming/MaterialTheme";
import {ThemeProvider} from "@material-ui/styles";
import Settings from "./utils/Settings";
import CreateIssue from "./modules/repos/CreateIssue";

class AppComponent extends Component {

    static navigate = null;

    navigate = () => {
        throw new Error("Navigate not implemented");
    };


    render() {
        return (
            <Theme>{
                ({theme, appTheme, classes, styles}) =>
                    (
                        <HoCs>{
                            ({navigateTo}) => {
                                // Do this before app render
                                // Or consider passing app to all components
                                this.navigate = navigateTo;

                                return (
                                    <Switch>

                                        <Route
                                            path={"/(a|A)bout"}
                                            component={() => {
                                                return <About
                                                    navigator={navigateTo}
                                                    classes={classes}
                                                />;
                                            }}
                                        />

                                        <Route exact path="(/|/home)"
                                               component={() => (
                                                   <Home
                                                       navigator={navigateTo}
                                                       classes={classes}
                                                       appTheme={appTheme}
                                                       theme={theme}
                                                       userDetails={null}/>
                                               )}/>

                                        <Route path="/(c|C)ontributions"
                                               component={() => (
                                                   <Contributions
                                                       navigator={navigateTo}
                                                       classes={classes}
                                                       theme={theme}
                                                       appTheme={appTheme}
                                                   />
                                               )}
                                        />

                                        <Route path="/register"
                                               component={() => (
                                                   <Register
                                                       navigator={navigateTo}
                                                       classes={classes}
                                                       theme={theme}
                                                       styles={styles}

                                                   />
                                               )}
                                        />
                                        <Route
                                            path={"/dashboard/projects/new"}
                                            component={
                                                location => {
                                                    return (
                                                        <CreateRepo
                                                            theme={MaterialTheme}
                                                            location={location}
                                                            classes={classes}
                                                            navigator={navigateTo}
                                                        />
                                                    );
                                                }
                                            }
                                        />

                                        <Route
                                            path={"/dashboard/issues/new"}
                                            component={
                                                location => {
                                                    return (
                                                        <CreateIssue
                                                            location={location}
                                                            navigator={navigateTo}
                                                        />
                                                    );
                                                }
                                            }
                                        />

                                        <Route
                                            path={"/(d|D)ashboard/projects/:projectName"}
                                            component={
                                                location => (
                                                    <Repo
                                                        classes={classes}
                                                        location={location}
                                                        navigator={navigateTo}
                                                    />
                                                )
                                            }

                                        />

                                        <Route path="/(d|D)ashboard"
                                               component={location => {
                                                   return (
                                                       <Dashboard
                                                           location={location}
                                                           classes={classes}
                                                           navigator={navigateTo}
                                                       />
                                                   );
                                               }}/>

                                        {/*TODO CREATE DASHBOARD*/}
                                        {/*TODO CREATE FINANCIAL ACCOUNT MANAGER*/}
                                        {/*TODO CREATE BUG AND FEATURES REQUEST SECTION*/}
                                    </Switch>
                                );
                            }
                        }</HoCs>
                    )
            }</Theme>
        );
    }

}


const App = withRouter(AppComponent);


export default App;