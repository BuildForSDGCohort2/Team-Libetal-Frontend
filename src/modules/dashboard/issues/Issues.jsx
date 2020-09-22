import React from "react";
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
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
import MaterialSelect from "../../../widgets/MaterialSelect";

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
                key: 3,
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

    get issueTypeBtnStyle(){
        return {
            minWidth: 0,
            minHeight: 0,
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 8,
            paddingRight: 8
        }
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
                        <Column xs={1} alignContent={Flex.SPACE_BETWEEN}>
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
                        </Column>
                        <Column xs={10}>
                            <Row>
                                <Column xs={10}>
                                    <MaterialTextView
                                        text={"This is a sample issue title, but should change depending on issue.title"}
                                        textColor={color}
                                    />
                                </Column>
                                <Column xs={2} alignItems={Flex.CENTER}>
                                    <MaterialBtn
                                        variant={"default"}
                                        content={<MaterialIcon icon={"Favorite"} color={Colors.green} iconSize={18}/>}
                                        style={{
                                            padding:4,
                                            minWidth:0,
                                            minHeight:0
                                        }}
                                        color={Colors.transparent}
                                    />
                                    <MaterialBtn
                                        variant={"default"}
                                        content={<MaterialIcon icon={"StarBorder"} color={Colors.green} iconSize={18}/>}
                                        style={{
                                            padding:4,
                                            minWidth:0,
                                            minHeight:0
                                        }}
                                        color={Colors.transparent}
                                    />
                                </Column>
                            </Row>
                            <Row>
                                {this.trendingIssueFooter}
                            </Row>
                        </Column>
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
            <List style={{maxHeight: 600, minHeight: 400,overflowY: "auto"}}>
                {listItems}
            </List>
        );
    }

    get trendingView() {
        return (
            <Paper>
                <Toolbar style={{backgroundColor: Colors.purple}}>
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
                {this.trendingListView}
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
            <Row alignItems={Flex.CENTER} justify={Flex.END}>
                <Column flexGrow={1}>
                    {this.paginationSelect}
                </Column>
                <Column flexGrow={3}>
                    {this.paginationController}
                </Column>
            </Row>
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
                        backgroundColor:Colors.green
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
                        backgroundColor:Colors.purple
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
            <Column><MaterialDivider height={18} orientation={MaterialDivider.VERTICAL}/></Column>;

        return (
            <Row justify={Flex.SPACE_BETWEEN} alignItems={Flex.CENTER} spacing={1}>
                <Column>{text}</Column>
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
                <Column xs={12}>
                    <Row>
                        <Column xs={1} alignContent={Flex.SPACE_BETWEEN}>
                            <Row justify={Flex.CENTER}>
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
                            <Row justify={Flex.END} alignItems={Flex.END}>
                                <Checkbox style={{color: color, padding: 0, margin: 0, marginBottom: 0}}/>
                            </Row>
                        </Column>
                        <Column xs={11}>
                            <Row>
                                <Column xs={8}>
                                    <MaterialTextView
                                        text={title}
                                        textColor={Colors.orange}
                                    />
                                </Column>
                                <Column xs={4}>
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
                                </Column>
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
            <List style={{minWidth: "100%", minHeight: 100, maxHeight: 600, overflowY: "auto"}}>
                {this.issueItems}
            </List>

        );
    }

    get body() {
        return (
            <Row>
                <Column xs={12} xm={8} lg={8} alignItems={Flex.CENTER}>
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
                        <Column xs={12} lg={4}>
                            {this.paginationControllerView}
                        </Column>
                    </Row>
                    {this.issuesListView}
                    <Row>
                        <Separator/>
                        <Column xs={12} lg={4}>
                            {this.paginationControllerView}
                        </Column>
                    </Row>
                </Column>
                <Column xs={12} xm={4} lg={4} style={{paddingLeft: 8}}>
                    {this.trendingView}
                </Column>
            </Row>
        );
    }


}