import React from 'react';
import {ThemeProvider} from 'styled-components'
import {Switch,Route} from 'react-router-dom'
// import Navs from './components/Navs'
import Home from './pages/Home';
import Show from './pages/Show';
import Starred from './pages/Starred';

const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/starred'>
        <Starred/>
      </Route>
      <Route exact path="/show/:id">
        <Show />
      </Route>
      <Route>
        <>
        ERROR404: Page Not Found
        </>
      </Route>
    </Switch>
    </ThemeProvider>
  );
}

export default App;
