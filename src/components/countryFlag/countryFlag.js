import React from 'react';
import { connect } from 'react-redux';
import { Avatar, Box, makeStyles } from '@material-ui/core';
import blueGrey from '@material-ui/core/colors/blueGrey';
import defaultImage from '../../assets/images/default.jpg'

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
        width: "100%",
        backgroundColor: blueGrey[900],
        padding: "2%" ,
        [theme.breakpoints.up('sm')]: {
            width: "50%",
        },
    },
    avatar: {
  
        backgroundSize: "cover", 
        margin: "0 auto",
        width: "180px",
        height: "90px",
        [theme.breakpoints.up('md')]: {
            width: "270px",
            height: "160px",
        },
        [theme.breakpoints.up('lg')]: {
            width: "450px",
            height: "200px",
        },
    },
}));


const ChooseCountry = (props) => {
    const classes = useStyles();
    return (
        < >
            <Box className={classes.box} >
                {props.countrySelected === -1 ? <Avatar variant = "rounded" className={classes.avatar} alt="Country"  src= {defaultImage} />:
                <Avatar variant = "rounded" className={classes.avatar} alt={props.countryListAllIsoData[props.countrySelected].name} src={`https://restcountries.eu/data/${props.countryListAllIsoData[props.countrySelected].code3.toLowerCase()}.svg`} />
                }
            </Box>
        </>
    );
}


const mapStateToProps = state => {
    return {
        countrySelected: state.country.countrySelected,
        countryListAllIsoData: state.country.countryListAllIsoData
    }
}

export default connect(mapStateToProps)(ChooseCountry);