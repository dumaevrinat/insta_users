import React, {useState} from 'react'
import {makeStyles} from "@material-ui/core/styles"
import TableContainer from "@material-ui/core/TableContainer"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableBody from "@material-ui/core/TableBody"
import {Avatar, Box, Hidden, Typography} from "@material-ui/core"
import TablePagination from "@material-ui/core/TablePagination"
import Empty from "../Empty"
import {useHistory} from "react-router-dom"
import Card from "@material-ui/core/Card"
import Button from "@material-ui/core/Button"
import {CSVLink} from "react-csv"
import Collapse from "@material-ui/core/Collapse"
import IconButton from "@material-ui/core/IconButton"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from "clsx"
import {ClearAllRounded, DeleteOutlineRounded, MoreVertRounded, SaveAltRounded} from "@material-ui/icons"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import {useDispatch} from "react-redux"
import {clearAccounts, deleteSet} from "../../actions/sets"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(1)
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2)
    },
    headerTitle: {
        display: 'flex',
        alignItems: 'center',
    },
    headerSubtitle: {},
    expand: {
        marginLeft: theme.spacing(1),
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'nowrap',
        marginLeft: 'auto'
    },
    actionsButton: {
        marginLeft: theme.spacing(1)
    },
    content: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    pagination: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    accountAvatar: {
        width: theme.spacing(3),
        height: theme.spacing(3)
    },
    csvExportLink: {
        textDecoration: 'none',
        color: 'inherit',
        display: 'flex',
        alignItems: 'center'
    },
    menuIcon: {
        minWidth: 0,
        marginRight: theme.spacing(2)
    }
}))

const headCells = [
    {id: 'profile_pic_url', label: 'Pic'},
    {id: 'id', label: 'Id'},
    {id: 'username', label: 'Username'},
    {id: 'full_name', label: 'Full name'},
    {id: 'is_verified', label: 'Is verified'},
]

function SetMenu({setId, accounts}) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleDelete = () => {
        dispatch(deleteSet(setId))
        handleClose()
    }

    const handleClear = () => {
        dispatch(clearAccounts(setId))
        handleClose()
    }

    return (
        <div>
            <IconButton
                className={classes.actionsButton}
                size='small'
                onClick={handleClick}
            >
                <MoreVertRounded/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleDelete}>
                    <ListItemIcon className={classes.menuIcon}>
                        <DeleteOutlineRounded/>
                    </ListItemIcon>
                    <ListItemText primary='Delete'/>
                </MenuItem>
                <MenuItem onClick={handleClear}>
                    <ListItemIcon className={classes.menuIcon}>
                        <ClearAllRounded/>
                    </ListItemIcon>
                    <ListItemText primary='Clear'/>
                </MenuItem>
                <Hidden smUp>
                    <CSVLink
                        style={{textDecoration: 'none', color: 'inherit'}}
                        data={accounts.map((account) => account.node)}
                        filename={"accounts.csv"}
                    >
                        <MenuItem>
                            <ListItemIcon className={classes.menuIcon}>
                                <SaveAltRounded/>
                            </ListItemIcon>
                            <ListItemText primary='Export to CSV'/>
                        </MenuItem>
                    </CSVLink>
                </Hidden>
            </Menu>
        </div>
    )
}

export default function Set({id, name, accounts}) {
    const classes = useStyles()
    const history = useHistory()

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(15)
    const [isExpanded, setIsExpanded] = useState(false)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const onClickAccount = (username) => {
        history.push(`/u/${username}`)
    }

    return (
        <Card variant='outlined' className={classes.root}>
            <div className={classes.header}>
                <div className={classes.headerTitle}>
                    <Typography noWrap>
                        <Box fontWeight="fontWeightMedium" component='span'>
                            {name}
                        </Box>
                    </Typography>

                    <IconButton
                        size='small'
                        className={clsx(classes.expand, isExpanded && classes.expandOpen)}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <ExpandMoreIcon/>
                    </IconButton>

                    <div className={classes.actions}>
                        <Hidden xsDown>
                            <CSVLink
                                style={{textDecoration: 'none', color: 'inherit'}}
                                data={accounts.map((account) => account.node)}
                                filename={"accounts.csv"}
                            >
                                <Button
                                    className={classes.actionsButton}
                                    startIcon={<SaveAltRounded/>}
                                    variant='contained'
                                    size='small'
                                    disableElevation
                                    color='primary'
                                >
                                    Export to CSV
                                </Button>
                            </CSVLink>
                        </Hidden>

                        <SetMenu setId={id} accounts={accounts}/>
                    </div>
                </div>
                <div className={classes.headerSubtitle}>
                    <Typography variant='subtitle2' color='textSecondary'>{`${accounts.length} accounts`}</Typography>
                </div>
            </div>

            <Collapse in={isExpanded}>
                <div className={classes.content}>
                    {accounts.length === 0 && <Empty/>}

                    {accounts.length !== 0 &&
                    <div>
                        <TableContainer>
                            <Table size='small'>
                                <TableHead>
                                    <TableRow>
                                        {headCells.map((headCell) => (
                                            <TableCell key={headCell.id} align='left'>
                                                {headCell.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {accounts
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) =>
                                            <TableRow hover key={row.node.id}
                                                      onClick={() => onClickAccount(row.node.username)}>
                                                <TableCell align="left">
                                                    <Avatar className={classes.accountAvatar}
                                                            src={row.node.profile_pic_url}/>
                                                </TableCell>
                                                <TableCell align="left">{row.node.id}</TableCell>
                                                <TableCell align="left">{row.node.username}</TableCell>
                                                <TableCell align="left">{row.node.full_name}</TableCell>
                                                <TableCell
                                                    align="left">{row.node.is_verified ? 'verified' : 'not verified'}</TableCell>
                                            </TableRow>
                                        )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            className={classes.pagination}
                            rowsPerPageOptions={[]}
                            component="div"
                            count={accounts.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                        />
                    </div>
                    }
                </div>
            </Collapse>
        </Card>
    )
}
