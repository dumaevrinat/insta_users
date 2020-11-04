import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import DialogContent from "@material-ui/core/DialogContent"
import {DialogContentText} from "@material-ui/core"
import ListSubheader from "@material-ui/core/ListSubheader"

const useStyles = makeStyles((theme) => ({
    root: {}
}))

export default function SetSelectDialog({sets, onClose, open}) {
    const classes = useStyles()

    const handleListItemClick = (value) => {
        onClose(value)
    }

    return (
        <Dialog open={open} onClose={() => onClose()}>
            <DialogTitle>Set</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Select the set to which you want to add accounts.
                </DialogContentText>
                <List
                    disablePadding
                    subheader={<ListSubheader disableGutters>Account sets</ListSubheader>}
                >
                    {sets.map((set) => (
                        <ListItem button onClick={() => handleListItemClick(set)} key={set.id}>
                            <ListItemText primary={set.name} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    )
}
