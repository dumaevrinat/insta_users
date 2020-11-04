import React, {useState} from "react"
import {makeStyles} from "@material-ui/core/styles"
import {CardActionArea, Grid} from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import {useDispatch, useSelector} from "react-redux"
import Empty from "../Empty"
import {
    AddCircleOutlineRounded,
    AddRounded,
    ClearAllRounded,
    DeleteOutlineRounded,
    HighlightOffRounded,
    RemoveCircleOutlineRounded
} from "@material-ui/icons"
import {clearSets, updateSet} from "../../actions/sets"
import Card from "@material-ui/core/Card"
import Section from "../Section"
import Set from "../Set"
import SetCreateDialog from "../SetCreateDialog"
import SetOperationsDialog from "../SetOperationsDialog"

const useStyles = makeStyles((theme) => ({
    root: {},
    settings: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflow: 'auto',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    settingsItemAction: {
        width: '100%',
        height: '100%'
    },
    settingsItemContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(2),
        minHeight: theme.spacing(8),
        minWidth: theme.spacing(8),
    },
    settingItem: {
        marginRight: theme.spacing(1),
        flexShrink: 0,
    },

    tablePaper: {
        display: 'flex',
        flexDirection: 'column',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    accountAvatar: {
        width: theme.spacing(3),
        height: theme.spacing(3)
    }
}))

export default function SetsPage() {
    const classes = useStyles()
    const dispatch = useDispatch()

    const sets = useSelector(state => state.sets.sets)

    const [openSetCreateDialog, setOpenSetCreateDialog] = useState(false)
    const [openSetOperatorDialog, setOpenSetOperatorDialog] = useState(false)

    const handleClickOpenCreateDialog = () => {
        setOpenSetCreateDialog(true)
    }

    const handleCloseCreateDialog = () => {
        setOpenSetCreateDialog(false)
    }

    const handleClickOpenOperatorDialog = () => {
        setOpenSetOperatorDialog(true)
    }

    const handleCloseOperatorDialog = () => {
        setOpenSetOperatorDialog(false)
    }

    return (
        <div className={classes.root}>
            <Section title='Settings'>
                <div className={classes.settings}>
                    <Card className={classes.settingItem} variant='outlined'
                          onClick={() => handleClickOpenCreateDialog()}>
                        <CardActionArea className={classes.settingsItemAction}>
                            <div className={classes.settingsItemContent}>
                                <AddRounded color='secondary'/>
                                <Typography variant='subtitle2'>Create new</Typography>
                            </div>
                        </CardActionArea>
                    </Card>

                    <Card className={classes.settingItem} variant='outlined'
                          onClick={() => handleClickOpenOperatorDialog()}>
                        <CardActionArea className={classes.settingsItemAction}>
                            <div className={classes.settingsItemContent}>
                                <Grid justify='space-around' container spacing={1}>
                                    <Grid item>
                                        <RemoveCircleOutlineRounded color='secondary'/>
                                    </Grid>
                                    <Grid item>
                                        <HighlightOffRounded color='secondary'/>
                                    </Grid>
                                    <Grid item>
                                        <AddCircleOutlineRounded color='secondary'/>
                                    </Grid>
                                </Grid>
                                <Typography variant='subtitle2'>Operations</Typography>
                            </div>
                        </CardActionArea>
                    </Card>

                    <Card className={classes.settingItem} variant='outlined'
                          onClick={() => dispatch(clearSets())}>
                        <CardActionArea className={classes.settingsItemAction}>
                            <div className={classes.settingsItemContent}>
                                <DeleteOutlineRounded color='primary'/>
                                <Typography variant='subtitle2'>Delete all</Typography>
                            </div>
                        </CardActionArea>
                    </Card>

                    <Card className={classes.settingItem} variant='outlined'
                          onClick={() => sets.map((set) => dispatch(updateSet({...set, accounts: []})))}>
                        <CardActionArea className={classes.settingsItemAction}>
                            <div className={classes.settingsItemContent}>
                                <ClearAllRounded color='primary'/>
                                <Typography variant='subtitle2'>Clear all</Typography>
                            </div>
                        </CardActionArea>
                    </Card>
                </div>
            </Section>

            <Section title='Sets of account'>
                {sets.length === 0 && <Empty/>}

                {sets.map((set) =>
                    <Set key={set.id} id={set.id} name={set.name} accounts={set.accounts}/>
                )}
            </Section>

            <SetOperationsDialog open={openSetOperatorDialog} onClose={() => handleCloseOperatorDialog()}/>
            <SetCreateDialog open={openSetCreateDialog} onClose={() => handleCloseCreateDialog()}/>
        </div>
    )
}
