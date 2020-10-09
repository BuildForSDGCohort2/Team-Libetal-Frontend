import React, {Component} from "react";
import ListItem from "@material-ui/core/ListItem";
import Column from "../../../widgets/grid/MaterialCol";
import Row from "../../../widgets/grid/MaterialRow";
import Flex from "../../../widgets/Flex";
import GridItem from "../../../widgets/grid/GridItem";
import MaterialOptionsMenu from "../../../widgets/menu/MaterialOptionsMenu";
import MaterialBtn from "../../../widgets/MaterialBtn";
import Colors from "../../../Colors";
import MaterialMenuItem from "../../../widgets/menu/MaterialMenuItem";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import MaterialTextView from "../../../widgets/MaterialTextView";
import MaterialIcon from "../../../widgets/MaterialIcon";
import MaterialDivider from "../../../widgets/MaterialDivider";
import PropTypes from "prop-types";
import TabsLayout from "../../../widgets/TabsLayout";

export default class IssueListItemView extends Component {

    static propTypes = {
        id: PropTypes.number,
        title: PropTypes.string,
        estimatedTime: PropTypes.string,
        cost: PropTypes.shape({
            estimated: PropTypes.shape({
                value: PropTypes.number,
                sign: PropTypes.string
            })
        }),
        assignee: PropTypes.shape({
            name: PropTypes.string
        }),
        by: PropTypes.shape({
            name: PropTypes.string
        }),
        project: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
        }),
        priority: PropTypes.string,
        state: PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            description: PropTypes.string
        }),
        type: PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            description: PropTypes.string
        }),
        date: PropTypes.string,
        attachments: PropTypes.arrayOf(PropTypes.string),
        milestones: PropTypes.arrayOf(PropTypes.string),
        tags: PropTypes.arrayOf(PropTypes.string),
        i: PropTypes.number
    };

    static mapCreate(issue, i) {
        return <IssueListItemView i={i} {...issue}/>;
    }

    tabItem(text, i, size) {
        let divider;

        if (i < size) divider =
            <GridItem><Row><MaterialDivider height={18} orientation={MaterialDivider.VERTICAL}/></Row></GridItem>;
        return (
            <Row justify={Flex.SPACE_BETWEEN} alignItems={Flex.CENTER} spacing={1}>
                <GridItem>{text}</GridItem>
                {divider}
            </Row>
        );
    }

    prepIssueFooter(issue) {

        let {
            cost: {
                estimated: {
                    value: estimatedCost = 1000,
                    sign: estimateSign = "ksh"
                } = {}
            } = {},
            id = 0,
            title = `issue.title`,
            assignee: {
                name: assigneeName = `unassigned`
            } = {},
            by: {
                name: by = `issue.by`
            } = {},
            project: {
                name: projectName = `issue.projectName`
            } = {},
            priority = `issue.priority`,
            state: {
                id: issueStateId,
                title: issueStateTitle = `issue.state.title`,
                description: issueStateDescription
            } = {},
            type: {
                title: issueTypeTitle = `issue.title`,
                description: issueDescription
            } = {},
            date: creationDate
        } = this.props;

        let tabsStrings = [
            // do not show price if it's flagged as private
            `E.C: ${estimateSign}${estimatedCost}`,
            `@${by}`,
            projectName || `@Libetal`,
            // if issues is unassigned claim | unassigned | to @Steve
            assigneeName,
            issueTypeTitle,
            priority,
            issueStateTitle
        ];

        return <TabsLayout
            variant={TabsLayout.VARIANT.SCROLLABLE}
            showIndicator={false}
            orientation={"horizontal"}
            tabStyle={{margin: 0, paddingLeft: 4}}
            tabs={
                tabsStrings.map(
                    (string, i) => ({
                        key: i,
                        label: this.tabItem(string, i, tabsStrings.length - 1)
                    })
                )}
        />;
    }

    get issueTypeDemo() {

        let types = ["F", "B", "D", "R"];

        let tI = Math.floor(Math.random() * (types.length - 1));

        let type = types[tI];

        let color;

        switch (type) {
            case "F":
                color = Colors.green;
                break;
            case "B":
                color = Colors.red;
                break;
            case "D":
                color = Colors.blue;
                break;
            case "R":
                color = Colors.orange;
                break;
            default:
                color = Colors.black;
        }
        return [type, color];
    }

    render() {

        let {
            props: {
                issue,
                i
            }
        } = this;

        let {
            cost: {
                estimated: {
                    value: estimatedCost = 1000,
                    sign: estimateSign = "ksh"
                } = {}
            } = {},
            id = 0,
            title = `issue.title`,
            assignee: {
                name: assigneeName = `unassigned`
            } = {},
            by: {
                name: by = `issue.by`
            } = {},
            project: {
                name: projectName = `issue.projectName`
            } = {},
            priority = `issue.priority`,
            state: {
                id: issueStateId,
                title: issueStateTitle = `issue.state.title`,
                description: issueStateDescription
            } = {},
            type: {
                title: issueTypeTitle = `issue.title`,
                description: issueDescription
            } = {},
            date: creationDate,
            attachments = [],
            milestones = [],
            tags = []
        } = this.props;


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
                                            textColor={Colors.blue}
                                            style={{
                                                cursor: "pointer"
                                            }}
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
                                            content={attachments.length > 10 ? "10+" : attachments.length}
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
                                <Row alignItems={Flex.END} justify={Flex.SPACE_BETWEEN}>
                                    <GridItem xs={10}>
                                        {this.prepIssueFooter(issue)}
                                    </GridItem>
                                    <GridItem xs={1}>
                                        <MaterialTextView
                                            text={"20/12/2020"}
                                            fontSize={12}
                                        />
                                    </GridItem>
                                </Row>
                            </Column>
                        </GridItem>
                    </Row>
                    <MaterialDivider/>
                </Column>
            </ListItem>
        );
    }
}