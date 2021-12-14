import React from 'react';
import './App.css';
import {Base64} from 'js-base64';
import ContactForm, {Props} from "./components/ContactForm";

function App() {
    const onSubmitForm = (values: Props) => {
        const {password} = values;
        let base64 = Base64.btoa('test@gmail.com' + ":" + password);
        const result = fetch('http://localhost:8081/api/user/create/password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': "Basic " + base64
            }
        });
        result.then(response => console.log("My response", response.json()))
            .catch(error => {
                console.log(error)
            });
    };
    return (
        <div className="App">
            {/*//@ts-ignore*/}
            <ContactForm onSubmit={onSubmitForm}/>
        </div>
    );
}

export default App;
