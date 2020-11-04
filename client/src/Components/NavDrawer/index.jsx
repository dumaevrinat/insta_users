import React, {useContext} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import {ArchiveOutlined, AssignmentOutlined, HomeOutlined} from "@material-ui/icons"
import Context from "../../context"
import {useHistory} from "react-router-dom"
import clsx from "clsx"
import {Toolbar} from "@material-ui/core"
import DrawerItem from "./DrawerItem"
import Logo from "../Logo"

const useStyles = makeStyles((theme) => ({
    root: {
        width: 240,
        height: '100%',
        flexShrink: 0,
        padding: theme.spacing(0, 1),
    },
    paper: {
        width: 240,
        border: 'none',
    },
    close: {
        width: 0,
    },
    logo: {
        margin: theme.spacing(2, 0, 2, 2),
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(1)
    },
}))

export default function NavDrawer({isOpenMenu, isMobile}) {
    const classes = useStyles()
    const history = useHistory()

    const {toggleMenu} = useContext(Context)

    const goPage = (pagePath) => {
        history.push(`/${pagePath}`)

        if (isMobile) {
            toggleMenu()
        }
    }

    return (
        <Drawer
            variant={isMobile ? 'temporary' : 'persistent'}
            anchor='left'
            className={clsx(classes.root, !isOpenMenu && classes.close)}
            classes={{
                paper: classes.paper,
            }}
            open={isOpenMenu}
            onClose={() => toggleMenu()}
        >
            {isMobile &&
            <div className={classes.logo}>
                <Logo/>
            </div>
            }

            {!isMobile && <Toolbar/>}

            <List className={classes.list}>
                <DrawerItem
                    text='Home'
                    isSelected={true}
                    icon={<HomeOutlined/>}
                    onClick={() => goPage('')}
                />
                <DrawerItem
                    text='Sets'
                    isSelected={false}
                    icon={<ArchiveOutlined/>}
                    onClick={() => goPage('sets')}
                />
                <DrawerItem
                    text='Tasks'
                    isSelected={false}
                    icon={<AssignmentOutlined/>}
                    onClick={() => goPage('tasks')}
                />
            </List>
        </Drawer>
    )
}
