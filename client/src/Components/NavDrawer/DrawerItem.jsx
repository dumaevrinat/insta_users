import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: theme.spacing(1, 1, 1, 1)
    }
}))

export default function DrawerItem({text, icon, onClick}) {
    const classes = useStyles()

    return (
        <ListItem
            button
            className={classes.root}
            onClick={() => onClick()}
        >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text}/>
        </ListItem>
    )
}
