import Typography from "@material-ui/core/Typography"
import {Box} from "@material-ui/core"
import React from "react"
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
    value: {
        marginRight: theme.spacing(1)
    }
}))

export default function StatisticItem({text, value}) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Typography  className={classes.value} variant='subtitle2'>
                <Box fontSize="h6.fontSize">
                    {value}
                </Box>
            </Typography>
            <Typography variant='subtitle2' color='textSecondary'>{text}</Typography>
        </div>
    )
}
