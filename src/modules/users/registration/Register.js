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
import MaterialSelect from "../../../widgets/input/MaterialSelect";
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
import Paper from "@material-ui/core/Paper";
import Footer from "../../Footer";
import Settings from "../../../utils/Settings";
import GridItem from "../../../widgets/grid/GridItem";
import MaterialCol from "../../../widgets/grid/MaterialCol";
import MaterialRow from "../../../widgets/grid/MaterialRow";
import Flex from "../../../widgets/Flex";
import MaterialTextView from "../../../widgets/MaterialTextView";
import MaterialImageInput from "../../../widgets/input/MaterialImageInput";
import MaterialDivider from "../../../widgets/MaterialDivider";
import Colors from "../../../Colors";
import Checkbox from "@material-ui/core/Checkbox";
import MaterialIconButton from "../../../widgets/button/MaterialIconButton";


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
    static QUALIFICATIONS_FORM = 3;

    state = {
        drawerOpen: false,
        /*Should come ordered by id*/
        skills: [],
        selectedSkills: [],
        selectedSkillsIds: [],
        userDetails: {
            username: "",
            f_name: "",
            l_name: "",
            password: "",
            passwordAgain: "",
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
        let profileNameLabel = "Profile Name";
        let firstNameLabel = "First Name";
        let lastNameLabel = "Last Name";

        return (
            <MaterialCol>
                <Typography>Name</Typography>
                <MaterialGrid lg={12}>
                    <MaterialTextField
                        label={profileNameLabel}
                        value={this.state.userDetails.username}
                        onChange={this.onProfileTextChange}
                        startIcon={<AccountCircleIcon/>}
                        helperText={"Your displayed app name"}
                    />
                </MaterialGrid>
                <MaterialRow justify={Flex.SPACE_BETWEEN}>
                    <GridItem xs={12} sm={5}>
                        <MaterialTextField
                            value={this.state.userDetails.f_name}
                            fullWidth
                            label={firstNameLabel}
                            placeholder={firstNameLabel}/>
                    </GridItem>
                    <GridItem xs={12} sm={5}>
                        <MaterialTextField
                            fullWidth
                            value={this.state.userDetails.l_name}
                            label={lastNameLabel}
                            placeholder={lastNameLabel}/>
                    </GridItem>
                </MaterialRow>
            </MaterialCol>
        );
    }

    get phoneInputs() {
        return (
            <MaterialRow marginTop={8} justify={Flex.SPACE_BETWEEN}>
                <MaterialRow>
                    <Typography fullWidth>Contact</Typography>
                </MaterialRow>
                <GridItem xs={12} sm={5}>
                    <MaterialTextField
                        validate type={"email"}
                        label={"email"}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon/>
                                </InputAdornment>
                            )
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={5}>
                    <MaterialTextField
                        type={"phone"}
                        fullWidth
                        label={"phone"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneInTalkIcon/>
                                </InputAdornment>
                            )
                        }}/>
                </GridItem>
            </MaterialRow>
        );
    }


    get addressInputs() {
        return (
            <MaterialRow marginTop={8} justify={Flex.SPACE_BETWEEN}>
                <MaterialRow>
                    <MaterialTextView
                        text={"Address"}
                    />
                </MaterialRow>
                <GridItem xs={12} sm={5}>
                    <MaterialTextField
                        type={"text"}
                        label={"Country"}
                        startIcon={<PublicIcon/>}
                        fullWidth
                    />
                </GridItem>
                <GridItem xs={12} sm={5}>
                    <MaterialTextField
                        type={"text"}
                        label={"City"}
                        fullWidth
                    />
                </GridItem>
            </MaterialRow>
        );
    }

    get passwordInputs() {
        return (
            <MaterialRow marginTop={8} justify={Flex.SPACE_BETWEEN}>
                <MaterialRow>
                    <Typography fullWidth>Security</Typography>
                </MaterialRow>
                <GridItem xs={12} sm={5} lg={5}>
                    <MaterialTextField
                        item
                        fullWidth
                        required
                        type={"password"}
                        label={"Password"}
                        startIcon={<LockIcon/>}/>
                </GridItem>
                <GridItem xs={12} sm={5} lg={5}>
                    <MaterialTextField
                        item
                        fullWidth
                        required type={"password"}
                        label={"Password Again"}
                        startIcon={<LockIcon/>}/>
                </GridItem>
            </MaterialRow>
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
            <MaterialSelect
                labelText={"Skills"}
                menuTitleText={"Skills"}
                color={"secondary"}
                labelId="label-skills"
                id="skills-select"
                multiple
                fullWidth
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
        );
    }

    get submitBtn() {
        let marginTop = 12;
        return (
            <>
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
            </>
        );
    }

    get paymentsForm() {


        return (
            <GridItem xs={8} sm={6} lg={4}>
                <Paper>
                    Payment
                </Paper>
            </GridItem>
        );
    }

    get qualificationsFormAndPayments() {

        return (
            <MaterialCol minHeight={400} alignItems={Flex.CENTER}>
                {this.qualificationsForm}
                {this.paymentsForm}
            </MaterialCol>
        );
    }

    get qualificationsForm() {

        return (
            <GridItem xs={8} sm={6} lg={7}>
                <Paper style={{padding: 8}}>
                    <Typography>Qualifications</Typography>
                    <GridItem xs={12} sm={5}>
                        {this.skillsInput}
                    </GridItem>
                    <GridItem>
                        {this.aboutUserInput}
                    </GridItem>
                    <GridItem marginTB={4}>
                        <MaterialFileInput
                            fullWidth
                            labelText={"CV / Portfolio"}/>
                    </GridItem>
                    <GridItem marginTB={4}>
                        <MaterialFileInput
                            fullWidth
                            labelText={"Certification"}/>
                    </GridItem>

                    <MaterialRow alignItems={Flex.CENTER} justify={Flex.SPACE_BETWEEN} marginTB={10}>
                        <GridItem>
                            <MaterialTextField
                                label={"GitHub Profile name"}
                                startIcon={<GitHubIcon/>}
                            />
                        </GridItem>
                        <GridItem>
                            <MaterialBtn
                                color={"primary"}
                                variant={"contained"}
                                content={"Help"}
                                startIcon={<ContactSupportIcon/>}/>
                        </GridItem>
                    </MaterialRow>
                </Paper>

            </GridItem>
        );
    }

    getMain() {
        let {classes} = this.props;

        let view;

        switch (this.state.currentForm) {
            case Register.ACCESSIBILITY_FORM:
                view = <Typography>Accounts</Typography>;
                break;
            case Register.QUALIFICATIONS_FORM:
                view = this.qualificationsFormAndPayments;
                break;
            default:
                view = this.getProfileRegistrationForm();
        }

        return (
            <main className={classes.content}>
                {view}
                <MaterialDivider spacing={10} color={Colors.transparent}/>
            </main>
        );
    }

    getProfileRegistrationForm() {

        let {classes} = this.props;

        return (
            <MaterialRow justify={Flex.CENTER} alignContent={Flex.CENTER}>
                <MaterialRow sm={12} lg={2} alignItems={Flex.CENTER} justify={Flex.CENTER}>
                    <MaterialImageInput
                        paddingLR={1}
                        paddingTB={4}
                        width={200}
                        inputSize={8}
                        clearSize={2}
                        actionSize={2}
                        maxPreviewHeight={160}
                        maxPreviewWidth={"80%"}
                    />
                </MaterialRow>
                <GridItem xs={8} lg={5}>
                    <Paper style={{padding: 6}}>
                        {this.nameInputs}
                        {this.passwordInputs}
                        {this.phoneInputs}
                        {this.addressInputs}
                        <MaterialRow alignItems={Flex.CENTER} marginTop={4}>
                            <MaterialRow xs={12} sm={6} alignItems={Flex.CENTER}>
                                <Checkbox
                                    onChange={
                                        (e, newValue) => this.setState(
                                            state => {


                                                return state;
                                            }
                                        )
                                    }
                                />
                                <MaterialBtn
                                    textTransform={"none"}
                                    variant={"text"}
                                    padding={0}
                                    content={"Accept Terms & Conditions"}
                                />
                                <MaterialIconButton icon={"Help"}/>
                            </MaterialRow>
                            <MaterialRow xs={12} sm={6} alignItems={Flex.CENTER} justify={Flex.SPACE_EVENLY}>
                                {this.submitBtn}
                            </MaterialRow>
                        </MaterialRow>
                    </Paper>
                </GridItem>
            </MaterialRow>
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
                multiline
                rows={5}
                rowsMax={5}
                placeholder={"Tell us about yourself."}
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

            userDetails.username = value;

            return userDetails;
        });

    }

    render() {

        let {classes, theme, styles, appTheme} = this.props;

        return (
            <div className={classes.root} style={{flexDirection: "column"}}>
                <ThemeProvider theme={Settings.appTheme}>
                    <RegisterAppBar
                        color={"secondary"}
                        styles={styles}
                        open={this.state.drawerOpen}
                        classes={classes}
                        handleOpen={this.toggleDrawer}
                        navigator={this.props.navigator}
                        registrationInstance={this}
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
                    <Paper style={{borderRadius: 0}} elevation={0}>
                        {this.getMain()}
                    </Paper>
                    <Footer/>
                </ThemeProvider>
            </div>
        );
    }

}
