import React, {Component} from "react";
import PropTypes from "prop-types";
import MaterialTextView from "../../../widgets/MaterialTextView";
import MaterialRow from "../../../widgets/grid/MaterialRow";
import Paper from "@material-ui/core/Paper";
import Footer from "../../Footer";

export default class Teams extends Component {


    static propTypes = {
        navigator: PropTypes.func.isRequired
    };

    render() {
        return (
            <Paper style={{borderRadius:0}}>
                <MaterialRow>
                    <MaterialTextView>
                        Contains actions involving new issue discussion,
                        Discussions affecting the product,
                        And insights depending on team
                        team productivity, team projects
                        team issues and features.
                    </MaterialTextView>
                </MaterialRow>
                <Footer/>
            </Paper>
        );
    }
}