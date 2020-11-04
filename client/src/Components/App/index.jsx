import React, {useState} from 'react'
import {Provider} from "react-redux"
import store from "../../store"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import NotFoundPage from "../Pages/NotFoundPage"
import UserPage from "../Pages/UserPage"
import Header from "../Header"
import {createMuiTheme, responsiveFontSizes, Toolbar, useMediaQuery} from "@material-ui/core"
import {ThemeProvider} from "@material-ui/styles"
import Context from "../../context"
import NavDrawer from "../NavDrawer"
import TasksPage from "../Pages/TasksPage"
import SetsPage from "../Pages/SetsPage"
import {makeStyles} from "@material-ui/core/styles"
import HomePage from "../Pages/HomePage"
import Container from "@material-ui/core/Container"

const customTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#304ffe',
            light: '#7b7cff',
            dark: '#0026ca'
        },
        secondary: {
            main: '#1de9b6',
            light: '#1de9b6',
            dark: '#00b686'
        },
        background: {
            light: '#f1f3f4'
        }
    },
    typography: {
        fontFamily: [
            'Poppins',
            'Helvetica',
            'Arial',
            'sans-serif',
        ].join(','),
    },
})

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        display: 'flex',
        flexGrow: 1,
    },
    page: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2)
    }
}))

export default function App() {
    const classes = useStyles()

    const isMobile = useMediaQuery(customTheme.breakpoints.down("sm"), {
        noSsr: true
    })

    const [isOpenMenu, setIsOpenMenu] = useState(() => !isMobile)

    const toggleMenu = () => {
        setIsOpenMenu(!isOpenMenu)
    }

    return (
        <Provider store={store}>
            <ThemeProvider theme={responsiveFontSizes(customTheme)}>
                <Context.Provider value={{toggleMenu}}>
                    <BrowserRouter basename={process.env.PUBLIC_URL}>
                        <div className={classes.root}>
                            <Header/>

                            <Toolbar/>

                            <div className={classes.content}>
                                <NavDrawer isOpenMenu={isOpenMenu} isMobile={isMobile}/>

                                <Container maxWidth="md" className={classes.page}>
                                    <Switch>
                                        <Route path='/' exact component={HomePage}/>
                                        <Route path='/notfound' component={NotFoundPage}/>
                                        <Route path='/u/:username' component={UserPage}/>
                                        <Route path='/tasks' component={TasksPage}/>
                                        <Route path='/sets' component={SetsPage}/>
                                    </Switch>
                                </Container>
                            </div>
                        </div>
                    </BrowserRouter>
                </Context.Provider>
            </ThemeProvider>
        </Provider>
    )
}
