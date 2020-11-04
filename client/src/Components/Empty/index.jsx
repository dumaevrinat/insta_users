import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import {SentimentDissatisfied} from "@material-ui/icons"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: theme.spacing(8)
    }
}))

export default function Empty() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <SentimentDissatisfied color='primary'/>
            <Typography variant='body1'>
                Ooops... It's empty in here
            </Typography>
        </div>
    )
}
