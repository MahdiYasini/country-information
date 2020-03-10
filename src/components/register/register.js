import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Green from '@material-ui/core/colors/green';
import { connect } from 'react-redux';
import { InputLabel, FormHelperText, Input, FormControl, TextField, Paper, Box } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import axios from '../../axios';
import LoaderIcon from '../../UI/loader';
import * as actionTypes from '../../store/actions'
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    padding: theme.spacing(2, 4, 3),
  },
  input: {
    width: "100%"
  }

}));

const Register = (props) => {
  const [name, setName] = useState('');
  const [correctInput, setCorrectInput] = useState(true);

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const HandleRegister = () => {

    (name.length === 0) ?  setCorrectInput(false) : props.onSetAuthentication(name);

  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen} style={{ color: Green[300] }}>SignUp</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <FormControl className={classes.input}>
              <TextField onChange={(event) => setName(event.target.value)} id="outlined-basic" label="Name" variant="outlined" />
              <FormHelperText id="my-helper-text">We'll never share your name.</FormHelperText>
              <Button variant="contained" color="primary" onClick={HandleRegister} >
                Join Us
                </Button>
              {!correctInput ? <Alert m={1} severity="error">Please enter your name</Alert> : ''}
            </FormControl>
          </div>
        </Fade>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);