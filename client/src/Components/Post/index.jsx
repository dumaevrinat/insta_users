import React, {useState} from "react"
import {makeStyles} from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import CardMedia from "@material-ui/core/CardMedia"
import StatisticItem from "../StatisticItem"
import {useDispatch, useSelector} from "react-redux"
import {addTask, runTask} from "../../actions/tasks"
import {v4 as uuidv4} from 'uuid'
import {addAllAccountsFromLikes} from "../../actions/sets"
import CardActions from "@material-ui/core/CardActions"
import SetDialog from "../SetSelectDialog"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    content: {
        padding: theme.spacing(1),
    },
    cover: {
        display: 'flex',
        width: '100%',
        backgroundColor: theme.palette.background.light,
    },
    defaultImage: {
        zIndex: 2,
        paddingTop: '100%'
    },
    image: {
        zIndex: 1,
        width: '100%',
    }
}))

export default function Post({username, shortcode, likeCount, commentCount, previewLink}) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const sets = useSelector(state => state.sets.sets)

    const [openSetDialog, setOpenSetDialog] = useState(false)
    const [isLoadingImage, setIsLoadingImage] = useState(true)

    const startGetLikes = (shortcode, setId, taskName) => {
        const id = uuidv4()
        const now = new Date()

        const task = {
            id: id,
            isWorking: false,
            isDone: false,
            action: addAllAccountsFromLikes,
            args: [shortcode, setId, id],
            startDate: now.getTime(),
            name: taskName
        }

        dispatch(addTask(task))
        dispatch(runTask(task))
    }

    const handleClickOpen = () => {
        setOpenSetDialog(true)
    }

    const handleClose = (set) => {
        setOpenSetDialog(false)
        if (set) {
            startGetLikes(shortcode, set.id, `Add accounts from ${username}'s post likes to ${set.name}`)
        }
    }

    return (
        <Card className={classes.root} variant="outlined">
            <div className={classes.cover}>
                {isLoadingImage && <div className={classes.defaultImage}/>}

                <CardMedia
                    className={classes.image}
                    component="img"
                    image={previewLink}
                    onLoad={() => setIsLoadingImage(false)}
                />
            </div>


            <CardContent className={classes.content}>
                <StatisticItem value={likeCount} text='Likes'/>
                <StatisticItem value={commentCount} text='Comments'/>
            </CardContent>
            <CardActions>
                <Button onClick={() => handleClickOpen()}>
                    Get likes
                </Button>
            </CardActions>

            <SetDialog sets={sets} open={openSetDialog} onClose={handleClose}/>
        </Card>
    )
}
