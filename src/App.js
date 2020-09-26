import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Games } from './pages/Games';
import CssBaseline from '@material-ui/core/CssBaseline';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider } from 'styled-components';
import { Container } from '@material-ui/core';
import { AppHeader } from './partials/AppHeader';
import { Home } from './pages/Home';
import { AudioProvider } from './common/AudioProvider';

const theme = createMuiTheme();

function App() {
    return (
        <Router>
            <ThemeProvider theme={ theme }>
                <CssBaseline/>
                <AppHeader/>
                <Container>
                    <Switch>
                        <Route path="/" exact={true}><Home/></Route>
                        <Route path="/games">
                            <Games/>
                        </Route>
                    </Switch>
                </Container>
            </ThemeProvider>
        </Router>
    );
}

export default App;
