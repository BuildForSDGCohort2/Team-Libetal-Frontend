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
import Typography from "@material-ui/core/Typography";
import {createMuiTheme} from "@material-ui/core/styles";
import {green, orange} from "@material-ui/core/colors";
import {ThemeProvider} from "@material-ui/styles";
import red from "@material-ui/core/colors/red";
import InputAdornment from "@material-ui/core/InputAdornment";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import EmailIcon from "@material-ui/icons/Email";
import RegisterDrawer from "./RegisterDrawer";
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
import Toolbar from "@material-ui/core/Toolbar";
import Separator from "../../../widgets/separator";
import TabsLayout from "../../../widgets/TabsLayout";
import ListItemDiv from "../../repos/ListItemDiv";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import MaterialImage from "../../../widgets/MaterialImage";
import Link from "@material-ui/core/Link";
import MaterialFileInputBase from "../../../widgets/input/file/MaterialFileInputBase";
import SearchInputBase from "../../../widgets/input/SearchInputBase";
import InputBase from "@material-ui/core/InputBase";
import CashInput from "../../../widgets/input/CashInput";
import MaterialPhoneTextField from "../../../widgets/input/text/MaterialPhoneTextField";
import MaterialCsvTextField from "../../../widgets/input/text/MaterialCsvTextField";
import CardExpiryField from "../../../widgets/input/text/CardExpiryField";


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
        accountsTermsConditions: false,
        drawerOpen: false,
        showPaymentTabGeneral: true,
        showCardPaymentTab: true,
        showPayPalPaymentTab: true,
        /*Should come ordered by id*/
        skills: [],
        currencies: [],
        selectedCurrencyIndex: 0,
        currentPaymentTab: 0,
        selectedSkills: [],
        selectedSkillsIds: [],
        userDetails: {
            hourlyRates: undefined,
            username: "",
            f_name: "",
            card: {
                cardNumber: "",
                cardCSV: "",
                cardExpiry: ""
            },
            paypal: {
                email: "",
                access_token: ""
            },
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
        if (this.state.selectedSkills.indexOf(skill) === -1) {

            this.setState(prevState => ({
                selectedSkills: [...prevState.selectedSkills, skill]
            }));
        } else this.removeSelectedSkill(skill);
    }

    onSkillChange(e) {
        let {
            target: {
                value: selectedSkills = []
            }
        } = e;


        if (typeof selectedSkills !== "string" && selectedSkills !== undefined) this.setState({selectedSkills: selectedSkills.filter(value => value !== undefined)});
    }

    updateSkills() {
        fetch("/data/skills/all.json")
            .then(data => data.json())
            .then(
                ({response, data: skills}) => {
                    if (response.code === 200) {
                        this.setState({skills});
                    }
                }
            ).catch(e => console.log(`Unhandled fetch error`));
    }

    updateCurrencies() {
        fetch("/data/currencies/all.json")
            .then(data => data.json())
            .then(
                ({response, data: currencies}) => {
                    if (response.code === 200) this.setState({currencies});
                }
            ).catch(e => console.log(`Unhandled fetch error`));
    }

    componentDidMount() {
        this.updateSkills();
        this.updateCurrencies();
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

    getSkill(i) {
        return this.state.skills[i];
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
                        validate
                        type={"email"}
                        label={"email"}
                        placeholder={"sample@me.com"}
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
                    <MaterialPhoneTextField
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneInTalkIcon/>
                                </InputAdornment>
                            )
                        }}
                    />
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

    removeFromSkills(i) {
        this.setState(prevState => ({
            selectedSkills: prevState.selectedSkills.filter(
                (v, index) => index !== i
            )
        }));
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
                style={{maxHeight: 80, overflowX: "auto"}}
                maxRows={2}
                selectionItems={this.state.skills.map(({name}, i) => ({
                    key: i,
                    value: name
                }))}
                selectionHeader={
                    <MaterialRow justify={Flex.START} paddingLR={4}>
                        <InputBase
                            style={{width: "80%"}}
                            placeholder={"Search skills"}
                            onClick={e => e.stopPropagation()}
                        />
                        <MaterialIconButton
                            icon={"Search"}
                        />
                    </MaterialRow>
                }
                selectionFooter={"100 skills available"}
                value={this.state.selectedSkills}
                onChange={this.onSkillChange}
                input={<Input id="skills-select-input"/>}
                renderValue={(selected) => {
                    return (
                        <div className={classes.chips}>
                            {selected.map(id => (
                                <Chip
                                    size={"small"}
                                    color="primary"
                                    key={id}
                                    label={this.getSkill(id).name}
                                    className={classes.chip}
                                    onDelete={
                                        e => {
                                            e.stopPropagation();
                                            this.removeFromSkills(id);
                                        }
                                    }
                                />
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

    static TAB_CARD = 1;
    static TAB_PAY_PAL = 2;
    static TAB_PAYMENT_HELP = 3;

    changeAccountCardDetail(detail, value) {

        this.setState(state => {
            state.userDetails.card[detail] = value;
            return state;
        });
    }

    get tabCardPayment() {

        return (
            <MaterialRow>
                <GridItem xs={12}>
                    <MaterialRow justify={Flex.CENTER}>
                        <MaterialRow justify={Flex.CENTER} alignItems={Flex.CENTER}>
                            <MaterialImage
                                src={"/assets/icons/png/ic_visa.png"}
                                size={42}
                            />
                            <MaterialImage
                                src={"/assets/icons/png/ic_master_card.png"}
                                size={42}
                            />
                        </MaterialRow>
                        <GridItem xs={12} sm={6}>
                            <MaterialTextField
                                value={this.state.userDetails.card.cardNumber}
                                label={"Card Number"}
                                placeholder={"4**444***4*6"}
                                onChange={
                                    (e, newValue) => {
                                        this.changeAccountCardDetail("cardNumber", newValue);
                                    }
                                }
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <MaterialDivider spacing={2} color={Colors.transparent}/>
                            <MaterialCsvTextField
                                label={"CSV"}
                                onChange={
                                    (newValue, e) => {
                                        this.changeAccountCardDetail("cardCSV", newValue);
                                    }
                                }
                                InputLabelProps={{
                                    shrink: true
                                }}
                                helperText={"3 digit back of your card i.e (111)"}
                            />
                            <MaterialDivider spacing={2} color={Colors.transparent}/>
                            <CardExpiryField
                                helperText={"your cards expiry year/month (20/13)"}
                                label={"EXPIRY"}
                                onChange={
                                    (e, newValue) => {
                                        this.changeAccountCardDetail("cardExpiry", newValue);
                                    }
                                }
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        </GridItem>
                    </MaterialRow>
                </GridItem>
            </MaterialRow>
        );
    }

    get tabPayPalPayment() {


        let {
            white,
            blue_darken_3
        } = Colors;

        return (
            <MaterialRow>
                <GridItem xs={12}>
                    <MaterialRow justify={Flex.CENTER}>
                        <MaterialImage src={"/assets/icons/png/ic_paypal_txt.png"}/>
                        <MaterialTextView>
                            Allow Libetal retrieve payment details from your PayPal account.
                            <ol>
                                <li><em>email. </em>Accounts payment email</li>
                                <li><em>access token </em>Authentication key maintains connection to your
                                    PayPal account, for ease of use.
                                </li>
                            </ol>
                        </MaterialTextView>
                        <MaterialBtn
                            startIcon={<MaterialImage size={24} src={"/assets/icons/png/ic_paypal.png"}/>}
                            content={"Connect With PayPal"}
                            color={blue_darken_3}
                            textTransform={"none"}
                            textColor={white}
                        />
                    </MaterialRow>
                </GridItem>
            </MaterialRow>
        );
    }

    collapseListener = e => console.log(`Unhandled collapse end`);

    get tabPaymentHelp() {

        return (
            <MaterialRow>
                <GridItem xs={12}>
                    <List>
                        <ListItemDiv disableGutters>
                            <ListItemText
                                primary={"General"}
                            />
                        </ListItemDiv>
                        <Collapse
                            in={this.state.showPaymentTabGeneral}
                            addEndListener={this.collapseListener}
                        >
                            <List>
                                <ListItemDiv>
                                    <MaterialTextView>
                                        Any detail collected in regards to credit or payment.
                                        Will be used in relation to project donation or receiving returns,
                                        or any gains from projects subscribed to.
                                    </MaterialTextView>
                                </ListItemDiv>
                            </List>
                        </Collapse>
                    </List>
                </GridItem>
            </MaterialRow>
        );
    }

    get currentPaymentView() {
        let {
            state: {
                currentPaymentTab
            }
        } = this;


        let view;
        switch (currentPaymentTab) {
            case Register.TAB_CARD:
                view = this.tabCardPayment;
                break;
            case Register.TAB_PAY_PAL:
                view = this.tabPayPalPayment;
                break;
            case Register.TAB_PAYMENT_HELP:
                view = this.tabPaymentHelp;
                break;
            default:
                view = this.tabCardPayment;
        }


        return view;
    }

    get accountsValid() {
        // TODO validate other input sections
        return this.state.accountsTermsConditions;
    }

    get paymentsForm() {

        let {
            green,
            white,
            grey,
            grey_darken_1
        } = Colors;

        let {
            state: {
                currentPaymentTab
            },
            accountsValid
        } = this;

        return (
            <GridItem xs={8} sm={8} lg={4} minHeight={400}>
                <Paper style={{paddingLeft: 6, paddingRight: 6, paddingTop: 6, paddingBottom: 12}}>
                    <MaterialTextView
                        text={"Payment Plans"}
                    />
                    <Toolbar>
                        <TabsLayout
                            tabs={[
                                {
                                    key: Register.TAB_CARD,
                                    label: "Credit Card"
                                },
                                {
                                    key: Register.TAB_PAY_PAL,
                                    label: "PayPal"
                                }
                            ]}
                            onChange={
                                (e, newTab) => {
                                    this.setState({currentPaymentTab: newTab === 0 ? Register.TAB_CARD : Register.TAB_PAY_PAL});
                                }
                            }
                        />
                        <Separator/>
                        <MaterialIconButton
                            onClick={
                                e => {
                                    this.setState({currentPaymentTab: Register.TAB_PAYMENT_HELP});
                                }
                            }
                            icon={"Help"}
                        />
                    </Toolbar>
                    {this.currentPaymentView}
                    <MaterialRow justify={Flex.SPACE_EVENLY} alignItems={Flex.CENTER} marginTB={6}>
                        <GridItem xs={12} sm={7}>
                            <MaterialRow alignItems={Flex.CENTER}>
                                <Checkbox
                                    value={this.state.accountsTermsConditions}
                                    onChange={
                                        (e, newValue) => {
                                            e.stopPropagation();
                                            this.setState({accountsTermsConditions: newValue});
                                        }
                                    }
                                />
                                <Link href={""}>
                                    <MaterialTextView
                                        fontSize={11}
                                        textColor={Colors.orange}
                                        text={"Accept Accounts Terms @ Conditions"}
                                    />
                                </Link>
                            </MaterialRow>
                        </GridItem>
                        <GridItem xs={12} sm={5}>
                            <MaterialRow justify={Flex.END}>
                                <MaterialBtn
                                    disabled={!accountsValid}
                                    color={accountsValid ? green : grey}
                                    content={"Done"}
                                    textColor={accountsValid ? white : grey_darken_1}
                                />
                            </MaterialRow>
                        </GridItem>
                    </MaterialRow>
                </Paper>
            </GridItem>
        );
    }

    get qualificationsFormAndPayments() {

        return (
            <MaterialRow minHeight={400} justify={Flex.SPACE_EVENLY} alignContent={Flex.CENTER}>
                {this.qualificationsForm}
                {this.paymentsForm}
            </MaterialRow>
        );
    }

    get qualificationsForm() {

        return (
            <GridItem xs={8} sm={8} lg={5} marginBottom={8}>
                <Paper style={{padding: 8}}>
                    <Typography>Qualifications</Typography>
                    <MaterialRow justify={Flex.SPACE_BETWEEN}>
                        <MaterialCol xs={12} sm={5}>
                            <MaterialTextView
                                text={"Hourly Rates"}
                                variant={"caption"}
                            />
                            <MaterialRow alignItems={Flex.END}>
                                <GridItem xs={3}>
                                    <MaterialSelect
                                        fullWidth
                                        value={this.state.selectedCurrencyIndex}
                                        selectionItems={
                                            this.state.currencies.map(
                                                ({name, sign}, i) => ({
                                                    key: i,
                                                    value: <MaterialRow minWidth={140} alignItems={Flex.END}>
                                                        <GridItem xs={4}>{sign}</GridItem>
                                                        <GridItem xs={7}>
                                                            <MaterialTextView
                                                                text={name}
                                                                fontSize={12}/>
                                                        </GridItem>
                                                    </MaterialRow>
                                                })
                                            )
                                        }
                                        renderValue={
                                            selected => {
                                                if (selected !== undefined) {
                                                    return this.state.currencies[selected].sign;
                                                }
                                            }
                                        }
                                        onChange={
                                            e => {
                                                this.setState({selectedCurrencyIndex: e.target.value});
                                            }
                                        }

                                    />
                                </GridItem>
                                <GridItem xs={9}>
                                    <CashInput
                                        fullWidth
                                        currency={this.state.currencies[this.state.selectedCurrencyIndex]}
                                        value={this.state.userDetails.hourlyRates}
                                        onChange={
                                            e => {
                                                this.setState(
                                                    state => {
                                                        state.userDetails.hourlyRates = e.target.value;
                                                        return state;
                                                    }
                                                );
                                            }
                                        }/>
                                </GridItem>
                            </MaterialRow>
                        </MaterialCol>
                        <GridItem xs={12} sm={5}>
                            {this.skillsInput}
                        </GridItem>
                    </MaterialRow>
                    <GridItem>
                        {this.aboutUserInput}
                    </GridItem>
                    <GridItem marginTB={4}>
                        <MaterialFileInputBase
                            rowJustify={Flex.START}
                            actionRowFlexJustify={Flex.START}
                            actionSize={4}
                            inputSize={7}
                            clearSize={1}
                            ActionButton={MaterialBtn}
                            ActionButtonButtonProps={{
                                content: "CV / Portfolio"
                            }}
                            accept={["docx", "pdf", "img", "png"]}
                        />
                    </GridItem>
                    <GridItem marginTB={4}>
                    </GridItem>
                    <MaterialFileInputBase
                        actionSize={3}
                        inputSize={7}
                        clearSize={2}
                        actionRowFlexJustify={Flex.START}
                        ActionButton={MaterialBtn}
                        ActionButtonButtonProps={{
                            content: "Certification"
                        }}
                        accept={["docx", "pdf", "img", "png"]}
                    />

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
