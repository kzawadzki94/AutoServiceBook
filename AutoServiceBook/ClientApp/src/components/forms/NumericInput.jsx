import { TextInput } from './TextInput';

export class NumericInput extends TextInput {

    constructor(props) {
        super(props);

        this.state = {
            type: "number"
        }
    }
}