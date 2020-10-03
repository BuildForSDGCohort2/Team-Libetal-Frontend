import Colors from "../../Colors";

const {
    orange_lighten_1,
    orange_darken_1,
    orange,
    white,
    black,
    grey,
    alpha
} = Colors;

function mkCssDimen(dimen) {
    if (typeof dimen === "number") {
        return `${dimen}px`;
    }
}

export default class MaterialTheme {


    // noinspection JSSuspiciousNameCombination
    static Style = {
        Cursor: {
            Pointer: "pointer"
        },
        Display: {
            // Displays an element as a block element (like <p>). It starts on a new line, and takes up the whole width
            Block: "block",
            // Displays an element as an inline element (like <span>). Any height and width properties will have no effect
            Inline: "inline",
            // The element is completely removed
            None: "None",
            // Displays an element as an inline-level block container. The element itself is formatted as an inline element, but you can apply height and width values
            InlineBlock: "inline-block",
            contents: "contents",
            Inherit: "inherit",
            // Displays an element as a block-level flex container
            Flex: "flex",
            // Displays an element as a block-level grid container
            Grid: "grid",
            // Displays an element as an inline-level flex container
            InlineFlex: "inline-flex",
            // : "	Displays an element as an inline-level grid container",
            InlineGrid: "inline-grid",
            // The element is displayed as an inline-level table"
            InlineTable: "inline-table",
            // Let the element behave like a <li> element
            ListItem: "list-item",
            // "Displays an element as either block or inline, depending on context"
            RunIn: "run-in",
            // "Let the element behave like a <table> element"
            Table: "table",
            // Let the element behave like a <caption> element
            TableCaption: "table-caption",
            // Let the element behave like a <colgroup> element
            TableColumnGroup: "table-column-group",
            // Let the element behave like a <thead> element
            TableHeaderGroup: "table-header-group",
            // Let the element behave like a <tfoot> element
            TableFooterGroup: "table-footer-group",
            // Let the element behave like a <tbody> element
            TableRowGroup: "table-row-group",
            // Let the element behave like a <td> element
            TableCell: "table-cell",
            // Let the element behave like a <col> element
            TableColumn: "table-column",
            // Let the element behave like a <tr> element
            TableRow: "table-row",
            // Sets this property to its default value. Read about initial
            Initial: "initial"

        },
        Text: {
            Align: {
                Center: "center"
            },
            Decoration: {
                None: "none"
            },
            Transform: {
                Uppercase: "uppercase"
            }
        },
        Box: {
            // box-shadow: none|h-offset v-offset blur spread color |inset|initial|inherit;
            shadow(xOffset = 1, yOffset = 1, blurRadius = 2, spread = 0, color = black, colorAlpha = .8, boxing) {

                color = Colors.helper(color, colorAlpha);
                // 10px 10px 8px #888888
                let shadow = `${mkCssDimen(xOffset)} ${mkCssDimen(yOffset)} ${mkCssDimen(blurRadius)} ${mkCssDimen(spread)} ${color}`;


                if (boxing !== undefined) shadow += ` ${boxing}`;

                return shadow;
            }
        },
        Transition: {
            ease(prop, duration, inOut) {
                return `${prop} ${duration}s ease-${inOut}`;
            },
            // "background-color .2s ease-out"
            easeOut(prop, duration = .3) {
                return this.ease(prop, duration, "out");
            }
        },
        PointerEvents: {
            None: "none"
        },
        Position: {
            Absolute: "absolute"
        },
        Padding(left = 4, top = left, right = left, bottom = top) {
            return {
                paddingTop: mkCssDimen(top),
                paddingBottom: mkCssDimen(bottom),
                paddingLeft: mkCssDimen(left),
                paddingRight: mkCssDimen(right)
            };
        },
        Border: {
            radius(topLeft = 4, topRight = topLeft, bottomRight = topRight, bottomLeft = topLeft) {
                return `${mkCssDimen(topLeft)} ${mkCssDimen(topRight)} ${mkCssDimen(bottomRight)} ${mkCssDimen(bottomLeft)}`;
            }
        }
    };

