import React, {useCallback, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import InputBase from "@material-ui/core/InputBase"

import {useHistory} from "react-router-dom"
import Paper from "@material-ui/core/Paper"
import {ClearRounded} from "@material-ui/icons"
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import Collapse from "@material-ui/core/Collapse"
import {useDispatch, useSelector} from "react-redux"
import Avatar from "@material-ui/core/Avatar"

import _ from "lodash"
import {clearSearchUsers, search} from "../../actions/search"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"
import clsx from "clsx"
import LinearProgress from "@material-ui/core/LinearProgress"
import {Hidden} from "@material-ui/core"
import Box from "@material-ui/core/Box"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
        borderRadius: theme.spacing(1, 1, 1, 1),
        width: '100%',
        maxWidth: '100%',
        overflowX: 'hidden',
        background: theme.palette.background.light,
        transition: theme.transitions.create('all', {
            duration: theme.transitions.duration.short
        }),
        [theme.breakpoints.up('xs')]: {
            maxWidth: 500,
        }
    },
    expandedSearch: {
        background: theme.palette.common.white
    },
    search: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    searchInput: {
        marginLeft: theme.spacing(2),
        flexGrow: 1
    },
    results: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        overflowY: 'auto',
        maxHeight: 450
    }
}))

export default function Search() {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()

    const [expandedSearch, setExpandedSearch] = useState(false)

    const searchUsers = useSelector(state => state.search.searchUsers)
    const status = useSelector(state => state.search.status)

    const [query, setQuery] = useState('')
    const delayedSearch = useCallback(_.debounce(q => dispatch(search(q)), 500), [])

    const onSearchUsername = (username) => {
        if (username || username !== '') {
            setExpandedSearch(false)
            history.push(`/u/${username}`)
        }
    }

    const onChange = (query) => {
        setQuery(query)
        delayedSearch(query)
    }

    const clearResults = () => {
        setQuery('')
        setExpandedSearch(false)
        dispatch(clearSearchUsers())
    }

    return (
        <Paper
            elevation={expandedSearch ? 1 : 0}
            className={clsx(classes.root, expandedSearch && classes.expandedSearch)}
            onFocus={() => setExpandedSearch(true)}
            onBlur={() => setExpandedSearch(false)}
        >
            <div className={classes.search}>
                <Hidden xsDown>
                    <SearchRoundedIcon color="action"/>
                </Hidden>

                <InputBase
                    className={classes.searchInput}
                    value={query}
                    placeholder="Search"
                    onChange={(event) => onChange(event.target.value)}
                />

                {(query || searchUsers.length !== 0) &&
                <IconButton
                    color='inherit'
                    size='small'
                    onClick={() => clearResults()}
                >
                    <ClearRounded/>
                </IconButton>
                }
            </div>

            <Collapse in={expandedSearch && status === 'loading'} timeout={150}>
                <LinearProgress/>
            </Collapse>

            <Collapse in={expandedSearch && searchUsers.length !== 0} timeout={150}>
                <List dense={true} className={classes.results}>
                    {searchUsers.map((user) =>
                        <ListItem button key={user.user.pk} onClick={() => onSearchUsername(user.user.username)}>
                            <ListItemAvatar>
                                <Avatar src={user.user.profile_pic_url}/>
                            </ListItemAvatar>
                            <ListItemText primary={
                                <Box component='div' textOverflow="ellipsis" overflow="hidden">
                                    {user.user.username}
                                </Box>}
                            />
                        </ListItem>
                    )}
                </List>
            </Collapse>
        </Paper>
    )
}
