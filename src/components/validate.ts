import { FormErrors } from 'redux-form';

type FormErrorsT = {
   [key: string]: string
}

export const validate = (values: { [key: string]: string}) => {
    const errors: FormErrors<FormErrorsT> = {}

    if (values?.repeatPassword && values?.password !== values?.repeatPassword) {
        errors.password = 'Passwords Not Equals'
    }

    if(!values?.password?.match(/[a-z]/)){
        errors.regularLetter = 'Regular Letter'
    }

    if(!values?.password?.match(/[A-Z]/)){
        errors.capitalLetter = 'Capital Letter'
    }

    if(!values?.password?.match(/[0-9]/)){
        errors.number = 'Number'
    }

    if(values?.password?.length <= 6 || !values?.password){
        errors.length = 'At least 6'
    }

    return errors;
}
