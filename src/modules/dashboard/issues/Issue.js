import Colors from "../../../Colors";

export default class Issue {

    static parseProps(name = "") {
        let t = (name[0] || "").toUpperCase();
        let {
            red,
            blue,
            indigo,
            purple,
            green_darken_2
        } = Colors;

        let color;

        switch (t) {
            case "D":
                color = blue;
                break;
            case "F":
                color = green_darken_2;
                break;
            case "B":
                color = red;
                break;
            default:
                t = "U";
                color = indigo;
                break;
        }

        return [t, color];
    }
}

