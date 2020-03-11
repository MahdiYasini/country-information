import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';
import { Box, makeStyles, Card, CardHeader, CardMedia, CardContent, Typography } from '@material-ui/core';
import AccessForbidden from '../../UI/403AccessForbidden/403AccessForbidden'
import LoaderIcon from '../../UI/loader/loader';

const useStyles = makeStyles({
    root: {
        maxWidth: 300,
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    },
});

const ChooseCountry = (props) => {
    const [loader, setLoader] = useState(false);
    const [countriesInfo, setCountriesInformation] = useState([]);

    const classes = useStyles()

    const HandleNumberWithCommas = (x) => {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }

    useEffect(() => {
        if (!loader && props.authentication) {
            let countryListPromises = props.countryListAllIsoData.map(country => axios.get('/' + country.code3.toLowerCase()))
            Promise.all(countryListPromises)
                .then(countriesInformationResponse => {
                    let allInformation = [];
                    // eslint-disable-next-line array-callback-return
                    countriesInformationResponse.map(countryInformation => {
                        let information = {};
                        for (const key in countryInformation.data) {
                            switch (key) {
                                case 'name':
                                    information = { ...information, [key]: countryInformation.data[key] };
                                    break;
                                case 'capital':
                                    information = { ...information, [key]: countryInformation.data[key] };
                                    break;

                                case 'region':
                                    information = { ...information, [key]: countryInformation.data[key] };
                                    break;

                                case 'population':
                                    information = { ...information, [key]: HandleNumberWithCommas(countryInformation.data[key]) };
                                    break;

                                case 'nativeName':
                                    information = { ...information, [key]: JSON.stringify(countryInformation.data[key]) };
                                    break;

                                case 'alpha3Code':
                                    information = { ...information, [key]: countryInformation.data[key] };
                                    break;
                                default:
                                    break;
                            }
                        }
                        allInformation.push(information)
                    })
                    setLoader(true);
                    setCountriesInformation(allInformation)
                })
        }
    });

    const countriesInformation = (
        <>
            <div style={{ width: '100%', backgroundColor: "lightBlue" }}>
                <Box
                    display="flex"
                    flexWrap="wrap"
                    p={1}
                    m={1}
                    justifyContent="center"
                    bgcolor={"salmon"}
                    css={{ maxWidth: "100%" }}
                >
                    {countriesInfo.map(country => (
                        <Box key={country.alpha3Code} m={1} p={1} bgcolor="grey.300">
                            <Card className={classes.root}>
                                <CardHeader
                                    title={country.name}
                                />
                                <CardMedia
                                    className={classes.media}
                                    image={`https://restcountries.eu/data/${country.alpha3Code.toLowerCase()}.svg`}
                                    title="Flag"
                                />
                                <CardContent>
                                    <Typography p={1} color="primary" variant="subtitle1">
                                        More information about this country
                                    </Typography>
                                    <Typography p={1} variant="subtitle2" color="textPrimary">
                                        Capital: {country.capital}
                                    </Typography>
                                    <Typography p={1} variant="subtitle2" color="textPrimary">
                                        Region: {country.region}
                                    </Typography>
                                    <Typography p={1} variant="subtitle2" color="textPrimary">
                                        Population: {country.population}
                                    </Typography>
                                    <Typography p={1} variant="subtitle2" color="textPrimary">
                                        NativeName: {country.nativeName}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>
            </div>
        </>
    );

    const mainDiv = (
        <>
            {!loader ? <LoaderIcon p={1} m={1} /> :
                <div style={{ width: '100%', padding: "3%", backgroundColor: "lightBlue" }}>
                    {countriesInfo.length !== 0 ? countriesInformation : null}
                </div>
            }
        </>
    );

    return (
        <>
            {!props.authentication ? <AccessForbidden /> : mainDiv}
        </>
    );
}

const mapStateToProps = state => {
    return {
        countryListAllIsoData: state.country.countryListAllIsoData,
        authentication: state.auth.authenticated,
    }
}

export default connect(mapStateToProps)(ChooseCountry);