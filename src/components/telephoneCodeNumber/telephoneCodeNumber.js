import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Paper, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    box: {
        fontFamily: 'Inder',
        display: "flex",
        width: "100%",
        backgroundColor: "#798230",
        padding: "1%",
        [theme.breakpoints.up('sm')]: {
            width: "33.33%",
        },
    },

}));

const ChooseCountry = (props) => {
    const [telCode, setCode] = useState('+0');
    const classes = useStyles()

    useEffect(() => {
        if (props.countrySelectedInformation) {
            setCode(`+${props.countrySelectedInformation.callingCodes}`);
        }
    }, [props.countrySelectedInformation]);

    return (
        <div className={classes.box} >
            <div style={{ width: '100%', padding: "2%" }}>
                <Box
                    display="flex"
                    flexWrap="wrap"
                    p={1}
                    m={1}
                    bgcolor={"#416d8f"}
                    borderRadius={5}
                    style={{ marginTop: "10%" }}
                >
                    <Box style={{ fontSize: "18px", color: "#263238", width: "100%" }} p={1} m={1} component={Paper} bgcolor={"#c4cad4"} align="center">
                        Country Code: {telCode}
                    </Box>
                </Box>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        countrySelectedInformation: state.country.countrySelectedInformation
    }
}

export default connect(mapStateToProps)(ChooseCountry);