    static Palette = {
        Light: {
            backgroundColorPrimary: white,
            colorPrimary: orange,
            colorPrimaryDarker: white,
            textPrimary: white,
            textAccent: white
        },
        Dark: {
            backgroundColorPrimary: black,
            colorPrimaryDarker: black,
            colorPrimary: orange,
            // body text
            textPrimary: white,
            // button text
            textAccent: white
        }
    };

    static Input = {
        FullWidth: {
            flexGrow: 1
        }
    };

    static Body = {
        default: {
            paddingLeft: 8,
            paddingRight: 8
        }
    };

    static AppBar = {
        Search: {
            FullWidth: {
                height: 42,
                paddingLeft: 4,
                paddingRight: 4,
                marginLeft: 12,
                flexGrow: 1
            }
        }
    };
    static Card = {
        default: {
            display: MaterialTheme.Style.Display.InlineBlock,
            cursor: MaterialTheme.Style.Cursor.Pointer,
            boxShadow: MaterialTheme.Style.Box.shadow(1.5, 1.5, 1.5),
            ...MaterialTheme.Style.Padding(4),
            borderRadius: MaterialTheme.Style.Border.radius(4),
            minHeight: 40,
            minWidth: 40

        }
    };

    static Button = {

        default: {
            display: MaterialTheme.Style.Display.InlineBlock,
            textDecoration: MaterialTheme.Style.Text.Decoration.None,
            textAlign: MaterialTheme.Style.Text.Align.Center,
            letterSpacing: .5,
            cursor: MaterialTheme.Style.Cursor.Pointer,
            transition: MaterialTheme.Style.Transition.easeOut("box-shadow"),
            paddingTop: 4,
            paddingBottom: 4,
            paddingLeft: 8,
            paddingRight: 8,
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            borderRadius: "8%",
            textTransform: "uppercase"
        },
        flat: {},
        floating: {}
    };

    static Light = {
        Drawer: {
            Permanent: {}
        },
        IconButton: {
            default: {
                minWidth: 12,
                minHeight: 12,
                ...MaterialTheme.Style.Padding(0)
            }
        },
        AppBar: {
            default: {
                backgroundColor: MaterialTheme.Palette.Light.backgroundColorPrimary,
                color: MaterialTheme.Palette.Light.textAccent
            },
            Fixed: {
                zIndex: 1200
            },
            Search: {

                Layout: {
                    backgroundColor: MaterialTheme.Palette.Light.backgroundColorPrimary,
                    color: MaterialTheme.Palette.Light.textAccent,
                    height: 42,
                    paddingLeft: 4,
                    paddingRight: 4,
                    marginLeft: 12,
                    flexGrow: 1
                },
                Input: {
                    backgroundColor: MaterialTheme.Palette.Light.backgroundColorPrimary,
                    color: MaterialTheme.Palette.Light.textAccent,
                    fexGrow: 1
                },
                FullWidth: {
                    height: 42,
                    paddingLeft: 4,
                    paddingRight: 4,
                    marginLeft: 12,
                    flexGrow: 1
                }
            }
        },
        Body: {
            default: {
                ...MaterialTheme.Body.default,
                backgroundColor: MaterialTheme.Palette.Light.backgroundColorPrimary
            },
            AppBar: {
                Fixed: {}
            },
            Drawer: {
                Permanent: {
                    marginLeft: 280
                },
                AppBar: {
                    Fixed: {}
                }
            }
        },

        Button: {
            default: {
                ...MaterialTheme.Button.default,
                backgroundColor: MaterialTheme.Palette.Light.colorPrimary,
                color: MaterialTheme.Palette.Light.textPrimary,
                boxShadow: MaterialTheme.Style.Box.shadow()
            },

            hover: {
                ...MaterialTheme.Button.default,
                backgroundColor: MaterialTheme.Palette.Light.colorPrimary,
                color: MaterialTheme.Palette.Light.textPrimary,
                elevation: 2,
                boxShadow: MaterialTheme.Style.Box.shadow()
            }
        },

        Card: {
            default: {
                ...MaterialTheme.Card.default,
                backgroundColor: MaterialTheme.Palette.Light.backgroundColorPrimary,
                color: MaterialTheme.Palette.Light.textPrimary
            },
            active: {}
        },

        Wave: {
            position: MaterialTheme.Style.Position.Absolute,
            borderRadius: "50%",
            width: 20,
            height: 20,
            marginTop: -10,
            marginLeft: -10,
            opacity: 0,
            background: "rgba(0,0,0,0.2)",
            // "all 0.7s ease-out"
            transition: MaterialTheme.Style.Transition.easeOut("all", .7),
            transitionProperty: "transform, opacity",
            transform: "scale(0)",
            pointerEvents: MaterialTheme.Style.PointerEvents.None
        }
    };

