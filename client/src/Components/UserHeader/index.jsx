import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import Zoom from "@material-ui/core/Zoom"
import {Box} from "@material-ui/core"
import StatisticItem from "../StatisticItem"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        width: theme.spacing(16),
        height: theme.spacing(16),
    },

    title: {
        margin: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    biography: {
        whiteSpace: 'pre-line'
    },
    stats: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    }
}))

export default function UserHeader({username, fullName, biography, profilePicUrl, postsCount, followersCount, followingCount}) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Zoom in={true}>
                <Avatar className={classes.avatar} src={profilePicUrl}/>
            </Zoom>

            <div>
                <div className={classes.title}>
                    <Typography variant="h6">
                        <Box textAlign="center">
                            {username}
                        </Box>
                    </Typography>
                    <Typography variant="overline" color='textSecondary'>
                        <Box textAlign="center" fontSize="h6.fontSize">
                            {fullName}
                        </Box>
                    </Typography>
                    <Typography component='div' className={classes.biography}>
                        <Box textAlign="center">
                            {biography}
                        </Box>
                    </Typography>
                </div>
                <div className={classes.stats}>
                    <StatisticItem text='Posts' value={postsCount}/>
                    <StatisticItem text='Followers' value={followersCount}/>
                    <StatisticItem text='Following' value={followingCount}/>
                </div>
            </div>
        </div>
    )
}
