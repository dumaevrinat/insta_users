import error from "./error"
import user from "./user"
import search from "./search"
import sets from "./sets"
import tasks from "./tasks"
import viewedAccounts from "./viewedAccounts"

import {combineReducers} from "redux"

export default combineReducers({error, user, search, sets, tasks, viewedAccounts})
