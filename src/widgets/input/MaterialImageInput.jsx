import React, {Component} from "react";
import PropTypes from "prop-types";
import MaterialFileInputBase from "./file/MaterialFileInputBase";
import MaterialCol from "../grid/MaterialCol";
import Flex from "../Flex";
import Paper from "@material-ui/core/Paper";
import MaterialRow from "../grid/MaterialRow";
import MaterialIconButton from "../button/MaterialIconButton";
import Colors from "../../Colors";
import GridItem from "../grid/GridItem";

export default class MaterialImageInput extends Component {

    static propTypes = {
        alt: PropTypes.string,
        src: PropTypes.string,
        defaultSrc: PropTypes.string,
        height: PropTypes.number,
        width: PropTypes.number,
        onChange: PropTypes.func,
        flexGrow: PropTypes.number,
        placeholder: PropTypes.string,
        previewHeight: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        previewWidth: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])
    };

    static defaultProps = {
        alt: "Material Image Input",
        defaultSrc: "/images/logo.png",
        previewWidth: "100%",
        onChange() {
            console.log(`unhandled image input change`);
        }
    };

    constructor(props) {
        super(props);
        this.img = React.createRef();

        this.onChange = this.onChange.bind(this);
    }

    onChange(files = [], input) {

        this.preview(files[files.length - 1]);

        let {
            onChange
        } = this.props;

        onChange(files);

    }

    preview(img) {
        if (img !== undefined) {
            let reader = new FileReader();
            reader.onload = e => {

                this.img.current.src = e.target.result;
                console.log();
                // this.img.current.attr("src", e.target.result);
            };

            reader.readAsDataURL(img);
        } else this.img.current.src = this.props.defaultSrc;
    }

    render() {
        let {
            src,
            defaultSrc,
            alt,
            height,
            width,
            flexGrow,
            placeholder,
            multiple,
            previewHeight,
            previewWidth,
            style = {}
        } = this.props;

        style.height = height || style.height;
        style.width = width || style.width;
        style.flexGrow = flexGrow || style.flexGrow;

        return (

            <Paper style={style}>
                <MaterialCol
                    alignItems={Flex.STRETCH}
                    paddingTop={4}
                    paddingRight={4}
                    paddingBottom={4}
                    paddingLeft={4}
                >

                   <GridItem xs={12}>
                       <MaterialCol justify={Flex.CENTER} alignItems={Flex.CENTER}>
                           <GridItem>
                               <img ref={this.img} src={src || defaultSrc} alt={alt}
                                    width={previewWidth}
                                    style={{
                                        maxHeight:previewHeight
                                    }}
                               />
                           </GridItem>
                       </MaterialCol>
                   </GridItem>
                    <MaterialRow alignItems={Flex.CENTER} justify={Flex.SPACE_EVENLY} paddingLeft={4} paddingRight={4}>
                        <MaterialIconButton
                            icon={"Close"}
                            buttonColor={Colors.orange}
                            iconColor={Colors.white}
                            onClick={
                                e => {
                                    this.input.reset();
                                    this.onChange();
                                }
                            }
                        />
                        <MaterialFileInputBase
                            onMount={
                                input => {
                                    this.input = input;
                                }
                            }
                            style={{width: "80%"}}
                            onChange={this.onChange}
                            placeholder={placeholder} multiple={multiple}
                            accept={["png", "jpg"]}
                        />
                    </MaterialRow>
                </MaterialCol>
            </Paper>

        );
    }
}