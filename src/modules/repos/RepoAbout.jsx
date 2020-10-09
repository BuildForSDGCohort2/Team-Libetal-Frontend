import React, {Component} from "react";
import ReactMarkdown from "react-markdown";
import MDEditor, {commands, ICommand, TextState, TextApi} from "@uiw/react-md-editor";
import MaterialRow from "../../widgets/grid/MaterialRow";
import GridItem from "../../widgets/grid/GridItem";
import Flex from "../../widgets/Flex";
import Colors from "../../Colors";
import MaterialTextView from "../../widgets/MaterialTextView";
import MaterialTextField from "../../widgets/MaterialTextField";
import InputBase from "@material-ui/core/InputBase";
import Libetal from "../../widgets/icons/Libetal";


/**
 * About the repo
 * Needs to do demonstrations about
 * what the product is,
 * how the product works,
 * anyone can view some section of this page.
 * */


export default class RepoAbout extends Component {

    state = {
        // This should be loaded from a file
        mdDocumentation: "## About your project",
        documentationLocation: ""
    };

    onDocumentationChange(newDocumentation) {
        this.setState({mdDocumentation: newDocumentation});
    }

    constructor(props) {
        super(props);

    }

    set documentation(location) {
        location = location || "";
        if (this.state.documentationLocation !== location) {
            this.setState(
                {documentationLocation: location},
                () => {
                    fetch(`/assets/sample.docs/${location.toLowerCase()}`)
                        .then(response => response.clone().text())
                        .then(
                            mdDocumentation => {
                                this.setState({mdDocumentation});
                            }
                        );
                }
            );
        }
    }

    render() {
        let {
            state: {
                mdDocumentation
            },
            props: {
                project
            }
        } = this;

        this.documentation = project.documentation;

        return (
            <>
                <MaterialRow justify={Flex.CENTER}>
                    <GridItem xs={12} lg={10} marginTop={12} marginBottom={12}>
                        <ReactMarkdown
                            source={mdDocumentation}
                        />
                    </GridItem>
                </MaterialRow>
            </>
        );
    }
}