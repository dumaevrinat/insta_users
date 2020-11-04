import React, {useState} from "react"
import {makeStyles} from "@material-ui/core/styles"
import {useHistory} from "react-router-dom"
import Grow from "@material-ui/core/Grow"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import {ArrowForwardRounded} from "@material-ui/icons"
import {Box, ButtonBase} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(6)
    }
}))

export default function NotFoundPage() {
    const classes = useStyles()
    const history = useHistory()

    const getRandomEmotion = () => {
        return emotion[Math.floor(Math.random() * emotion.length)]
    }

    const emotion = ['(>_<)', '(≥o≤)', '(^-^)', '-_-', '(>^.^)>', '(;-;)', '(·.·)', '\\(o_o)/']
    const [currentEmotion, setCurrentEmotion] = useState(getRandomEmotion())

    const goHome = () => {
        history.push('/')
    }

    return (
        <ButtonBase disableRipple disableTouchRipple className={classes.root} onClick={() => setCurrentEmotion(getRandomEmotion)}>
            <div className={classes.title}>
                <Grow in={true}>
                    <Typography variant='overline'>
                        <Box fontSize={100} color='text.disabled'>
                            {currentEmotion}
                        </Box>
                    </Typography>
                </Grow>
                <Typography>
                    <Box color='text.secondary'>
                        {'Not found.'}
                    </Box>
                </Typography>
            </div>

            <Button
                variant='outlined'
                color='primary'
                size='large'
                startIcon={<ArrowForwardRounded/>}
                onClick={() => goHome()}
            >
                Home page
            </Button>
        </ButtonBase>
    )
}
