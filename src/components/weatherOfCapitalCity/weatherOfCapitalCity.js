import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Avatar, Paper, Box, makeStyles } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import axios from 'axios';
import LoaderIcon from '../../UI/loader';
import ErrorPage from '../../UI/404Page/404Page';
import * as actionTypes from '../../store/actions'

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
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

const ChooseCountry = (props) => {
    const [capital, setNewCapital] = useState('')
    const [loader, setLoader] = useState(false);
    const [weatherData, setData] = useState({});
    const [icon, setIcon] = useState('')
    const [error, setError] = useState(false);
    const classes = useStyles()

    const [tst, setTst] = useState({});


    useEffect(() => {
        if (props.countrySelectedInformation && capital !== props.countrySelectedInformation.capital) {
            setNewCapital(props.countrySelectedInformation.capital)
            setLoader(true);
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${props.countrySelectedInformation.capital}&appid=ca0ec975436df06b64b836e9a6637e9a`)
                .then(response => {
                    setError(false);
                    setIcon(response.data.weather[0].icon);
                    setData({ main: response.data.weather[0].main, description: response.data.weather[0].description })
                    setLoader(false);
                    setTst({ main: response.data.weather[0].main, description: response.data.weather[0].description })
                })
                .catch(() => {
                    setError(true);
                    setLoader(false);
                })
        }

    });


    const weatherInformation = (
        <>
        <Box style={{ fontSize: "18px", color: "#263238", width: "100%" }} p={1} m={1} component={Paper} bgcolor={"#c4cad4"} align="center">
          <Avatar alt="Remy Sharp" src= {`https://openweathermap.org/img/wn/${icon}@2x.png`} className={classes.large} />
        </Box>
        { Object.keys(weatherData).map(information => <Box key={information} style={{ fontSize: "18px", color: "#263238", width: "100%" }} p={1} m={1} component={Paper} bgcolor={"#b1d6ed"} align="center">{information.toUpperCase()}: {weatherData[information]}</Box>)}
        </>
    )

    const weatherMainData = (
        <>
            <div style={{ width: '100%', padding: "2%" }}>
                <Box
                    display="flex"
                    flexWrap="wrap"
                    p={1}
                    m={1}
                    bgcolor= {"#416d8f"}
                    borderRadius={5}
                    style={{ maxWidth: 600, margin: "0 auto" }}
                >
                    {error ? <Box flexGrow={1} m={1} component={Paper} bgcolor={"#0C0E10"} align="center"> <ErrorPage /> </Box> : weatherInformation
                    }
                </Box>
            </div>
        </>
    );



    return (
        <div className={classes.box} >
            {(loader === true) ? <LoaderIcon /> : weatherMainData}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        countrySelectedInformation: state.country.countrySelectedInformation
    }
}

export default connect(mapStateToProps)(ChooseCountry);