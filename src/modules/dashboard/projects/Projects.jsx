import React, {Component} from "react";
import Row from "../../../widgets/Row";
import MaterialDivider from "../../../widgets/MaterialDivider";
import MaterialSelect from "../../../widgets/input/MaterialSelect";
import Flex from "../../../widgets/Flex";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import MaterialBtn from "../../../widgets/MaterialBtn";
import Settings from "../../../utils/Settings";
import MaterialIcon from "../../../widgets/MaterialIcon";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";
import Footer from "../../Footer";
import PaginationController from "../../../widgets/PaginationController";
import MaterialTextView from "../../../widgets/MaterialTextView";
import List from "@material-ui/core/List";
import HeaderOption from "../widgets/HeaderOption";
import Colors from "../../../Colors";
import Checkbox from "@material-ui/core/Checkbox";
import {ListItem, Toolbar} from "@material-ui/core";
import Separator from "../../../widgets/separator";
import TabsLayout from "../../../widgets/TabsLayout";
import Paper from "@material-ui/core/Paper";
import MaterialOptionsMenu from "../../../widgets/menu/MaterialOptionsMenu";
import MaterialMenuItem from "../../../widgets/menu/MaterialMenuItem";
import MaterialCol from "../../../widgets/grid/MaterialCol";
import MaterialRow from "../../../widgets/grid/MaterialRow";
import GridItem from "../../../widgets/grid/GridItem";
import ProjectsListView from "./widgets/ProjectsListView";


const btnSuccess = createMuiTheme({
    palette: {
        secondary: {
            main: Settings.colorSuccess,
            dark: Settings.colorSuccessDark,
            contrastText: Settings.textSuccess
        }
    }
});

export default class Projects extends Component {

    state = {
        projects: [],
        pageItemsCountKeys: [10, 25, 50, 100],
        pageItemsCountIndex: 0,
        visiblePageIndexControls: 4,
        projectsPerPage: 10,
        totalProjects: 1000,
        currentProjectStartPage: 0,
        searchSelect: [
            {
                key: 0,
                value: "All"
            }, {
                key: 1,
                value: "My Projects"
            },
            {
                key: 2,
                value: "My Proposals"
            }
        ],
        currentSelectIndex: 0,
        projectsFilters: [
            {
                name: "by",
                value: [
                    "@Chris",
                    "@Mike",
                    "@Yvonne"
                ],
                style: {
                    color: Colors.white,
                    backgroundColor: Colors.purple
                }
            },
            {
                name: "platform",
                value: "pc",
                style: {
                    color: Colors.white,
                    backgroundColor: Colors.green
                }
            },
            {
                name: "devs",
                value: "Cro$$D",
                style: {
                    color: Colors.white,
                    backgroundColor: Colors.red
                }
            },
            {
                name: "os",
                value: "linux",
                style: {
                    color: Colors.white,
                    backgroundColor: Colors.orange
                }
            }, {
                name: "state",
                value: "dev",
                style: {
                    color: Colors.white,
                    backgroundColor: Colors.blue
                }
            }
        ]
    };

    constructor(props) {
        super(props);

        this.bindEvents();
    }


    bindEvents() {
        this.onProjectsPageUpdate = this.onProjectsPageUpdate.bind(this);
    }

    onProjectsPageUpdate(currentPage, pageWidth) {
        this.setState({currentProjectStartPage: currentPage * pageWidth});
    }

    get pagination() {
        return (
            <PaginationController
                onUpdate={this.onProjectsPageUpdate}
                visiblePageIndexControls={this.state.visiblePageIndexControls}
                totalItems={this.state.totalProjects}
                startPage={1}
                itemsPerPage={this.state.pageItemsCountKeys[this.state.pageItemsCountIndex]}/>
        );
    }

    get paginationSelect() {
        return (
            <MaterialSelect
                selectionItems={this.state.pageItemsCountKeys.map((v, i) => ({
                    key: i,
                    value: v
                }))}
                selectionHeader={
                    <Row style={{paddingLeft: 4, paddingRight: 4}}>
                        <MaterialTextView
                            text={`Table items count`}
                            textColor={Settings.colorSecondary}
                            fontSize={12}
                        />
                    </Row>
                }
                onChange={(e, n) => {
                    this.setState({pageItemsCountIndex: n.props.value});
                }}
                value={this.state.pageItemsCountIndex}
                style={{marginTop: 0}}/>
        );
    }

    createHeaderOption(id, title, menuItems, btnColor = "green", textColor = "white") {
        return (
            <HeaderOption
                title={title}
                btnColor={Colors[btnColor]}
                textColor={Colors[textColor]}
                id={id}
                menuItems={menuItems}
            />
        );
    }


    get projectsFilters() {
        return this.state.projectsFilters;
    }

    set projectsFilters(filters) {
        this.setState({projectsFilters: filters});
    }


    get filterOptions() {
        return (
            <>
                {
                    this.createHeaderOption(
                        "priority-options",
                        "Platform",
                        [
                            {
                                id: 0,
                                title: "Web"
                            },
                            {
                                id: 1,
                                title: "Pc"
                            },
                            {
                                id: 2,
                                title: "Mac"
                            },
                            {
                                id: 2,
                                title: "IoT"
                            }
                        ],
                        "green"
                    )
                }
                {
                    this.createHeaderOption(
                        "os-options",
                        "OS",
                        [
                            {
                                id: 0,
                                title: "Linux"
                            },
                            {
                                id: 1,
                                title: "Android"
                            },
                            {
                                id: 1,
                                title: "Windows"
                            },
                            {
                                id: 1,
                                title: <MaterialRow justify={Flex.SPACE_BETWEEN}
                                                    alignItems={Flex.CENTER}>Harmony <Checkbox/></MaterialRow>
                            }
                        ],
                        "orange"
                    )
                }

                {
                    this.createHeaderOption(
                        "state-options",
                        "State",
                        [
                            {
                                key: 0,
                                title: "Development"
                            },
                            {
                                key: 1,
                                title: "Testing"
                            },
                            {
                                key: 1,
                                title: "Proposed"
                            }
                        ],
                        "blue"
                    )
                }
                {
                    this.createHeaderOption(
                        "developers-options",
                        "Developers",
                        [
                            {
                                key: 0,
                                title: "I&I"
                            },
                            {
                                key: 1,
                                title: "Vintros"
                            },
                            {
                                key: 1,
                                title: "Cro$$eD"
                            }
                        ],
                        "red"
                    )
                }
            </>
        );
    }

    get paginationController() {
        return (
            <GridItem>
                <MaterialRow alignItems={Flex.CENTER}>
                    {this.paginationSelect}
                    <GridItem>{this.pagination}</GridItem>
                </MaterialRow>
            </GridItem>
        );
    }

    filterChip(name, v, color, style, marginLR = 1) {
        return (
            <GridItem marginLR={marginLR}>
                <Chip
                    size={"small"}
                    label={`${name}: ${v}`}
                    color={color}
                    style={style}
                />
            </GridItem>
        );
    }

    get projectFiltersView() {

        let filters = [];

        this.state.projectsFilters.forEach(
            ({name, value, color = "secondary", style}, i) => {
                if (Array.isArray(value)) {
                    value.forEach(
                        v => {
                            filters.push(
                                this.filterChip(name, v, color, style)
                            );

                        }
                    );
                } else {
                    filters.push(this.filterChip(name, value, color, style));
                }
            }
        );

        return filters;
    }

