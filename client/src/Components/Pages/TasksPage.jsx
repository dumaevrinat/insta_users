import React from "react"
import {makeStyles} from "@material-ui/core/styles"

import {DeleteOutlineRounded, StopRounded} from "@material-ui/icons"
import {useDispatch, useSelector} from "react-redux"
import {clearTasks, setDelayInTask, updateTask} from "../../actions/tasks"
import Typography from "@material-ui/core/Typography"
import {CardActionArea} from "@material-ui/core"
import Slider from "@material-ui/core/Slider"
import StatisticItem from "../StatisticItem"
import Empty from "../Empty"
import Card from "@material-ui/core/Card"
import Section from "../Section"
import Task from "../Task"

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
    }
}))

export default function TasksPage() {
    const classes = useStyles()
    const dispatch = useDispatch()

    const tasks = useSelector(state => state.tasks.tasks)
    const delayInTask = useSelector(state => state.tasks.delayInTask)

    const stopAll = () => {
        tasks.map(task => dispatch(updateTask({...task, isWorking: false, isDone: true})))
    }

    return (
        <div>
            <Section title='Settings'>
                <div className={classes.settings}>
                    <Card className={classes.settingItem} variant='outlined' onClick={() => stopAll()}>
                        <CardActionArea className={classes.settingsItemAction}>
                            <div className={classes.settingsItemContent}>
                                <StopRounded color='primary'/>
                                <Typography variant='subtitle2'>Stop all</Typography>
                            </div>
                        </CardActionArea>
                    </Card>

                    <Card className={classes.settingItem} variant='outlined' onClick={() => dispatch(clearTasks())}>
                        <CardActionArea className={classes.settingsItemAction}>
                            <div className={classes.settingsItemContent}>
                                <DeleteOutlineRounded color='primary'/>
                                <Typography variant='subtitle2'>Delete all</Typography>
                            </div>
                        </CardActionArea>
                    </Card>

                    <Card className={classes.settingItem} variant='outlined'>
                        <div className={classes.settingsItemAction}>
                            <div className={classes.settingsItemContent}>
                                <StatisticItem text='Delay between requests, ms' value={delayInTask}/>
                                <Slider
                                    color='primary'
                                    value={delayInTask}
                                    onChange={(event, newValue) => dispatch(setDelayInTask(newValue))}
                                    step={100}
                                    min={500}
                                    max={5000}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </Section>
            <Section title='Tasks'>
                <div>
                    {tasks.length === 0 && <Empty/>}

                    {tasks.map((task) =>
                        <Task key={task.id} task={task}/>
                    )}
                </div>
            </Section>
        </div>
    )
}
