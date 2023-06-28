import React from 'react'

export default function Alert(props) {

    return (

        <div>
            <div className={`alert alert-primary alert-dismissible fade show`} role="alert">
                {props.message}
            </div>
        </div>
    )
}