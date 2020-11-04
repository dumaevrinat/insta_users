import React, {useState} from "react"
import {makeStyles} from "@material-ui/core/styles"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import {DialogContentText} from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import {v4 as uuidv4} from 'uuid'
import {useDispatch} from "react-redux"
import {addSet} from "../../actions/sets"

const useStyles = makeStyles((theme) => ({
    root: {}
}))

export default function SetCreateDialog({onClose, open}) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [setName, setSetName] = useState('')

    const handleCreateClick = () => {
        const newSet = {
            id: uuidv4(),
            name: setName,
            accounts: []
        }

        dispatch(addSet(newSet))
        setSetName('')
        onClose()
    }

    return (
        <Dialog open={open} onClose={() => onClose()}>
            <DialogTitle>New Set</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Create a new set for adding accounts.
                </DialogContentText>
                <TextField
                    autoFocus
                    fullWidth
                    label="Set name"
                    value={setName}
                    onChange={(event) => setSetName(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => handleCreateClick()} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    )
}
