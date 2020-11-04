import React, {useEffect, useState} from "react"
import {makeStyles} from "@material-ui/core/styles"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import {DialogContentText} from "@material-ui/core"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import {useDispatch, useSelector} from "react-redux"
import {v4 as uuidv4} from "uuid"
import {addSet} from "../../actions/sets"
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import FormHelperText from "@material-ui/core/FormHelperText"
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"
import {intersection, subtraction, union} from "../../utils"

const useStyles = makeStyles((theme) => ({
    root: {},
    content: {
        display: 'flex',
        flexDirection: 'column'
    },
    control: {
        marginTop: theme.spacing(4),
    }
}))

export default function SetOperationsDialog({onClose, open}) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const sets = useSelector(state => state.sets.sets)

    const [setName, setSetName] = useState('')
    const [selectedSets, setSelectedSets] = useState(sets.map(set => ({...set, select: false})))
    const [operation, setOperation] = useState('union')

    const error = selectedSets.filter((set) => set.select).length !== 2

    useEffect(() => {
        const newSets = sets.map(set => {
            const selectedSet = selectedSets.find(s => s.id === set.id)

            return {
                ...set,
                select: selectedSet ? selectedSet.select : false
            }
        })

        setSelectedSets(newSets)
    }, [sets])

    const getAccounts = (operation, setA, setB) => {
        switch (operation) {
            case 'union':
                return union(setA, setB)
            case 'intersection':
                return intersection(setA, setB)
            case 'subtraction':
                return subtraction(setA, setB)
            default:
                return []
        }
    }

    const handleCreateClick = () => {
        if (!error) {
            const newSet = {
                id: uuidv4(),
                name: setName,
                accounts: getAccounts(operation, ...selectedSets.filter((set) => set.select).map(set => set.accounts))
            }

            dispatch(addSet(newSet))
            setSetName('')
            onClose()
        }
    }

    const handleChange = (event) => {
        setSelectedSets(selectedSets.map(set =>
            set.id === event.target.value ? {
                ...set,
                select: event.target.checked
            } : set)
        )
    }

    return (
        <Dialog open={open} onClose={() => onClose()}>
            <DialogTitle>Set Operations</DialogTitle>
            <DialogContent className={classes.content}>
                <DialogContentText>
                    Create a new set using operations and other sets of accounts.
                </DialogContentText>

                <TextField
                    autoFocus
                    fullWidth
                    label="Set name"
                    value={setName}
                    onChange={(event) => setSetName(event.target.value)}
                />

                <FormControl className={classes.control} component="fieldset">
                    <FormLabel component="legend">Operation</FormLabel>
                    <RadioGroup value={operation} onChange={(event) => setOperation(event.target.value)}>
                        <FormControlLabel value="union" control={<Radio color='primary'/>} label="Union"/>
                        <FormControlLabel value="intersection" control={<Radio color='primary'/>} label="Intersection"/>
                        <FormControlLabel value="subtraction" control={<Radio color='primary'/>} label="Subtraction"/>
                    </RadioGroup>
                </FormControl>

                <FormControl className={classes.control} component='fieldset'>
                    <FormLabel>Account sets</FormLabel>

                    <FormGroup>
                        {selectedSets.map(set =>
                            <FormControlLabel
                                key={set.id}
                                control={
                                    <Checkbox
                                        color='primary'
                                        checked={set.select}
                                        onChange={(event) => handleChange(event)}
                                        value={set.id}
                                    />
                                }
                                label={set.name}
                            />
                        )}
                    </FormGroup>
                    <FormHelperText error={error}>Pick two sets</FormHelperText>
                </FormControl>
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