    static Dark = {
        Drawer: {
            Permanent: {}
        },
        IconButton: {
            default: {
                minWidth: 12,
                minHeight: 12,
                ...MaterialTheme.Style.Padding(0)
            }
        },
        AppBar: {
            default: {
                backgroundColor: MaterialTheme.Palette.Dark.backgroundColorPrimary,
                color: MaterialTheme.Palette.Dark.textAccent
            },
            Fixed: {
                zIndex: 1200
            },
            Search: {
                Layout: {
                    backgroundColor: MaterialTheme.Palette.Dark.backgroundColorPrimary,
                    color: MaterialTheme.Palette.Dark.textAccent,
                    height: 42,
                    paddingLeft: 4,
                    paddingRight: 4,
                    marginLeft: 12,
                    flexGrow: 1
                },
                Input: {
                    backgroundColor: MaterialTheme.Palette.Dark.backgroundColorPrimary,
                    color: MaterialTheme.Palette.Dark.textAccent,
                    fexGrow: 1
                },
                FullWidth: {
                    backgroundColor: MaterialTheme.Palette.Dark.backgroundColorPrimary,
                    color: MaterialTheme.Palette.Dark.textAccent,
                    height: 42,
                    paddingLeft: 4,
                    paddingRight: 4,
                    marginLeft: 12,
                    flexGrow: 1
                }
            }
        },
        ToolBar: {
            default: {
                backgroundColor: MaterialTheme.Palette.Dark.backgroundColorPrimary,
                color: MaterialTheme.Palette.Dark.textPrimary
            }
        },
        Body: {
            default: {
                ...MaterialTheme.Body.default,
                backgroundColor: MaterialTheme.Palette.Dark.backgroundColorPrimary,
                color: MaterialTheme.Palette.Dark.textPrimary
            },
            AppBar: {
                Fixed: {}
            },
            Drawer: {
                Permanent: {
                    marginLeft: 280,
                    backgroundColor: MaterialTheme.Palette.Dark.backgroundColorPrimary,
                    color: MaterialTheme.Palette.Dark.textPrimary
                },
                AppBar: {
                    Fixed: {}
                }
            }
        },

        Button: {
            default: {
                ...MaterialTheme.Button.default,
                backgroundColor: MaterialTheme.Palette.Light.colorPrimary,
                color: MaterialTheme.Palette.Light.textPrimary,
                boxShadow: MaterialTheme.Style.Box.shadow()
            },

            hover: {
                ...MaterialTheme.Button.default,
                backgroundColor: MaterialTheme.Palette.Light.colorPrimary,
                color: MaterialTheme.Palette.Light.textPrimary,
                elevation: 2,
                boxShadow: MaterialTheme.Style.Box.shadow()
            }
        },

        Card: {
            default: {
                ...MaterialTheme.Card.default,
                backgroundColor: MaterialTheme.Palette.Light.backgroundColorPrimary,
                color: MaterialTheme.Palette.Light.textPrimary
            },
            active: {}
        },

        Wave: {
            position: MaterialTheme.Style.Position.Absolute,
            borderRadius: "50%",
            width: 20,
            height: 20,
            marginTop: -10,
            marginLeft: -10,
            opacity: 0,
            background: "rgba(0,0,0,0.2)",
            // "all 0.7s ease-out"
            transition: MaterialTheme.Style.Transition.easeOut("all", .7),
            transitionProperty: "transform, opacity",
            transform: "scale(0)",
            pointerEvents: MaterialTheme.Style.PointerEvents.None
        }
    };

}