import React, {useContext} from 'react'
import {makeStyles} from "@material-ui/core/styles"
import AppBar from '@material-ui/core/AppBar'
import Search from "../Search"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from '@material-ui/icons/Menu'
import Context from "../../context"
import Hidden from "@material-ui/core/Hidden"
import Logo from "../Logo";

const useStyles = makeStyles((theme) => ({
    root: {
        zIndex: theme.zIndex.drawer + 1,
        height: theme.spacing(8),
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: theme.spacing(1),
    },
    menuButton: {
        marginRight: theme.spacing(1)
    },
}))

export default function Header() {
    const classes = useStyles()

    const {toggleMenu} = useContext(Context)

    return (
        <AppBar position='fixed' color='inherit' elevation={0} className={classes.root}>
            <div className={classes.content}>
                <IconButton className={classes.menuButton} onClick={() => toggleMenu()}>
                    <MenuIcon/>
                </IconButton>

                <Hidden xsDown>
                    <Logo/>
                </Hidden>

                <Search/>
            </div>
        </AppBar>
    )
}
