import React from 'react'
import {makeStyles} from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(6)
    },
    title: {
        marginBottom: theme.spacing(2)
    }
}))

export default function Section({title, children}) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Typography variant="h6" className={classes.title}>
                {title}
            </Typography>

            <div>
                {children}
            </div>
        </div>
    )
}
