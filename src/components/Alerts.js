import React from 'react'
import { Alert, Collapse } from '@mui/material';

export default function Alerts(props) {


    return (

        <div>
            {props.alert &&
                <Collapse in={true}>
                    <Alert severity={props.alert.type}>
                        {props.alert.message}
                    </Alert>
                </Collapse>
            }
        </div>
    )
}