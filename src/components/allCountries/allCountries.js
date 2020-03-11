import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Paper, Box, makeStyles } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import axios from '../../axios';
import LoaderIcon from '../../UI/loader/loader';
import * as actionTypes from '../../store/actions'
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AccessForbidden from '../../UI/403AccessForbidden/403AccessForbidden'

const useStyles = makeStyles(theme => ({

    root: {
        maxWidth: 300,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const ChooseCountry = (props) => {
    const [loader, setLoader] = useState(false);
    const [countriesInfo, setCountriesInformation] = useState([]);
    let ali = [];
    const classes = useStyles()

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [tst, setTst] = useState(false);



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
                    {countriesInfo.map(country =>
                        (
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
                        )
                    )}
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
    )

    return (
        <>
            {!props.authentication ? <AccessForbidden /> : mainDiv
            }
        </>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onSelectCountryInfo: (information) => dispatch({ type: actionTypes.COUNTRY_INFO, information: information })
    }
}

const mapStateToProps = state => {
    return {
        countryListAllIsoData: state.country.countryListAllIsoData,
        authentication: state.auth.authenticated,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCountry);