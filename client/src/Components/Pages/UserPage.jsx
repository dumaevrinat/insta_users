import React, {useEffect, useState} from "react"
import {makeStyles} from "@material-ui/core/styles"
import {useDispatch, useSelector} from "react-redux"
import {useHistory} from "react-router-dom"
import {getUser, setStatusGetUser} from "../../actions/user"
import Snackbar from "@material-ui/core/Snackbar"
import CircularProgress from "@material-ui/core/CircularProgress"
import UserHeader from '../UserHeader'
import Post from "../Post"
import Grid from "@material-ui/core/Grid"
import Zoom from "@material-ui/core/Zoom"
import {addViewedAccount} from "../../actions/viewedAccounts"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}))

export default function UserPage(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.user.user)
    const status = useSelector(state => state.user.status)
    const error = useSelector(state => state.user.error)

    const [isOpenErrorSnackbar, setIsOpenErrorSnackbar] = useState(false)

    useEffect(() => {
        if (status === 'failed') {
            setIsOpenErrorSnackbar(true)

            if (error.status && error.status === 404) {
                history.push('/notfound')
            }
        }
    }, [history, error, status])

    useEffect(() => {
        dispatch(setStatusGetUser('idle'))
        dispatch(getUser(props.match.params.username))
    }, [dispatch, props.match.params.username])

    useEffect(() => {
        if (user) {
            dispatch(addViewedAccount(user))
        }
    }, [user])

    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setIsOpenErrorSnackbar(false)
    }

    return (
        <div className={classes.root}>
            {status === 'loading' && <CircularProgress/>}
            {status === 'failed' &&
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                autoHideDuration={2000}
                open={isOpenErrorSnackbar}
                message={error.message}
                onClose={closeSnackbar}
            />
            }

            {status === 'succeeded' &&
            <div>
                <UserHeader
                    username={user.username}
                    fullName={user.full_name}
                    biography={user.biography}
                    profilePicUrl={user.profile_pic_url}
                    postsCount={user.edge_owner_to_timeline_media.count}
                    followersCount={user.edge_followed_by.count}
                    followingCount={user.edge_follow.count}
                />

                <Grid container spacing={2}>
                    {user.edge_owner_to_timeline_media.edges.map((edge) =>
                        <Zoom in={true} key={edge.node.id}>
                            <Grid container direction="column" item xs={12} sm={6} md={4}>
                                <Post
                                    username={user.username}
                                    shortcode={edge.node.shortcode}
                                    likeCount={edge.node.edge_liked_by.count}
                                    commentCount={edge.node.edge_media_to_comment.count}
                                    previewLink={edge.node.thumbnail_src}
                                />
                            </Grid>
                        </Zoom>
                    )}
                </Grid>
            </div>
            }
        </div>
    )
}
