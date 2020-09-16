import React, {Component} from "react";

import Drawer from "@material-ui/core/Drawer";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import MaterialBtn from "../../../widgets/MaterialBtn";
import AppsIcon from "@material-ui/icons/Apps";
import LockIcon from "@material-ui/icons/Lock";
import PublicIcon from "@material-ui/icons/Public";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import RegisterAppBar from "./RegisterAppBar";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import MaterialGrid from "../../../widgets/MaterialGrid";
import MaterialSelect from "../../../widgets/MaterialSelect";
import MaterialTextField from "../../../widgets/MaterialTextField";
import MaterialInputLayout from "../../../widgets/MaterialInputLayout";
import Typography from "@material-ui/core/Typography";
import {createMuiTheme} from "@material-ui/core/styles";
import {green, orange} from "@material-ui/core/colors";
import {ThemeProvider} from "@material-ui/styles";
import red from "@material-ui/core/colors/red";
import InputAdornment from "@material-ui/core/InputAdornment";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import EmailIcon from "@material-ui/icons/Email";
import RegisterDrawer from "./RegisterDrawer";
import Avatar from "@material-ui/core/Avatar";
import MaterialFileInput from "../../../widgets/MaterialFileInput";
import GitHubIcon from "@material-ui/icons/GitHub";


const success = createMuiTheme({
    palette: {
        primary: {
            main: green["800"],
            dark: green["900"],
            contrastText: "#FFFFFF"
        },
        secondary: {
            main: green["800"],
            dark: green["900"],
            contrastText: "#FFFFFF"
        },
        success: {
            main: orange["800"],
            dark: orange["900"],
            contrastText: "#FFFFFF"
        }
    }
});

const cancel = createMuiTheme({
    palette: {
        primary: {
            main: red["800"],
            dark: red["900"],
            contrastText: "#FFFFFF"
        },
        secondary: {
            main: green["800"],
            dark: green["900"],
            contrastText: "#FFFFFF"
        },
        success: {
            main: orange["800"],
            dark: orange["900"],
            contrastText: "#FFFFFF"
        }
    }
});

export default class Register extends Component {


    static PROFILE_FORM = 0;
    static ACCOUNTS_FORM = 1;
    static ACCESSIBILITY_FORM = 2;

    state = {
        drawerOpen: false,
        /*Should come ordered by id*/
        skills: [],
        selectedSkills: [],
        selectedSkillsIds: [],
        userDetails: {
            profileName: "",
            firstName: "",
            lastName: "",
            phone: 0,
            email: ""
        },
        currentForm: Register.PROFILE_FORM
    };

    get skillsLayout() {
        return this.state.skills.map(skill => (
            <MenuItem
                onClick={this.updateSelectedSkills.bind(this, skill.id)}
                key={skill.id} value={skill.id}>{skill.name}</MenuItem>
        ));
    }

    constructor(props) {
        super(props);

        // This comes from theme
        let {classes, theme, styles} = props;

        if (classes == null) {
            throw new Error("Set the classes variable");
        }

        this.classes = classes;
        this.theme = theme;
        this.appTheme = styles;
        this.styles = styles;

        this.bindEvents();
    }

    async fetchSkills() {
        /*   let res = fetch("https://libetal.backend");
           let skills = (await res).json();*/

        this.setState(state => ({
            skills: [
                {
                    name: "Developer",
                    id: 1
                },
                {
                    name: "Graphics Designer",
                    id: 2
                }
            ]
        }));
    }


    bindEvents() {
        this.onProfileTextChange = this.onProfileTextChange.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.onSkillChange = this.onSkillChange.bind(this);
        this.updateSelectedSkills = this.updateSelectedSkills.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.switchForm = this.switchForm.bind(this);
    }

    toggleDrawer() {
        this.setState(prevState => ({drawerOpen: !prevState.drawerOpen}));
    }

    onLoginClick() {

    }

    getDrawer() {
        return (<Drawer>This is just text</Drawer>);
    }

