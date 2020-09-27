import React, {Component} from "react";
import {List} from "@material-ui/core";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import Column from "../../../widgets/grid/MaterialCol";
import Row from "../../../widgets/grid/MaterialRow";
import Flex from "../../../widgets/Flex";
import GridItem from "../../../widgets/grid/GridItem";
import MaterialOptionsMenu from "../../../widgets/menu/MaterialOptionsMenu";
import MaterialBtn from "../../../widgets/MaterialBtn";
import Colors from "../../../Colors";
import MaterialMenuItem from "../../../widgets/menu/MaterialMenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import MaterialTextView from "../../../widgets/MaterialTextView";
import MaterialIcon from "../../../widgets/MaterialIcon";
import Separator from "../../../widgets/separator";
import MaterialDivider from "../../../widgets/MaterialDivider";

export default class IssuesListView extends Component {


    static propTypes = {
        issues: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            id: PropTypes.number,
            attachments: PropTypes.arrayOf(PropTypes.string),
            milestones: PropTypes.arrayOf(PropTypes.string)
        }))
    };


    prepIssueListItem(i, issue) {
        let {id: issueId, title} = issue;

        let [type, color] = this.issueTypeDemo;

        return (
            <ListItem key={i} style={{minWidth: "100%"}}>
                <Column>
                    <Row alignItems={Flex.STRETCH}>
                        <GridItem xs={1}>
                            <Column height={"100%"} justify={Flex.SPACE_BETWEEN}>
                                <Row>
                                    <MaterialOptionsMenu
                                        id={`issue-${i}-options-menu`}
                                        controller={MaterialBtn}
                                        header={type}
                                        controllerProps={
                                            {
                                                style: {
                                                    minWidth: 0,
                                                    minHeight: 0,
                                                    paddingTop: 2,
                                                    paddingBottom: 2,
                                                    paddingLeft: 8,
                                                    paddingRight: 8
                                                },
                                                content: type,
                                                color: color,
                                                textColor: Colors.white
                                            }
                                        }
                                        menuItems={[
                                            {
                                                key: 0,
                                                title: <MaterialMenuItem title={`Option`} titleFontSize={12}/>
                                            }
                                        ]}
                                    />
                                </Row>
                                <Row justify={Flex.END}>
                                    <Checkbox style={{color: color, padding: 0, margin: 0, marginBottom: 0}}/>
                                </Row>
                            </Column>
                        </GridItem>
                        <GridItem xs={11}>
                            <Column>
                                <Row>
                                    <GridItem xs={8}>
                                        <MaterialTextView
                                            text={title}
                                            textColor={Colors.orange}
                                        />
                                    </GridItem>
                                    <GridItem xs={4}>
                                        <MaterialBtn
                                            variant={"contained"}
                                            content={"Tackle | Finance"}
                                            startIcon={
                                                <MaterialIcon
                                                    icon={"AccountTree"}
                                                    iconSize={18}
                                                    color={Colors.white}
                                                />
                                            }
                                            color={color}
                                            textColor={Colors.white}
                                            style={{
                                                padding: 0,
                                                paddingLeft: 6,
                                                paddingRight: 6
                                            }}
                                        />
                                        <MaterialBtn
                                            variant={"text"}
                                            content={"100+"}
                                            startIcon={
                                                <MaterialIcon
                                                    icon={"AttachFile"}
                                                    iconSize={18}
                                                    color={color}
                                                />
                                            }
                                            style={{
                                                padding: 0
                                            }}
                                        />

                                        <MaterialBtn
                                            variant={"text"}
                                            content={"100+"}
                                            startIcon={
                                                <MaterialIcon
                                                    icon={"Chat"}
                                                    iconSize={18}
                                                    color={color}
                                                />
                                            }
                                            style={{
                                                padding: 0
                                            }}
                                        />
                                    </GridItem>
                                </Row>
                                <Row alignItems={Flex.END}>
                                    {this.prepIssueFooter(issue)}
                                    <Separator/>
                                    <MaterialTextView
                                        text={"20/12/2020"}
                                        fontSize={12}
                                    />
                                </Row>
                            </Column>
                        </GridItem>
                    </Row>
                    <MaterialDivider/>
                </Column>
            </ListItem>
        );
    }

    render() {
        return (
            <List>

            </List>
        );
    }
}