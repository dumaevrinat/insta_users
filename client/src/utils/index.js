export const isTaskStop = (task) => {
    if (task) {
        return !task.isWorking
    } else {
        return true
    }
}

export const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const union = (setA, setB) => {
    const newSet = [...setA, ...setB]
    return [...new Map(newSet.map(account => [account.node.id, account])).values()]
}

export const intersection = (setA, setB) => {
    return setA.filter(a => setB.some(b => b.node.id === a.node.id))
}

export const subtraction = (setA, setB) => {
    return setA.filter(a => !setB.some(b => b.node.id === a.node.id))
}
