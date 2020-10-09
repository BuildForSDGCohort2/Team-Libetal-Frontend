import React, {Component} from "react";
import Row from "../../../widgets/grid/MaterialRow";
import Col from "../../../widgets/grid/MaterialCol";
import Column from "../../../widgets/grid/MaterialCol";
import GridItem from "../../../widgets/grid/GridItem";
import PropTypes from "prop-types";
import Flex from "../../../widgets/Flex";
import MaterialOptionsMenu from "../../../widgets/menu/MaterialOptionsMenu";
import MaterialBtn from "../../../widgets/MaterialBtn";
import Colors from "../../../Colors";
import MaterialMenuItem from "../../../widgets/menu/MaterialMenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import MaterialTextView from "../../../widgets/MaterialTextView";
import MaterialIcon from "../../../widgets/MaterialIcon";
import MaterialDivider from "../../../widgets/MaterialDivider";
import TabsLayout from "../../../widgets/TabsLayout";

export default class TrendingIssueView extends Component {

    static propTypes = {
        issue: PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            assignee: PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string
            }),
            project: PropTypes.object,
            type: PropTypes.string,
            priority: PropTypes.string,
            state: PropTypes.string,
            by: PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string
            })
        })
    };

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

    prepIssueFooter({cost:{estimation},by:{name:byName},project:{name:projectName},assignee:{name:assigneeName},type,priority,state}) {
        let tabsStrings = [
            // do not show price if it's flagged as private
            `E.C${estimation}/=`,
            byName,
            projectName,
            // if issues is unassigned claim | unassigned | to @Steve
            assigneeName,
            type.toLowerCase(),
            priority,
            state
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

    render() {
        let {
            issue
        } = this.props;

        let{
            id,
            title,
            assignee: {
                name: assigneeName
            },
            project: {
                name: projectName
            },
            priority,
            state,
            type,
            date:creationDate

        } = issue;

        let t = type[0].toUpperCase();
        let color;

        switch (t) {
            case "B":
                color = Colors.red;
                break;
            case "F":
                color = Colors.green;
                break;
            case "P":
                color = Colors.purple;
                break;
            default:
                color = Colors.orange;
                break;
        }

        return (
            <Col>
                <Row alignItems={Flex.STRETCH}>
                    <GridItem xs={1}>
                        <Column height={"100%"} justify={Flex.SPACE_BETWEEN}>
                            <Row>
                                <MaterialOptionsMenu
                                    id={`issue-${id}options-menu`}
                                    controller={MaterialBtn}
                                    header={"Type"}
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
                                            content: t,
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
                        <Row alignItems={Flex.CENTER}>
                            <GridItem xs={12} lg={10}>
                                {this.prepIssueFooter(issue)}
                            </GridItem>
                            <GridItem xs={12} lg={2}>
                                <Row justify={Flex.SPACE_BETWEEN}>
                                    <MaterialTextView
                                        text={creationDate}
                                        fontSize={12}
                                    />
                                </Row>
                            </GridItem>
                        </Row>
                    </GridItem>
                </Row>
                <MaterialDivider/>
            </Col>
        );
    }
}
