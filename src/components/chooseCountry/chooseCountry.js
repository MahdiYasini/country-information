import React, { useState } from 'react';
import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';
import { Box, makeStyles, Select, Typography } from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            left: 0,
            margin: theme.spacing(0),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
    box: {
        display: "flex",
        padding: "auto auto",
        width: "100%",
        height: "auto",
        background: amber[600]
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        marginRight: 'auto',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

  
const ChooseCountry = (props) => {
    const classes = useStyles()

    const  [countryNumber, setCountry] = useState('Country')

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const countrySelectHandle = (country) => country === props.selectedCountry;
    
    return (
        < >
            <Box className={classes.box} >
                <Typography style = {{color: "#755200", marginLeft: 'auto', marginTop: 'auto', marginBottom: "auto"}} variant="h6" gutterBottom>
                    Choose your country:
                </Typography>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                        Country
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value = {props.countryList.findIndex(countrySelectHandle) !== -1 ? props.countryList.findIndex(countrySelectHandle)  : ''}
                        onChange={(event) => props.onSelectCountry(event.target.value) }
                        labelWidth={labelWidth}
                    >
                        {props.countryList.map((country, index) => (
                            <MenuItem key = {index} value={index}>{country}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onSelectCountry: (countryNumber) => dispatch({ type: actionTypes.SELECT_COUNTRY, country: countryNumber })
    }
}

const mapStateToProps = state => {
    return {
        countryList: state.country.countryList,
        selectedCountry: state.country.countrySelected,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCountry);