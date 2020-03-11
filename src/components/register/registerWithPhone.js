import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, FormHelperText, FormControl, TextField, makeStyles } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import * as actionTypes from '../../store/actions'
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
    box: {
        fontFamily: 'Inder',
        display: "flex",
        width: "100%",
        backgroundColor: grey[300],
        padding: "1%",
        [theme.breakpoints.up('sm')]: {
            width: "50%",
        },
    },
    input: {
        width: "100%"
    }
}));

const RegisterWithPhone = (props) => {
    const [name, setName] = useState('');
    const [correctInput, setCorrectInput] = useState(true);

    const classes = useStyles()

    const HandleRegister = () => {
        if (name.length === 0) {
            setCorrectInput(false)
        }
        else {
            props.onSetAuthentication(name)
            props.history.push('/')
        }
    }

    return (
        <div className={classes.box} >
            <FormControl className={classes.input}>
                <TextField onChange={(event) => setName(event.target.value)} id="outlined-basic" label="Name" variant="outlined" />
                <FormHelperText id="my-helper-text">We'll never share your name.</FormHelperText>
                <Button variant="contained" color="primary" onClick={HandleRegister} >
                    Join Us
                </Button>
                {!correctInput ? <Alert m={1} severity="error">Please enter your name</Alert> : ''}
            </FormControl>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onSetAuthentication: (name) => dispatch({ type: actionTypes.AUTHENTICATION, username: name })
    }
}

const mapStateToProps = state => {
    return {
        authentication: state.auth,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterWithPhone);