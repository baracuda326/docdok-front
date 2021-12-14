import React from "react";
import {formValueSelector, FormErrors, InjectedFormProps} from 'redux-form';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import {PasswordInput} from "./PasswordInput";
import {validate} from "./validate";

type FormErrorsT = {
    [key: string]: string
}

export type Props = {
    onSubmit?: () => void,
    password?: string,
    repeatPassword?: string
};

const errorsArr = [
    'Regular Letter', 'Capital Letter', 'Number', 'At least 6'
]

let ContactForm: React.FC<Props & InjectedFormProps<{}, Props>> = ({handleSubmit, valid, password, repeatPassword}) => {
    //@ts-ignore
    const errors = validate({password, repeatPassword});

    const checkErrors = (error:FormErrors<FormErrorsT>) => {
        if(!error) {
            return (
                <ul>
                    <li style={{color: 'green'}}><span>{'V'}</span>Regular Letter</li>
                    <li style={{color: 'green'}}><span>{'V'}</span>Capital Letter</li>
                    <li style={{color: 'green'}}><span>{'V'}</span>Number</li>
                    <li style={{color: 'green'}}><span>{'V'}</span>At least 6</li>
                </ul>
            )
        }

        return(
            <ul>
                {errorsArr.map((item, index) => Object.values(error).includes(item) && item !== 'PasswordsRequired' ?
                    <li key={index} style={{color: 'red'}}><span>{'X'}</span>{item}</li>
                    :
                    <li key={index} style={{color: 'green'}}><span>{'V'}</span>{item}</li>
                )}
            </ul>
        )

    }
    const isValid = valid && !Object.entries(errors).length && repeatPassword === password;
    return(
        <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="password">Enter Password:</label>
                    <Field
                        name="password"
                        type="password"
                        component={PasswordInput}
                    />
                </div>
                <div>
                    <label htmlFor="repeatPassword">Re-Enter Password:</label>
                    <Field
                        name="repeatPassword"
                        type="password"
                        component={PasswordInput}
                    />

                </div>
                <div className="indicators">
                    {errors && checkErrors(errors)}
                </div>
                <div className="button">
                    <button type="submit" disabled={!isValid} style={{background: !isValid ? 'lightgrey' : 'lightgreen'}}>Submit</button>
                </div>
            </form>
        </div>
    )
};

//@ts-ignore
ContactForm = reduxForm<{}, {}>({
    form: 'password-form',
    validate
})(ContactForm);

// Decorate with connect to read form values
const selector = formValueSelector('password-form') // <-- same as form name
ContactForm = connect(
    state => {
        // can select values individually
        const password = selector(state, 'password')
        const repeatPassword = selector(state, 'repeatPassword')

        return {
            password,
            repeatPassword,
        }
    }
)(ContactForm)

export default ContactForm;
