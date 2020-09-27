import React from "react";
import Row from "../../../widgets/grid/MaterialRow";
import MaterialRow from "../../../widgets/grid/MaterialRow";
import Column from "../../../widgets/grid/MaterialCol";
import MaterialCol from "../../../widgets/grid/MaterialCol";
import Colors from "../../../Colors";
import DashBoardActivity from "../DashBoardActivity";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import MaterialTextView from "../../../widgets/MaterialTextView";
import Separator from "../../../widgets/separator";
import MaterialOptionsMenu from "../../../widgets/menu/MaterialOptionsMenu";
import IconButton from "@material-ui/core/IconButton";
import MaterialIcon from "../../../widgets/MaterialIcon";
import MaterialMenuItem from "../../../widgets/menu/MaterialMenuItem";
import Flex from "../../../widgets/Flex";
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TabsLayout from "../../../widgets/TabsLayout";
import MaterialDivider from "../../../widgets/MaterialDivider";
import MaterialBtn from "../../../widgets/MaterialBtn";
import Checkbox from "@material-ui/core/Checkbox";
import MaterialSelect from "../../../widgets/input/MaterialSelect";
import GridItem from "../../../widgets/grid/GridItem";
import MaterialIconButton from "../../../widgets/button/MaterialIconButton";

export default class Issues extends DashBoardActivity {


    constructor(props) {
        super(props);

        this.state.trendingOptions = [
            {
                key: 0,
                title: (
                    <MaterialMenuItem
                        title={"Notifications"}
                        icon={"Notifications"}
                    />
                )
            }
        ];

        this.state.issues = [];

        this.state.searchOptions = [
            {
                key: 0,
                value: "All"
            }, {
                key: 1,
                value: "#{Assignee:me}"
            }

        ];

    }

    get createAction() {
        return (
            <MaterialBtn
                content={"New Issue"}
                color={Colors.green}
                textColor={Colors.white}
                onClick={
                    e => {
                        this.props.navigator("dashboard/issues/new");
                    }
                }
            />
        );
    }

    get secondarySearchPlaceHolder() {
        return "Search: #{by:me}";
    }


    get trendingTabs() {
        return [
            {
                key: 1,
                label: "All"
            },
            {
                key: 2,
                label: "New"
            },
            {
                key: 3,
                label: "Popular"
            },
            {
                key: 4,
                label: "Critical"
            }
        ];
    }

