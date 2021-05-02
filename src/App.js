import { useState } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Aloitus from './components/Aloitus';
import LisaaTuloja from './components/LisaaTuloja';
import LisaaMenoja from './components/LisaaMenoja';



function App() {

  const [tulot, setTulot] = useState(0);

  const [menot, setMenot] = useState(0);

  const [saastot, setSaastot] = useState(0);

  return (

    <Router basename={process.env.PUBLIC_URL}>

      <Route path='/' exact>
        <Aloitus tulot={tulot} setTulot={setTulot} menot={menot} setMenot={setMenot} saastot={saastot} setSaastot={setSaastot}/>
      </Route>

      <Route path='/tulot'>
        <LisaaTuloja tulot={tulot} setTulot={setTulot} menot={menot} setMenot={setMenot}/>
      </Route>

      <Route path='/menot'>
        <LisaaMenoja tulot={tulot} setTulot={setTulot} menot={menot} setMenot={setMenot}/>
      </Route>

    </Router>

  );
}

export default App;
