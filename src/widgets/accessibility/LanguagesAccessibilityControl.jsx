import React, {Component} from "react";
import MaterialOptionsMenu from "../menu/MaterialOptionsMenu";
import MaterialRow from "../grid/MaterialRow";
import MaterialIconButton from "../button/MaterialIconButton";

export default class LanguagesAccessibilityControl extends Component {


    state = {
        languages: []
    };


    initLanguages() {
        this.fetchLanguages();
    }

    fetchLanguages() {
        fetch("/data/languages/languages.json")
            .then(response => response.json())
            .then(response => this.onReceivedLanguages(response));
    }

    onReceivedLanguages({response,data} = {}) {
        if (response.code === 200) {
            this.setState({languages: data});
        }
    }

    componentDidMount() {
        this.initLanguages();
    }

    render() {
        return (
            <MaterialOptionsMenu
                id={"language-options-menu"}
                controller={MaterialIconButton}
                controllerProps={{
                    icon: "Language"
                }}
                menuItems={
                    this.state.languages.map(
                        (lang, i) => ({
                            itemId: i,
                            title: lang.name
                        })
                    )
                }/>
        );
    }

}
