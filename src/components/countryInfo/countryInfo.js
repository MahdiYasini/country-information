import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Paper, Box, makeStyles } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import axios from '../../axios';
import LoaderIcon from '../../UI/loader';
import * as actionTypes from '../../store/actions'

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
}));

const ChooseCountry = (props) => {
    const neededItemsForInformation = ['name', 'capital', 'region', 'population', 'languages', 'nativeName', 'currencies'];
    const [country, setCountry] = useState('');
    const [countryInfo, setCountryInfo] = useState({});
    const [loader, setLoader] = useState(false);

    const classes = useStyles()

    const HandleNumberWithCommas = (x) => {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }

    useEffect(() => {
        if (props.selectedCountry !== -1 && country !== props.countryListAllIsoData[props.selectedCountry].code3.toLowerCase()) {
            setLoader(true);
            setCountry(props.countryListAllIsoData[props.selectedCountry].code3.toLowerCase());
            axios.get('/' + props.countryListAllIsoData[props.selectedCountry].code3.toLowerCase())
                .then(response => {
                    setCountryInfo(Object.keys(response.data).filter(keys => neededItemsForInformation.includes(keys)).reduce((obj, key) => {
                        switch (key) {
                            case "currencies":
                                obj[key] = response.data[key][0].name
                                obj['cash_Code'] = response.data[key][0].code
                                obj['cash_Symbol'] = JSON.stringify(response.data[key][0].symbol)
                                return obj;

                            case "languages":
                                obj[key] = response.data[key][0].name
                                return obj;

                            case "nativeName":
                                obj[key] = JSON.stringify(response.data[key]);
                                return obj;

                            case "population":
                                obj[key] = HandleNumberWithCommas(response.data[key]);
                                return obj;
                            default:
                                obj[key] = response.data[key];
                                return obj;
                        }
                    }, {}));
                    props.onSelectCountryInfo(response.data);
                    setLoader(false);
                });
        }
    });

    const countryInformation = (
        <>
            <div style={{ width: '100%', padding: "2%" }}>
                <Box
                    justifyContent="column"
                    display="flex"
                    flexWrap="wrap"
                    p={1}
                    m={1}
                    bgcolor="background.paper"
                    style={{ maxWidth: 600, margin: "0 auto" }}
                >
                    {Object.keys(countryInfo).map(information => <Box key={information} style={{ fontSize: "18px", color: "#263238" }} p={1} m={1} component={Paper} bgcolor={grey[300]} align="center">{information.toUpperCase()}: {countryInfo[information]}</Box>)}
                </Box>
            </div>
        </>
    )

    return (
        <div className={classes.box} >
            {(loader === true) ? <LoaderIcon /> : countryInformation}
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onSelectCountryInfo: (information) => dispatch({ type: actionTypes.COUNTRY_INFO, information: information })
    }
}

const mapStateToProps = state => {
    return {
        selectedCountry: state.country.countrySelected,
        countryListAllIsoData: state.country.countryListAllIsoData,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCountry);