import React from 'react';
import { connect } from 'react-redux';
import { Box, makeStyles } from '@material-ui/core';
import blueGrey from '@material-ui/core/colors/blueGrey';

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
        // padding: "auto auto",
        width: "50%",
        // height: "50%",
        background: blueGrey[500]
    },
    avatar: {
        width: "50%",
        margin: "0 auto"
    }


}));


const ChooseCountry = (props) => {
    const classes = useStyles()



    return (
        < >
            <Box className={classes.box} >
                <img className = {classes.avatar} alt="Remy Sharp" src={props.selectedCountry === -1 ? "https://www.countryflags.io/ir/flat/64.png" : `https://www.countryflags.io/${props.countryListAllIsoData[props.selectedCountry].code}/flat/64.png`} />
            </Box>
        </>
    );
}


const mapStateToProps = state => {
    if(state.country.countrySelected !== -1){
        console.log(state.country.countryListAllIsoData[state.country.countrySelected].code)
    }

    return {
        selectedCountry: state.country.countrySelected,
        countryListAllIsoData: state.country.countryListAllIsoData
    }
}

export default connect(mapStateToProps)(ChooseCountry);