    getBasicInfo() {
        return (
            <form className={this.classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="First"/>
                <TextField id="standard-basic" label="Second"/>
                <TextField id="standard-basic" label="Last"/>
                <TextField id="standard-basic" label="Profile Name"/>
                <TextField id="filled-basic" label="Filled" variant="filled"/>
                <TextField id="outlined-basic" label="Outlined" variant="outlined"/>
            </form>
        );
    }

    getLoginBtn() {
        return (
            <>
                <MaterialBtn
                    startIcon={<AccountCircleIcon/>}
                    endIcon={<ExpandMoreIcon/>}
                    content={"Login"}
                />
                <Menu open={true}>
                    <MenuItem>Name</MenuItem>
                    <MenuItem/>
                </Menu>

            </>
        );
    }


    getLoginView() {
        return (
            <>
                <nav>
                    {this.getLoginBtn()}
                    <MaterialBtn
                        content={"About Us"}/>
                    <MaterialBtn
                        onClick={this.openAppStore}
                        startIcon={<AppsIcon/>}
                        content={"App Store"}
                    />

                </nav>
            </>
        );
    }

    updateSelectedSkills(skill) {
        console.log(skill);
        if (this.state.selectedSkills.indexOf(skill) === -1) {
            this.setState(prevState => ({
                selectedSkills: [...prevState.selectedSkills, skill]
            }));
        } else this.removeSelectedSkill(skill);
    }

    onSkillChange(event) {

    }

    updateSkills(skills = [
        {
            name: "Developer",
            id: 1
        },
        {
            name: "Graphics Designer",
            id: 2
        }
    ]) {
        this.setState(prevState => ({skills}));
    }

    componentDidMount() {
        this.updateSkills();
    }

    updateRegistrationFragment(fragment = Register.PROFILE_FORM) {
        this.setState(prevState => ({
            currentForm: fragment
        }));
    }

    removeSelectedSkill(id) {
        this.setState(prevState => (
            {
                selectedSkills: prevState.selectedSkills.filter((value, i) => value !== id)
            }
        ));
    }

    getSkill(id) {
        let skill = null;

        /*TODO Improve search*/
        this.state.skills.forEach((value, index) => {

            if (value.id === id) {
                skill = value;
            }
        });

        return skill;
    }

    get nameInputs() {
        let firstNameLabel = "First Name";
        let lastNameLabel = "Last Name";

        return (
            <Grid container xs={12} xm={12} lg={12}>
                <Typography>Name</Typography>
                <MaterialGrid lg={12}>
                    <MaterialTextField
                        label={firstNameLabel}
                        value={this.state.userDetails.profileName}
                        onChange={this.onProfileTextChange}
                        startIcon={<AccountCircleIcon/>}
                        helperText={"Your displayed app name"}
                    />
                </MaterialGrid>
                <MaterialGrid flexGrow={1}>
                    <MaterialTextField
                        label={firstNameLabel}
                        placeholder={firstNameLabel}/>
                </MaterialGrid>
                <MaterialGrid flexGrow={1}>
                    <MaterialTextField
                        label={lastNameLabel}
                        placeholder={lastNameLabel}/>
                </MaterialGrid>
            </Grid>
        );
    }

    get phoneInputs() {
        return (
            <MaterialGrid container xs={12} xm={12} lg={12} style={{marginTop: 8}}>
                <MaterialGrid container xm={12} lg={12} xs={12}>
                    <Typography fullWidth>Contact</Typography>
                </MaterialGrid>
                <MaterialGrid flexGrow={1}>
                    <MaterialTextField
                        validate type={"email"}
                        label={"email"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon/>
                                </InputAdornment>
                            )
                        }}
                    />
                </MaterialGrid>
                <MaterialGrid flexGrow={1}>
                    <MaterialTextField
                        type={"phone"}
                        label={"phone"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneInTalkIcon/>
                                </InputAdornment>
                            )
                        }}/>
                </MaterialGrid>
            </MaterialGrid>
        );
    }


    get addressInputs() {
        return (
            <MaterialGrid container xs={12} xm={12} lg={12} style={{marginTop: 8}}>
                <MaterialGrid xm={12} lg={12} xs={12}>
                    <Typography fullWidth>Address</Typography>
                </MaterialGrid>
                <MaterialGrid flexGrow={1}>
                    <MaterialTextField
                        type={"text"}
                        label={"Country"}
                        startIcon={<PublicIcon/>}
                    />
                </MaterialGrid>
                <MaterialGrid flexGrow={1}>
                    <MaterialTextField type={"text"} label={"City"}/>
                </MaterialGrid>
            </MaterialGrid>
        );
    }

    get passwordInputs() {
        return (
            <MaterialGrid container xs={12} xm={12} lg={12} style={{marginTop: 8}}>
                <MaterialGrid xm={12} lg={12} xs={12}>
                    <Typography fullWidth>Security</Typography>
                </MaterialGrid>
                <MaterialGrid flexGrow={1}>
                    <MaterialTextField
                        item
                        flexGrow={1}
                        required
                        type={"password"}
                        label={"Password"}
                        startIcon={<LockIcon/>}/>
                </MaterialGrid>
                <MaterialGrid flexGrow={1}>
                    <MaterialTextField
                        item
                        flexGrow={1}
                        required type={"password"}
                        label={"Password Again"}
                        startIcon={<LockIcon/>}/>
                </MaterialGrid>
            </MaterialGrid>
        );
    }

    get skillsInput() {
        let {classes} = this.props;

        const ITEM_HEIGHT = 32;
        const ITEM_PADDING_TOP = 4;

        const MenuProps = {
            PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250
                }
            }
        };

        return (
            <MaterialInputLayout>
                <MaterialSelect
                    labelText={"Skills"}
                    menuTitleText={"Skills"}
                    color={"secondary"}
                    labelId="label-skills"
                    id="skills-select"
                    multiple fullWidth
                    value={this.state.selectedSkills}
                    onChange={this.onSkillChange}
                    input={<Input id="skills-select-input"/>}
                    renderValue={(selected) => {
                        return (
                            <div className={classes.chips}>
                                {selected.map(id => (
                                    <Chip color="primary" key={id}
                                          label={this.getSkill(id).name}
                                          className={classes.chip}/>
                                ))}
                            </div>
                        );
                    }}
                    MenuProps={MenuProps}>
                    {this.skillsLayout}
                </MaterialSelect>
            </MaterialInputLayout>
        );
    }

    get submitBtn() {
        let marginTop = 12;
        return (
            <Grid container direction={"row"} justify={"flex-end"} item lg={12}
                  style={{marginTop}}>
                <ThemeProvider theme={cancel}>
                    <MaterialBtn
                        color={"primary"}
                        style={{marginRight: 12}}
                        variant={"contained"}
                        content={"Cancel"}
                    />
                </ThemeProvider>
                <ThemeProvider theme={success}>
                    <MaterialBtn
                        disabled
                        color={"primary"}
                        variant={"contained"}
                        content={"Register"}/>
                </ThemeProvider>
            </Grid>
        );
    }

    getMain() {
        let {classes} = this.props;

        let view;


        switch (this.state.currentForm) {
            case Register.ACCOUNTS_FORM:
                view = <Typography>Accounts</Typography>;
                break;
            case Register.ACCESSIBILITY_FORM:
                view = <Typography>Accounts</Typography>;
                break;
            default:
                view = this.getProfileRegistrationForm();
        }

        return (
            <main className={classes.content}>
                {view}
            </main>
        );
    }

    getProfileRegistrationForm() {

        let {classes} = this.props;

        return (
            <form className={classes.root}>
                <Grid container justify={"space-around"}>
                    <Grid container item xs={5} lg={5}>
                        {this.nameInputs}
                        {this.passwordInputs}
                        {this.phoneInputs}
                        {this.addressInputs}
                        {this.submitBtn}
                    </Grid>
                    <Grid container alignItems={"flex-start"} xs={4} lg={4}>
                        <Grid item lg={12}>
                            <Typography>Qualifications</Typography>
                            {this.skillsInput}
                        </Grid>
                        <Grid item lg={12}>
                            {this.aboutUserInput}
                        </Grid>
                        <Grid item lg={12}>
                            <MaterialFileInput labelText={"CV / Portfolio"}/>
                            <MaterialFileInput labelText={"Certification"}/>
                        </Grid>
                        <Grid item lg={8}>
                            <MaterialTextField
                                label={"GitHub Profile name"}
                                startIcon={<GitHubIcon/>}
                            />
                        </Grid>
                        <Grid item>
                            <MaterialBtn
                                color={"primary"}
                                variant={"contained"}
                                content={"Help"}
                                startIcon={<ContactSupportIcon/>}/>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        );
    }

    getAttachments() {
        return (
            <Grid style={{background: "#FFFF00"}}>
                <MaterialTextField fullWidth type={"file"} placeHolder={"File"}/>
            </Grid>
        );
    }


    get aboutUserInput() {
        return (
            <MaterialTextField
                label={"About You"}
                fullWidth
                lg={12}
                multiline
                rows={3}
                rowsMax={4}
                flexGrow={1}
                placeholder={"Tell us about yourself."}
                style={{height: 40}}
            />
        );
    }

    async registerUser() {
        console.log("Register User");
    }

    switchForm(currentForm = 0) {
        this.setState(prevState => ({currentForm}));
    }

    onProfileTextChange(e) {

        let value = e.target.value;

        this.setState(prevState => {
            let userDetails = prevState.userDetails;

            userDetails.profileName = value;

            return userDetails;
        });

    }

    render() {

        let {classes, theme, styles, appTheme} = this.props;

        return (
            <div className={classes.root} style={{flexDirection: "column"}}>
                <RegisterAppBar
                    color={"secondary"}
                    styles={styles}
                    open={this.state.drawerOpen}
                    classes={classes}
                    handleOpen={this.toggleDrawer}
                />

                <RegisterDrawer
                    success={success}
                    registerUser={this.registerUser}
                    classes={this.classes}
                    theme={theme}
                    appTheme={styles}
                    open={this.state.drawerOpen}
                    switchForm={this.switchForm}
                    toggleDrawer={this.toggleDrawer}/>

                <Grid
                    container
                    direction="row"
                    justify={"space-around"}>
                    <Grid container
                          item
                          lg={2}
                          justify={"center"}
                          alignItems={"center"}
                          direction="row">
                        <Avatar src={"images/branding.png"} style={{height: 100, width: 100}}/>
                    </Grid>
                    <Grid
                        container
                        item
                        lg={8}
                        justify={"flex-start"}
                        direction="column">
                        <Grid item
                              container
                              justify={"flex-end"}
                              direction="row"
                              style={{paddingRight: 40}}>
                            <MaterialBtn
                                content={"FAQ"}/>
                            <MaterialBtn
                                content={"About US"}/>
                        </Grid>
                    </Grid>

                </Grid>
                {this.getMain()}
            </div>
        );
    }

}
