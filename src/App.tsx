import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TelaDespesas from './app/TelaDespesas';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/despesas/:anoMes"}>
          <TelaDespesas />
        </Route> 
      </Switch>
      
    </BrowserRouter>
    
  );
}

export default App;
