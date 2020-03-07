import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Paper, Box, makeStyles } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import axios from '../../axios';
import LoaderIcon from '../../UI/loader';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
    info: {
        margin: "0 auto",
        // width: 180,
        // height: "90px",
        // [theme.breakpoints.up('md')]: {
        //     width: 270,
        //     // height: "160px",
        // },
        // [theme.breakpoints.up('lg')]: {
        //     width: 650,
        //     // height: "200px",
        // },
        width: 460,
        height: 319,
        [theme.breakpoints.up('md')]: {
            width: 500,
            height: "160px",
        },
        [theme.breakpoints.up('lg')]: {
            width: 650,
            height: "200px",
        },
    }

}));

const ChooseCountry = (props) => {


    const neededItemsForInformation = ['name', 'capital', 'region', 'population', 'languages', 'nativeName'];
    const [country, setCountry] = useState('');
    const [countryInfo, setCountryInfo] = useState({});
    const [loader, setLoader] = useState(false);

    const classes = useStyles()

    useEffect(() => {
        if (props.selectedCountry !== -1 && country !== props.countryListAllIsoData[props.selectedCountry].code3.toLowerCase()) {
            setLoader(true);
            setCountry(props.countryListAllIsoData[props.selectedCountry].code3.toLowerCase());
            axios.get('/' + props.countryListAllIsoData[props.selectedCountry].code3.toLowerCase())
                .then(response => {

                    setCountryInfo(Object.keys(response.data).filter(keys => neededItemsForInformation.includes(keys)).reduce((obj, key) => {
                        key === "languages" ? obj[key] = response.data[key][0].name : obj[key] = response.data[key];
                        return obj;
                    }, {}));
                    setLoader(false);
                    console.log(response.data);
                });
        }

    });
    console.log('countryInfo: ', countryInfo);
    console.log('loader: ', loader);

    (loader === true && Object.keys(countryInfo).length === 0) ? console.log('load') : console.log('ali');
    //   var size = Object.keys(myObject).length;
    //! try to make loader in correct time

    const countryInformation = (
        <>
            <div style={{ width: '100%' }}>
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
            {/* {countryInformation} */}


            {(loader === true) ? <LoaderIcon /> : countryInformation }

            {/* <img className={classes.avatar} alt="Remy Sharp" src={`https://restcountries.eu/data/irn.svg`} /> */}

        </div>
    );
}


const mapStateToProps = state => {
    return {
        selectedCountry: state.country.countrySelected,
        countryListAllIsoData: state.country.countryListAllIsoData
    }
}



export default connect(mapStateToProps)(ChooseCountry);