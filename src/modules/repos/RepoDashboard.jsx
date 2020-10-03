import React, {Component} from "react";
import MaterialCol from "../../widgets/grid/MaterialCol";
import Flex from "../../widgets/Flex";
import MaterialRow from "../../widgets/grid/MaterialRow";
import MaterialTextView from "../../widgets/MaterialTextView";
import Separator from "../../widgets/separator";
import GridItem from "../../widgets/grid/GridItem";
import MaterialIconButton from "../../widgets/button/MaterialIconButton";
import AccessibilityControl from "../../widgets/AccessibilityControl";
import UserAccountButton from "../users/widgets/UserAccountsButton";
import MaterialDivider from "../../widgets/MaterialDivider";
import Paper from "@material-ui/core/Paper/Paper";

export default class RepoDashboard extends Component {


    render() {

        let {
            props: {
                component
            }
        } = this;

        let{
            props:{
                navigator
            }
        } = component;

        return (
            <MaterialCol alignItems={Flex.CENTER}>
                <MaterialRow justify={Flex.CENTER} alignItems={Flex.CENTER} marginBottom={6}>
                    Documentation
                    <MaterialDivider orientation={MaterialDivider.VERTICAL} spacing={8} height={24}/>
                    Security
                    <MaterialDivider orientation={MaterialDivider.VERTICAL} spacing={8} height={24}/>
                    Licensing
                    <MaterialDivider orientation={MaterialDivider.VERTICAL} spacing={8} height={24}/>
                </MaterialRow>
                <MaterialDivider
                    width={"80%"}
                />
                This view should depict total project description
                from issues relating to the project.
                total invested time and cost(used to evaluate wasted time)
                total merged time and cost
                tasks relating to the project
                - open tasks
                - closed tasks
                - in progress tasks
                issues
                - posted
                - in discussion issue
                - etc about the issue
                Branching details are to be visible here
                Insights about the project
                - sales made
                - project estimates and returns
                Project admin is to use this view to control the whole project also
                thus need to be able to see issues and assign them
                create new issues relating to the project form here also,
                delete issues depending of abc

            </MaterialCol>
        );
    }
}