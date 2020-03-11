import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import { Box, InputLabel, MenuItem, FormControl, makeStyles, Select, Typography } from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';

const useStyles = makeStyles(theme => ({
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
}));

const ChooseCountry = (props) => {
    const classes = useStyles()
    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);

    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    return (
        <>
            <Box className={classes.box} >
                <Typography style={{ color: "#755200", marginLeft: 'auto', marginTop: 'auto', marginBottom: "auto" }} variant="h6" gutterBottom>
                    Choose your country:
                </Typography>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                        Country
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={props.selectedCountry !== -1 ? props.selectedCountry : ''}
                        onChange={(event) => props.onSelectCountry(event.target.value)}
                        labelWidth={labelWidth}
                    >
                        {props.countryListAllIsoData.map((country, index) => (
                            <MenuItem key={index} value={index}>{country.name}</MenuItem>
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
        selectedCountry: state.country.countrySelected,
        countryListAllIsoData: state.country.countryListAllIsoData
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCountry);