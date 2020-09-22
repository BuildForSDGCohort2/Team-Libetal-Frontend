import React, {Component} from "react";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import MaterialDivider from "../../widgets/MaterialDivider";
import MaterialSelect from "../../widgets/MaterialSelect";
import Flex from "../../widgets/Flex";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import MaterialBtn from "../../widgets/MaterialBtn";
import Settings from "../../utils/Settings";
import MaterialIcon from "../../widgets/MaterialIcon";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";
import Footer from "../Footer";
import PaginationController from "../../widgets/PaginationController";
import MaterialTextView from "../../widgets/MaterialTextView";
import List from "@material-ui/core/List";
import MaterialImage from "../../widgets/MaterialImage";
import HeaderOption from "./widgets/HeaderOption";
import Colors from "../../Colors";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import FlexDivider from "../../widgets/FlexDivider";
import {ListItem, Toolbar} from "@material-ui/core";
import Separator from "../../widgets/separator";
import TabsLayout from "../../widgets/TabsLayout";
import Paper from "@material-ui/core/Paper";
import MaterialOptionsMenu from "../../widgets/menu/MaterialOptionsMenu";
import MaterialMenuItem from "../../widgets/menu/MaterialMenuItem";


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
        pageItemsCountKeys: [10, 25, 50, 100],
        pageItemsCountIndex: 0,
        visiblePageIndexControls: 4,
        projectsPerPage: 10,
        totalProjects: 1000,
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
        projectsFilters: []
    };

    constructor(props) {
        super(props);

        this.bindEvents();
    }


    bindEvents() {
        this.onProjectsPageUpdate = this.onProjectsPageUpdate.bind(this);
    }

    onProjectsPageUpdate(currentPage, pageWidth) {
        console.log(`Got a page update`);
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
                                title: <Row alignItems={Flex.CENTER}>Harmony <Checkbox checked={true}/></Row>
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

    get bodyHeader() {

        return (
            <Row>
                <Column xs={12} lg={8} justify={Flex.CENTER}>
                    <Row justify={Flex.START} alignItems={Flex.CENTER}>
                        {this.filterOptions}
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
                                        this.projectsFilters = [];
                                }
                            }}
                        />
                    </Row>
                    <Row justify={Flex.START} alignItems={Flex.CENTER}>
                        <Chip label={"by: @Chris"} color={"secondary"}/>
                        <Chip label={"by: @Chris"} onDelete={() => {
                        }}/>
                    </Row>
                </Column>
                <Column lg={4} alignContent={Flex.END}>
                    <Row justify={Flex.END} alignItems={Flex.CENTER}>
                        {this.paginationSelect}
                        <Column>{this.pagination}</Column>
                    </Row>
                </Column>
            </Row>
        );
    }

    technologyImage(src = "ic_django.png") {
        let style = {
            marginRight: 4,
            height: 18,
            width: 18
        };

        return (
            <Avatar
                src={`/assets/icons/png/${src}`}
                variant={"circle"}
                style={style}
            />
        );
    }

    projectTechnologies() {
        return (
            <Row>
                <Column xs={1}/>
                <Column xs={8}>
                    <Row>
                        {this.technologyImage("ic_django.png")}
                        {this.technologyImage("ic_js.png")}
                        {this.technologyImage("ic_python.png")}
                        {this.technologyImage("ic_react.png")}
                    </Row>
                </Column>
            </Row>
        );
    }

    projectFooter() {
        return (
            <Row justify={Flex.CENTER}>
                <Column xs={1} lg={1}/>
                <Column xs={8} lg={8}>
                    <Row alignItems={Flex.CENTER} justify={Flex.SPACE_AROUND}>
                        <MaterialTextView text={"10 commits"}/>
                        <MaterialDivider orientation={"vertical"} height={18} spacing={4}/>
                        <MaterialTextView text={"10 Issues"}/>
                        <MaterialDivider orientation={"vertical"} height={18} spacing={4}/>
                        <MaterialTextView text={"100+ tasks"}/>
                        <MaterialDivider orientation={"vertical"} height={18} spacing={4}/>
                        <MaterialTextView text={"10 teams"}/>
                        <MaterialDivider orientation={"vertical"} height={18} spacing={4}/>
                        <MaterialTextView text={"10 bugs"}/>
                    </Row>
                </Column>
                <Column xs={3} lg={3}>
                    <Row alignItems={Flex.CENTER}>
                        <MaterialIcon icon={"StarBorder"} iconSize={18}/>
                        <MaterialTextView text={"3.5"}/>
                        <MaterialDivider orientation={"vertical"} height={18} spacing={4}/>
                        <MaterialIcon icon={"FavoriteBorder"} iconSize={18}/>
                        <MaterialTextView text={"1000+"}/>
                    </Row>
                </Column>
            </Row>
        );
    }

    getUserAvatar() {
        return (
            <Avatar
                variant={"circle"}
                style={{
                    height: 18,
                    width: 18,
                    marginTop: 2
                }}
            />
        );
    }

    get projectsListItems() {

        let {
            state: {
                pageItemsCountKeys,
                pageItemsCountIndex: pIcT
            }
        } = this;

        let i = 0;

        let count = pageItemsCountKeys[pIcT];

        let projectsItems = [];

        while (i < count) {
            projectsItems.push(
                <Column xs={12} lg={12} justify={Flex.CENTER} style={{marginBottom: 4, marginTop: 6}}>
                    <Row>
                        <Column xs={1} lg={1}>
                            <MaterialImage
                                src={"/images/logo.png"}
                                size={40}
                            />
                        </Column>
                        <Column xs={8} lg={8}>
                            <Row>
                                by @Mike, Rose, Emily
                            </Row>
                            <Row alignItems={Flex.CENTER}>
                                <Column xs={11}>
                                    <MaterialTextView
                                        text={"This is a sample project description and is required soon to have more than this text here "}
                                        textColor={Colors.blue}
                                    />
                                </Column>
                                <MaterialIcon icon={"AttachFile"} iconSize={18}/>
                                <MaterialTextView text={"2"} fontSize={12}/>
                            </Row>
                        </Column>
                        <Column xs={3} lg={3}>
                            <Row>
                                <Column xs={6} justify={Flex.SPACE_AROUND}>
                                    <Chip
                                        label={"latest @v1.0.0"}
                                        style={{backgroundColor: Colors.green, color: Colors.white}}/>
                                    <MaterialTextView
                                        text={"20 Jun 2020"}
                                        fontSize={12}
                                    />
                                    <Row alignItems={Flex.CENTER}>
                                        {this.getUserAvatar()}
                                        {this.getUserAvatar()}
                                        {this.getUserAvatar()}
                                    </Row>
                                </Column>
                                <Grid container item xs={6}>
                                    <Row justify={Flex.END}>
                                        <MaterialIcon icon={"Notifications"}/>
                                    </Row>
                                    <FlexDivider/>
                                    <Row>
                                        <MaterialTextView text={"1000+ users"} variant={"h6"}/>
                                    </Row>
                                </Grid>
                            </Row>
                        </Column>
                    </Row>
                    {this.projectTechnologies()}
                    {this.projectFooter()}
                    <MaterialDivider width={"95%"}/>
                </Column>
            );

            i++;
        }

        return projectsItems;
    }

    get projectsListView() {

        return (
            <List
                children={
                    this.projectsListItems.map(
                        view => {
                            return (
                                <ListItem children={view}/>
                            );
                        })
                }
                style={{flexGrow: 1, padding: 6, maxHeight: 600, minHeight: 600, overflow: "auto"}}
            />
        );
    }

    get trendingProjects() {


        let i = 3;

        let projects = [
            {
                id:1,
                name: "Libetal",
                description: "A product to help one invest their time to something that, might have proper future returns"

            },
            {
                id:2,
                name: "Luro",
                description: "This is a short generic project description, meant to present full text view size and overflow response."
            }
        ];

        while (i < 10) {
            projects.push(
                {
                    id:i,
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

            if (i < size) divider =
                <Column><MaterialDivider height={18} orientation={MaterialDivider.VERTICAL}/></Column>;

            return (
                <Row justify={Flex.SPACE_BETWEEN} alignItems={Flex.CENTER} spacing={1}>
                    <Column>{text}</Column>
                    {divider}
                </Row>
            );
        }

        let views = (
            <>
                <MaterialTextView text={"Web"} fontSize={footerFont}/>
                <MaterialDivider height={24} orientation={MaterialDivider.VERTICAL}/>
                <MaterialTextView text={"JS"} fontSize={footerFont}/>
                <MaterialDivider height={24} orientation={MaterialDivider.VERTICAL}/>
                <MaterialTextView text={"Django"} fontSize={footerFont}/>
            </>
        );

        let tabStrings = ["Web", "JS", "Django"];


        /**
         * TODO
         * This tabs could change the project description section
         * by i.e when onClick of Js shows how much django is used in the project
         * Could also use OptionsMenu
         * */
        let tabbed = (
            <TabsLayout
                showIndicator={false}
                orientation={"horizontal"}
                variant={"scrollable"}
                tabStyle={{margin: 0, paddingLeft: 4}}
                tabs={tabStrings.map(
                    (string, i) => ({
                        key: i,
                        label: tabItem(string, i, tabStrings.length - 1)
                    })
                )}
            />
        );

        return tabbed;
    }

    prepProjectListItem(project) {
        let {name, description} = project;

        return (
            <Column xs={12} xm={12} lg={12}>
                <Row>
                    <MaterialTextView text={name} variant={"h6"}/>
                    <Separator/>
                    options
                </Row>
                <Row>
                    <MaterialTextView text={description} textColor={Colors.blue} fontSize={12}/>
                </Row>
                <Row>
                    {this.trendingProjectsFooter(project)}
                    <MaterialDivider color={Colors.black} orientation={MaterialDivider.HORIZONTAL} spacing={0}/>
                </Row>
            </Column>
        );
    }

    get trendingProjectsView() {


        return (
            <List
                children={
                    this.trendingProjects.map(
                        (project,i) => (
                            <ListItem key={project.id}>
                                {this.prepProjectListItem(project)}
                            </ListItem>
                        )
                    )
                }
                style={{minWidth:"100%",maxHeight: 600, overflowY: "auto"}}
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
                <Row>
                    {this.bodyHeader}
                </Row>
                <Row>
                    {this.projectsListView}
                </Row>
                <Row justify={Flex.END} alignItems={Flex.CENTER}>
                    {this.paginationSelect}
                    <Column>
                        {this.pagination}
                    </Column>
                </Row>
            </>
        );
    }

    render() {
        let {
            classes
        } = this.props;

        return (
            <Row className={classes.root}>
                <Column xs={12}>
                    <Row>
                        <Grid container item xs={12} xm={8} lg={8} justify={Flex.CENTER}>
                            <Row justify={Flex.CENTER} alignItems={Flex.CENTER} style={{paddingTop: 32}}>
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
                            </Row>
                            <MaterialDivider width={"80%"} orientation={"horizontal"}/>
                        </Grid>
                        <Grid container item xs={12} xm={4} lg={4} justify={Flex.END} alignContent={Flex.CENTER}>
                            <ThemeProvider
                                theme={btnSuccess}
                                children={
                                    <MaterialBtn
                                        variant={"contained"}
                                        content={"CREATE PROJECT"}/>
                                }
                            />
                        </Grid>
                    </Row>
                </Column>
                <Column xs={12}>
                    <Row justify={Flex.SPACE_AROUND}>
                        <Column xs={12} xm={7} lg={8}>
                            {this.projectsView}
                        </Column>
                        <Column xs={12} xm={4} lg={4} style={{paddingLeft: 12}}>
                            {this.trendingView}
                        </Column>
                    </Row>
                    <Footer/>
                </Column>
            </Row>
        );
    }
}