    get trendingTabsView() {
        return (
            <TabsLayout
                variant={TabsLayout.VARIANT.SCROLLABLE}
                orientation={TabsLayout.ORIENTATION.HORIZONTAL}
                tabs={this.trendingTabs}
            />
        );
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

    get trendingIssueFooter() {
        let tabsStrings = [
            // do not show price if it's flagged as private
            `E.C: ksh.1000`,
            `issue.by`,
            `@Libetal`,
            // if issues is unassigned claim | unassigned | to @Steve
            `issue.assignment`,
            `issue.type`,
            `issue.priority`,
            `issue.state`
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

    get issueTypeBtnStyle() {
        return {
            minWidth: 0,
            minHeight: 0,
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 8,
            paddingRight: 8
        };
    }

    get trendingIssues() {

        let items = [];

        let i = 0;

        while (i < 40) {
            let [type, color] = this.issueTypeDemo;
            let textColor = Colors.white;

            items.push(
                <ListItem key={i++}>
                    <Row>
                        <GridItem xs={1}>
                            <MaterialOptionsMenu
                                id={`issue-${i}-options-menu`}
                                controller={MaterialBtn}
                                header={type}
                                controllerProps={
                                    {
                                        style: this.issueTypeBtnStyle,
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
                        </GridItem>
                        <GridItem xs={11}>
                            <Row>
                                <GridItem xs={10}>
                                    <Column>
                                        <MaterialTextView
                                            text={"This is a sample issue title, but should change depending on issue.title"}
                                            textColor={color}
                                        />
                                    </Column>
                                </GridItem>
                                <GridItem xs={2}>
                                    <Column alignItems={Flex.END}>
                                        <MaterialIconButton
                                            color={Colors.transparent}
                                            icon={"Favorite"}
                                            iconColor={Colors.green}
                                            iconSize={18}
                                            buttonColor={Colors.transparent}
                                        />
                                        <MaterialIconButton
                                            icon={"StarBorder"}
                                            buttonColor={Colors.transparent}
                                            iconSize={18}
                                            iconColor={Colors.green}
                                        />
                                    </Column>
                                </GridItem>
                            </Row>
                            <Row>
                                {this.trendingIssueFooter}
                            </Row>
                        </GridItem>
                    </Row>
                </ListItem>
            );
        }

        return items;
    }

    get trendingListView() {

        let listItems = this.trendingIssues;

        if (listItems.length === 0) listItems = [
            <ListItem key={0}>
                <Column justify={Flex.CENTER} alignItems={Flex.CENTER}>
                    <MaterialIcon icon={"RssFeed"} iconSize={42}/>
                    <MaterialTextView
                        variant={"h5"}
                        text={"Your Feed"}
                    />
                </Column>
            </ListItem>
        ];

        return (
            <List style={{height: 600, maxHeight: 600, minHeight: 400, overflowY: "auto"}}>
                {listItems}
            </List>
        );
    }

    get trendingView() {
        return (
            <Paper>
                <Column>
                    <Toolbar style={{backgroundColor: Colors.purple, width: "inherit"}}>

                        <MaterialTextView
                            text={"Trending"}
                            textColor={Colors.white}
                            variant={"h6"}
                        />
                        <Separator/>
                        <MaterialOptionsMenu
                            id={"trending-options"}
                            controller={IconButton}
                            controllerBody={
                                <MaterialIcon
                                    icon={"MoreHoriz"}
                                    color={Colors.white}
                                />
                            }
                            menuItems={this.state.trendingOptions}
                        />

                    </Toolbar>
                    {this.trendingTabsView}
                    <GridItem xs={12}>
                        {this.trendingListView}
                    </GridItem>
                </Column>
            </Paper>
        );
    }

    get issuesFilters() {

        let priorityFilterOptions = [
            {
                key: 1,
                title: (
                    <MaterialMenuItem
                        title={"high"}
                    />
                )
            }, {
                key: 1,
                title: (
                    <MaterialMenuItem
                        title="critical"
                    />
                )
            }
        ];

        let stateFilterOptions = [
            {
                key: 1,
                title: (
                    <MaterialMenuItem
                        title={"open"}
                    />
                )
            },
            {
                key: 2,
                title: (
                    <MaterialMenuItem
                        title={"closed"}
                    />
                )
            },
            {
                key: 3,
                title: (
                    <MaterialMenuItem
                        title={"submitted"}
                    />
                )
            },
            {
                key: 4,
                title: (
                    <MaterialMenuItem
                        title={"canceled"}
                    />
                )
            },
            {
                // When an issue is being discussed
                // an issue is flagged a discussion when there is at least more than x number of messages associated to it
                key: 5,
                title: (
                    <MaterialMenuItem
                        title={"discussion"}
                    />
                )
            }
        ];

        return (
            [
                this.createFilterOption(
                    "priority-filter-option",
                    "Priority",
                    priorityFilterOptions,
                    "green"
                ),
                this.createFilterOption(
                    "state-filter-option",
                    "State",
                    stateFilterOptions,
                    "purple"
                )
            ]
        );
    }

    get paginationControllerView() {
        return (
            <MaterialRow alignItems={Flex.CENTER} justify={Flex.END}>
                <GridItem flexGrow={1}>
                    {this.paginationSelect}
                </GridItem>
                <GridItem flexGrow={3}>
                    {this.paginationController}
                </GridItem>
            </MaterialRow>
        );
    }

    get issuesCurrentFilters() {
        return this.state.currentFilters;
    }

    set issuesCurrentFilters(value) {
        this.setState({currentFilters: value});
    }

    get issuesCurrentFiltersView() {

        // does not apply styles
        let chipStyle = {
            marginLeft: 2
        };

        return (
            <>
                <Chip
                    style={{
                        ...chipStyle,
                        backgroundColor: Colors.green
                    }}
                    label={" P: high"} color={"secondary"}
                    onDelete={
                        () => {
                            return true;
                        }
                    }
                />
                <Chip
                    style={{
                        ...chipStyle,
                        backgroundColor: Colors.purple
                    }}
                    label={" S: Chip"}
                    onDelete={
                        () => {

                        }
                    }
                />
            </>
        );
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
        let tabsStrings = [
            // do not show price if it's flagged as private
            `E.C: ksh.1000`,
            `issue.by`,
            `@Libetal`,
            // if issues is unassigned claim | unassigned | to @Steve
            `issue.assignment`,
            `issue.type`,
            `issue.priority`,
            `issue.state`
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

    prepIssueListItem(i, issue) {
        let {id: issueId, title} = issue;

        let [type, color] = this.issueTypeDemo;

        // let testStyle = {minHeight: 80, background: Colors.black};

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

    get issueItems() {

        let issues = [];

        let i = 1;

        while (i < 20) {
            issues.push(
                this.prepIssueListItem(
                    i,
                    {
                        id: `bxCvd${i}`,
                        title: `This is a sample issue title for issue ${i}`
                    }
                )
            );
            i++;
        }

        return issues;
    }

    get issuesListView() {
        return (
            <List style={{minHeight: 100, maxHeight: 600, overflowY: "auto"}}>
                {this.issueItems}
            </List>

        );
    }

    get body() {
        return (
            <MaterialRow>
                <GridItem xs={12} xm={8} lg={8} paddingLR={6}>
                    <MaterialCol alignItems={Flex.CENTER}>
                        <Row>
                            <Row alignItems={Flex.CENTER}>
                                {this.issuesFilters}
                                <Separator/>
                                {this.issuesCurrentFiltersView}
                                <Separator/>
                                <MaterialOptionsMenu
                                    id={"filter-options"}
                                    menuItems={[
                                        {
                                            key: 0,
                                            title: "Clear All"
                                        }
                                    ]}
                                    controller={IconButton}
                                    controllerBody={<MaterialIcon icon={"FilterList"} iconSize={18}/>}
                                    controllerProps={{style: {padding: 8}}}
                                    onMenuItemClick={(itemId, menu) => {
                                        menu.close();
                                        switch (itemId) {
                                            case 0:
                                                this.issuesCurrentFilters = [];
                                        }
                                    }}
                                />
                                <Separator/>
                            </Row>
                        </Row>
                        <Row style={{marginTop: 8}} justify={Flex.CENTER} alignItems={Flex.CENTER}>
                            <Checkbox/>
                            <MaterialSelect
                                value={0}
                                color={"secondary"}
                                style={{marginTop: 0}}
                                selectionItems={[
                                    {
                                        key: 0,
                                        value: "Action"
                                    },
                                    {
                                        key: 1,
                                        value: "Save"
                                    },
                                    {
                                        key: 2,
                                        value: "Favorite"
                                    }
                                ]}
                            />
                            <Separator/>
                            <MaterialTextView text={`Found 1000`} fontSize={12}/>
                            <MaterialTextView text={`Showing 100-110`} fontSize={12}/>
                            <Separator/>
                            <GridItem xs={12} lg={4}>
                                {this.paginationControllerView}
                            </GridItem>

                        </Row>
                        {this.issuesListView}
                        <Row>
                            <Separator/>
                            <Column xs={12} lg={4}>
                                {this.paginationControllerView}
                            </Column>
                        </Row>
                    </MaterialCol>
                </GridItem>
                <GridItem xs={12} xm={4} lg={4} paddingLR={6}>
                    {this.trendingView}
                </GridItem>
            </MaterialRow>
        );
    }


}