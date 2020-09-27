import React, {Component} from "react";
import Col from "../../../widgets/grid/MaterialCol";
import Flex from "../../../widgets/Flex";
import TabsLayout from "../../../widgets/TabsLayout";
import Row from "../../../widgets/grid/MaterialRow";
import GridItem from "../../../widgets/grid/GridItem";
import InputBase from "@material-ui/core/InputBase";
import MaterialIconButton from "../../../widgets/button/MaterialIconButton";
import MaterialDivider from "../../../widgets/MaterialDivider";
import Colors from "../../../Colors";
import MaterialSelect from "../../../widgets/input/MaterialSelect";
import PropTypes from "prop-types";

export default class ProjectSelectDropdown extends Component {


    static propTypes = {
        projectKey: PropTypes.number.isRequired,
        projects:PropTypes.array.isRequired,
        fullWidth:PropTypes.bool,
        onChange: PropTypes.func
    };

    static defaultProps = {
        onChange(newProjectKey){
            console.log(`Unhandled input change for new newProjectKey = ${newProjectKey}`)
        },
        projects:[]
    };

    render() {
        let {
            projectKey,
            projects,
            onChange,
            fullWidth
        } = this.props;

        return (
            <MaterialSelect
                fullWidth={fullWidth}
                value={projectKey}
                selectionHeader={
                    <Col alignItems={Flex.CENTER}>
                        <TabsLayout
                            tabs={
                                ["All", "Pc", "Mobile", "Embedded"].map(((label, key) => ({
                                    key,
                                    label
                                })))
                            }
                        />
                        <Row paddingLR={8} alignItems={Flex.STRETCH}>
                            <GridItem xs={10}>
                                <InputBase
                                    placeholder={"Search For Project"}
                                    onClick={e => e.stopPropagation()}
                                />
                            </GridItem>
                            <GridItem xs={2}>
                                <Col justify={Flex.CENTER} alignItems={Flex.CENTER} height={"100%"}>
                                    <MaterialIconButton
                                        icon={"Search"}
                                        style={{marginRight: 8}}
                                    />
                                </Col>
                            </GridItem>
                        </Row>
                        <MaterialDivider spacing={2} color={Colors.transparent}/>
                    </Col>
                }
                selectionItems={
                    projects.map(({name}, i) => ({
                        key: i,
                        value: name
                    }))
                }
                onChange={
                    (e, input) => {
                        if (input !== undefined) {
                            let {value = 0} = input.props;
                            onChange(value,e)

                        }

                    }
                }
            />
        );
    }
}