import React, {Component} from "react";
import PropTypes from "prop-types";
import MaterialRow from "../../grid/MaterialRow";
import Flex from "../../Flex";
import Colors from "../../../Colors";
import MaterialIconButton from "../../button/MaterialIconButton";
import MaterialTextField from "../../MaterialTextField";
import MaterialCol from "../../grid/MaterialCol";
import {Grid} from "@material-ui/core";

export default class MaterialFileInputBase extends Component {


    state = {
        files: []
    };

    static propTypes = {
        onChange: PropTypes.func,
        multiple: PropTypes.bool,
        placeholder: PropTypes.string,
        ActionButton: PropTypes.any,
        ClearButton: PropTypes.any,
        ActionButtonButtonProps: PropTypes.object,
        ClearButtonProps: PropTypes.object,
        accept: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.string),
            PropTypes.string
        ]),
        helperText:PropTypes.string,
        onMount: PropTypes.func,
        onClick: PropTypes.func,
        flexGrow: PropTypes.number,
        actionSize: PropTypes.number,
        inputSize: PropTypes.number,
        clearSize: PropTypes.number,
        inputStyle: PropTypes.object,
        disabled:PropTypes.bool

    };

    static defaultProps = {
        actionSize:1,
        inputSize:9,
        clearSize:1,
        style: {},
        inputStyle:{},
        multiple: false,
        disabled:false,
        onClick() {
            return true;
        },
        onChange() {
            console.log(`Unhandled file input`);
        },
        onMount() {

        }
    };

    constructor(prop) {
        super(prop);
        this.ref = React.createRef();
    }

    componentDidMount() {
        this.props.onMount(this);

        let {
            accept
        } = this.props;

        if (Array.isArray(accept)) {
            accept = accept.map(type => `.${type}`).join(",");
        }

        // Input base does not accept accept attribute type
        this.ref.current.setAttribute("accept", accept);
    }


    reset() {
        this.ref.current.value = "";
    }

    render() {
        let {
            onChange,
            multiple,
            accept,
            actionSize,
            inputSize,
            clearSize,
            inputStyle :{...inputStyle},
            style: {...style},
            onClick,
            ClearButton,
            ClearButtonProps = {},
            ActionButton,
            disabled,
            helperText,
            ActionButtonButtonProps = {},
            buttonStyle,
            fullWidth,
            ...props
        } = this.props;


        let defaultOnClick =
            e => {
                this.reset();
                this.props.onChange();
            };


        ClearButton = ClearButton !== undefined ?
            (
                <ClearButton {...ClearButtonProps} onClick={defaultOnClick}/>
            ) :
            (
                <MaterialIconButton
                    icon={"Close"}
                    buttonColor={Colors.orange}
                    iconColor={Colors.white}
                    onClick={defaultOnClick}
                    disabled={disabled}
                />
            );

        ClearButton = (
             <Grid container xs={clearSize} direction={"row"} justify={Flex.CENTER} alignItems={Flex.CENTER} style={{overflow:"hidden"}}>
                 {ClearButton}
             </Grid>
        );

        ActionButton = ActionButton !== undefined ? (
            <Grid container xs={actionSize} direction={"row"} justify={Flex.CENTER} alignItems={Flex.CENTER} style={{overflow:"hidden"}}>
                <ActionButton
                    onClick={
                        e => {
                            e.stopPropagation();
                            this.ref.current.click();
                        }
                    }
                    {...ActionButtonButtonProps}
                    disabled={disabled}
                />
            </Grid>
        ) : undefined;


        inputStyle.overflow="hidden"

        return (
            <MaterialCol>
                <MaterialRow justify={Flex.SPACE_EVENLY} alignItems={Flex.END}>
                    {ActionButton}
                    <Grid xs={inputSize} style={inputStyle}>
                        <MaterialTextField
                            inputRef={this.ref}
                            type={"file"}
                            fullWidth
                            onChange={
                                e => {
                                    let files = e.currentTarget.files;
                                    this.setState({files: files}, () => {
                                        onChange(files, this);
                                    });
                                }
                            }
                            onClick={
                                e => {
                                    let propagate = onClick(e);

                                    if (propagate === true || propagate === undefined) {
                                        e.stopPropagation();
                                    }
                                }
                            }
                            multiple={multiple}
                            style={style}
                            disabled={disabled}
                            {...props}
                        />
                    </Grid>
                    {ClearButton}
                </MaterialRow>
                <MaterialRow>{helperText}</MaterialRow>
            </MaterialCol>
        );
    }
}