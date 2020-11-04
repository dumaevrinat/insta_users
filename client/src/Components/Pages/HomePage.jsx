import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import Section from "../Section"
import ViewedAccount from "../ViewedAccount"
import Card from "@material-ui/core/Card"
import {useSelector} from "react-redux"
import StatisticItem from "../StatisticItem"
import {useHistory} from "react-router-dom"
import Empty from "../Empty"
import Zoom from "@material-ui/core/Zoom"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    viewedAccounts: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'nowrap',
        overflow: 'auto',
    },
    empty: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    statsCard: {
        padding: theme.spacing(2),
    },
    stats: {
        marginBottom: theme.spacing(1)
    }
}))

export default function HomePage() {
    const classes = useStyles()
    const history = useHistory()

    const tasks = useSelector(state => state.tasks.tasks)
    const sets = useSelector(state => state.sets.sets)
    const viewedAccounts = useSelector(state => state.viewedAccounts.viewedAccounts)

    const handleClickOnAccount = (username) => {
        if (username || username !== '') {
            history.push(`/u/${username}`)
        }
    }

    return (
        <div className={classes.root}>
            <Section title='Last viewed accounts'>
                <div className={classes.viewedAccounts}>
                    {viewedAccounts.length === 0 &&
                    <div className={classes.empty}>
                        <Empty/>
                    </div>
                    }

                    {viewedAccounts.map((account) =>
                        <Zoom in={true}>
                            <ViewedAccount
                                key={account.id}
                                username={account.username}
                                profilePic={account.profile_pic_url}
                                onClick={() => handleClickOnAccount(account.username)}
                            />
                        </Zoom>
                    )}
                </div>
            </Section>

            <Section title='Status'>
                <Card variant='outlined' className={classes.statsCard}>
                    <div className={classes.stats}>
                        <StatisticItem text='Number of account sets' value={sets.length}/>
                    </div>
                    <div className={classes.stats}>
                        <StatisticItem text='Number of working tasks' value={tasks.filter(t => t.isWorking).length}/>
                    </div>
                    <div className={classes.stats}>
                        <StatisticItem text='Number of completed tasks' value={tasks.filter(t => t.isDone).length}/>
                    </div>
                </Card>
            </Section>
        </div>
    )
}