    get bodyHeader() {


        return (
            <MaterialCol paddingLR={8}>
                <MaterialCol justify={Flex.CENTER}>
                    <MaterialRow justify={Flex.CENTER} alignItems={Flex.CENTER} marginTB={4}>
                        {this.filterOptions}
                    </MaterialRow>
                </MaterialCol>
                <MaterialRow justify={Flex.SPACE_BETWEEN}>
                    <GridItem>
                        <MaterialRow alignItems={Flex.CENTER}>
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
                                    if (itemId === 0) {
                                        this.projectsFilters = [];
                                    }
                                }}
                            />
                            {this.projectFiltersView}
                        </MaterialRow>
                    </GridItem>
                    {this.paginationController}
                </MaterialRow>
            </MaterialCol>
        );
    }

    get projectsListView() {
        return (
            <ProjectsListView projects={this.state.projects.slice()}/>
        );
    }

    get trendingProjects() {

        let i = 3;

        let projects = [
            {
                id: 1,
                name: "Libetal",
                description: "A product to help one invest their time to something that, might have proper future returns"

            },
            {
                id: 2,
                name: "Luro",
                description: "This is a short generic project description, meant to present full text view size and overflow response."
            }
        ];

        while (i < 10) {
            projects.push(
                {
                    id: i,
                    name: `Project ${i++}`,
                    description: "This is a short generic project description, meant to present full text view size and overflow response."
                }
            );
        }
        return projects;
    }

    trendingProjectsFooter() {

        let footerFont = 12;

        function tabItem(text, i, size) {
            let divider;

            if (i < size) divider = (
                <MaterialRow xs={1} justify={Flex.END}>
                    <MaterialDivider
                        height={12}

                        orientation={MaterialDivider.VERTICAL}/>
                </MaterialRow>
            );

            return (
                <MaterialRow justify={Flex.SPACE_BETWEEN} alignItems={Flex.CENTER}>
                    <MaterialRow xs={11} justify={Flex.CENTER} alignItems={Flex.CENTER} paddingLR={8}>
                        <MaterialTextView text={text} fontSize={"8pt"}/>
                    </MaterialRow>
                    {divider}
                </MaterialRow>
            );
        }

        let tabStrings = ["Web", "JS", "Django"];


        return (
            <TabsLayout
                showIndicator={false}
                orientation={TabsLayout.ORIENTATION.HORIZONTAL}
                variant={TabsLayout.VARIANT.SCROLLABLE}
                tabLRPadding={0}
                tabMarginLeft={0}
                tabMarginRight={0}
                tabs={
                    tabStrings.map(
                        (string, i) => ({
                            key: i,
                            label: tabItem(string, i, tabStrings.length - 1)
                        })
                    )}
            />
        );
    }

    prepProjectListItem(project) {
        let {name, description} = project;

        return (
            <MaterialCol xs={12} xm={12} lg={12}>
                <MaterialRow>
                    <MaterialTextView text={name} variant={"h6"}/>
                    <Separator/>
                    options
                </MaterialRow>
                <Row>
                    <MaterialTextView text={description} textColor={Colors.blue} fontSize={12}/>
                </Row>
                <Row>
                    {this.trendingProjectsFooter(project)}
                    <MaterialDivider color={Colors.black} orientation={MaterialDivider.HORIZONTAL} spacing={0}/>
                </Row>
            </MaterialCol>
        );
    }

    get trendingProjectsView() {


        return (
            <List
                children={
                    this.trendingProjects.map(
                        (project, i) => (
                            <ListItem key={project.id}>
                                {this.prepProjectListItem(project)}
                            </ListItem>
                        )
                    )
                }
                style={{minWidth: "100%", maxHeight: 600, overflowY: "auto"}}
            />
        );
    }

    get trendingTabs() {

        let tabs = [
            {
                key: 0,
                label: "All Platforms"
            },
            {
                key: 1,
                label: "PC"
            },
            {
                key: 2,
                label: "Mobile"
            },
            {
                key: 3,
                label: "IoT"
            },
            {
                key: 4,
                label: "New"
            }
        ];

        return (
            <TabsLayout
                variant={"scrollable"}
                tabs={tabs}
            />
        );
    }

    get trendingView() {
        return (
            <Paper>
                <Toolbar style={{background: Colors.red, color: Colors.white}}>
                    <MaterialTextView
                        text={"Trending"}
                        variant={"h6"}
                    />
                    <Separator/>

                    <IconButton>
                        <MaterialIcon icon={"Sort"} color={Colors.white}/>
                    </IconButton>
                    <MaterialOptionsMenu
                        id={"trending-options"}
                        menuItems={
                            [
                                {
                                    id: 0,
                                    title: (
                                        <MaterialMenuItem title={"Notifications"} icon={"Notifications"}
                                                          iconColor={Colors.red}/>
                                    )
                                }
                            ]
                        }
                        controller={IconButton}
                        controllerBody={<MaterialIcon icon={"MoreVert"} color={Colors.white}/>}
                    />
                </Toolbar>
                {this.trendingTabs}
                {this.trendingProjectsView}
            </Paper>
        );
    }

    get projectsView() {
        return (
            <>
                {this.bodyHeader}
                <MaterialRow>
                    {this.projectsListView}
                </MaterialRow>
                <MaterialRow justify={Flex.END} alignItems={Flex.CENTER}>
                    {this.paginationController}
                </MaterialRow>
            </>
        );
    }


    fetchProjects() {
        fetch("/data/projects/all.json")
            .then(data => data.json())
            .then(
                ({response, data}) => {
                    if (response.code === 200) this.setState({projects: data});
                }
            );
    }

    fetchData() {
        this.fetchProjects();
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        let {
            classes
        } = this.props;

        return (
            <Paper elevation={0} className={classes.root} style={{borderRadius: 0}}>
                <MaterialRow paddingLR={8}>
                    <MaterialRow>
                        <Grid container item xs={12} xm={8} lg={8} justify={Flex.CENTER}>
                            <MaterialRow justify={Flex.CENTER} alignItems={Flex.CENTER} style={{paddingTop: 32}}>
                                <MaterialSelect
                                    style={{position: "relative", marginTop: 0, marginLeft: 6}}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={this.state.searchSelect[this.state.currentSelectIndex].value}
                                    renderValue={() => this.state.searchSelect[this.state.currentSelectIndex].value}
                                    selectionItems={this.state.searchSelect}
                                    onChange={
                                        (e, b, c) => {
                                            this.setState({currentSelectIndex: b.props.value});
                                        }
                                    }
                                />
                                <MaterialDivider height={24} orientation={MaterialDivider.VERTICAL} spacing={6}/>
                                <InputBase
                                    placeholder={"Search in{All:ProjectName}"}
                                    style={{flexGrow: .8}}
                                />
                                <IconButton>
                                    <MaterialIcon icon={"Search"}/>
                                </IconButton>
                                <Chip label={"by: @Chris"} color={"secondary"}/>
                                <Chip label={"by: @Chris"} onDelete={() => {
                                }}/>
                                <IconButton style={{padding: 6, margin: 2}}>
                                    <MaterialIcon icon={"Save"}/>
                                </IconButton>
                            </MaterialRow>
                            <MaterialDivider width={"80%"} orientation={"horizontal"}/>
                        </Grid>
                        <Grid container item xs={12} xm={4} lg={4} justify={Flex.END} alignContent={Flex.CENTER}>
                            <ThemeProvider
                                theme={btnSuccess}
                                children={
                                    <MaterialBtn
                                        variant={"contained"}
                                        content={"CREATE PROJECT"}
                                        onClick={
                                            e => {
                                                this.props.navigator("dashboard/projects/new");
                                            }
                                        }
                                    />
                                }
                            />
                        </Grid>
                    </MaterialRow>
                    <MaterialCol>
                        <MaterialRow justify={Flex.SPACE_AROUND}>
                            <GridItem xs={12} xm={7} lg={8}>
                                {this.projectsView}
                            </GridItem>
                            <GridItem xs={12} xm={4} lg={4} paddingLeft={12}>
                                {this.trendingView}
                            </GridItem>
                        </MaterialRow>
                        <MaterialDivider spacing={10} color={Colors.transparent}/>
                        <Footer/>
                    </MaterialCol>
                </MaterialRow>
            </Paper>
        );
    }
}