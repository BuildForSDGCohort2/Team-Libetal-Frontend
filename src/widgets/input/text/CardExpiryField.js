import MaterialFormattedTextField from "./MaterialFormattedTextField";

export default class CardExpiryField extends MaterialFormattedTextField {


    get mask() {
        if (this.maskField === undefined) this.maskField = [/\d/, /\d/, "/", /[0-1]/, /\d/];

        return this.maskField;
    }
}