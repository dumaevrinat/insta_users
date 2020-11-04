import React, {useState} from 'react'
import {makeStyles} from "@material-ui/core/styles"
import {Typography} from "@material-ui/core"
import {timeout} from "../../utils"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    logo: {
        padding: theme.spacing(1, 0),
        userSelect: 'none',
        whiteSpace: 'nowrap',
    },
    logoAdditional: {
        minWidth: 80,
        padding: theme.spacing(1, 0),
        marginRight: theme.spacing(2),
        userSelect: 'none',
        whiteSpace: 'nowrap',
        transition: theme.transitions.create('all', {
            duration: theme.transitions.duration.standard
        }),
    }
}))

export default function Logo() {
    const classes = useStyles()

    const [logoText, setLogoText] = useState('insta->')
    const [isActive, setIsActive] = useState(false)

    const handleOnMouseOverLogo = async () => {
        if (!isActive) {
            setIsActive(true)
            await timeout(100)
            setLogoText('insta--')
            await timeout(150)
            setLogoText('insta>-')
            await timeout(120)
            setLogoText('insta->')
            await timeout(100)
            setIsActive(false)
        }
    }

    const handleOnMouseOutLogo = () => {
        // setLogoText('insta->users')
    }

    return (
        <div className={classes.root}>

            <Typography
                className={classes.logo}
                variant='h6'
                onMouseOver={handleOnMouseOverLogo}
                onMouseOut={handleOnMouseOutLogo}
            >
                {logoText}
            </Typography>
            <Typography
                className={classes.logoAdditional}
                variant='h6'
                color='secondary'
                onMouseOver={handleOnMouseOverLogo}
                onMouseOut={handleOnMouseOutLogo}
            >
                users
            </Typography>
        </div>
    )
}
