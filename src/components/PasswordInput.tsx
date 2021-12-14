import React from "react";

export const PasswordInput = ({input, type, meta: { touched, error, warning }}: any) => {
    return(
        <>
            <input {...input} type={type} />
            <div className="indicators">
                {(error && <span>{error}</span>) || (warning && <span>{warning}</span>)}
            </div>
        </>
    )
}