import React from "react"
import {makeStyles} from "@material-ui/core/styles"

import {CloseRounded, DoneAllRounded, StopRounded,} from "@material-ui/icons"
import {useDispatch} from "react-redux"
import Typography from "@material-ui/core/Typography"
import {Box} from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import IconButton from "@material-ui/core/IconButton"
import CircularProgress from "@material-ui/core/CircularProgress"
import {deleteTask, updateTask} from "../../actions/tasks"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(1)
    },
    status: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1)
    },
    statusText: {
        marginRight: theme.spacing(1)
    },
    settings: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto'
    }
}))

export default function Task({task}) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const handleDeleteTask = (id) => {
        dispatch(deleteTask(task.id))
    }

    const handleUpdateTask = (task) => {
        dispatch(updateTask({...task, isWorking: false}))
    }

    return (
        <Paper className={classes.root} variant='outlined' key={task.id}>
            <div>
                <Typography variant='body1'>
                    <Box fontWeight="fontWeightMedium">
                        {task.name}
                    </Box>
                </Typography>
                <div className={classes.status}>
                    <Typography
                        className={classes.statusText}
                        variant='body2'
                    >
                        {new Date(task.startDate).toLocaleTimeString()}
                    </Typography>
                    {task.isWorking && <CircularProgress color='primary' thickness={6} size={14}/>}
                </div>
            </div>

            <div className={classes.settings}>
                {task.isWorking &&
                <IconButton size='small'
                            onClick={() => handleUpdateTask(task)}>
                    <StopRounded/>
                </IconButton>
                }
                {task.isDone && <DoneAllRounded color='primary'/>}

                <IconButton size='small'
                            onClick={() => handleDeleteTask(task.id)}>
                    <CloseRounded/>
                </IconButton>
            </div>
        </Paper>
    )
}
