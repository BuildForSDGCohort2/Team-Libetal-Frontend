import React, {Component} from "react";
import FormControl from "@material-ui/core/FormControl";
import MaterialInputLayout from "./MaterialInputLayout";
import Button from "@material-ui/core/Button";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MaterialTextField from "./MaterialTextField";
import PropTypes from "prop-types";

export default class MaterialFileInput extends Component {

    state = {
        valueText: "Chose File",
        color: "secondary"
    };

    static propTypes = {
        accept: PropTypes.arrayOf(PropTypes.string)
    };

    constructor(props) {
        super(props);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.ref = React.createRef();
    }


    handleBtnClick(e) {

        console.log(e.target);
    }

    componentDidMount() {
       //  this.props.onMount(this);

        let {
            accept
        } = this.props;

        if (Array.isArray(accept)) {
            accept = accept.map(type => `.${type}`).join(",");
        }

        // Input base does not accept accept attribute type
        this.ref.current.setAttribute("accept", accept);
    }


    render() {

        let {
            disabled = false,
            color = "secondary",
            labelText = "Cv/Portfolio",
            fullWidth = false,
            style = {},
            type,
            ...props
        } = this.props;

        style = {
            ...style,
            cursor: "pointer"
        };

        type = "file";

        return (
            <MaterialInputLayout>
                <FormControl {...props} >
                    <MaterialTextField
                        inputRef={this.ref}
                        color={"secondary"}
                        style={style}
                        {...props}
                        type={type}
                        disabled={disabled}
                        fullWidth={fullWidth}
                        startIcon={<Button
                            startIcon={<AttachFileIcon/>}
                            disabled={disabled}
                            onClick={this.handleBtnClick}
                            ref={input => this.input = input}
                            variant={"contained"} color={color}>
                            {labelText}
                        </Button>}
                    />
                </FormControl>
            </MaterialInputLayout>
        );
    }
}