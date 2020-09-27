import React, {Component} from "react";
import PropTypes from "prop-types";
import MaterialRow from "../../grid/MaterialRow";
import Flex from "../../Flex";
import GridItem from "../../grid/GridItem";
import Colors from "../../../Colors";
import MaterialIconButton from "../../button/MaterialIconButton";
import MaterialTextField from "../../MaterialTextField";

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
        onMount: PropTypes.func,
        onClick: PropTypes.func,
        flexGrow: PropTypes.number

    };

    static defaultProps = {
        style: {},
        multiple: false,
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
            style: {...style},
            onClick,
            ClearButton,
            ClearButtonProps = {},
            ActionButton,
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


        ClearButton = ClearButton !== undefined ? <ClearButton {...ClearButtonProps} onClick={defaultOnClick}/> :
            <MaterialIconButton
                icon={"Close"}
                buttonColor={Colors.orange}
                iconColor={Colors.white}
                onClick={defaultOnClick}
            />;

        ActionButton = ActionButton !== undefined ? <ActionButton
            onClick={
                e => {
                    e.stopPropagation();
                    this.ref.current.click();
                }
            }
            {...ActionButtonButtonProps}  /> : undefined;

        return (
            <MaterialRow justify={Flex.START} alignItems={Flex.CENTER}>
                <GridItem flexGrow={1}>
                    {ActionButton}
                </GridItem>
                <GridItem xs={8}>
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
                        {...props}
                    />
                </GridItem>
                <GridItem flexGrow={1}>
                    {ClearButton}
                </GridItem>
            </MaterialRow>
        );
    }
}