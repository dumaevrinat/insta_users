import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import {IconButton} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: theme.spacing(1),
    },
    avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        padding: 0,
    },

    title: {
        maxWidth: theme.spacing(12)
    }
}))

export default function ViewedAccount({username, profilePic, onClick}) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <IconButton onClick={() => onClick()}>
                <Avatar className={classes.avatar} src={profilePic}/>
            </IconButton>
            <Typography variant='subtitle2' className={classes.title} noWrap>
                {username}
            </Typography>
        </div>
    )
}
