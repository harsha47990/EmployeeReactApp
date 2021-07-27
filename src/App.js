//import './App.css';
import Default from "./Default";
import Login from "./Login";
import AddItem from "./AddItem";
import EditRecord from './EditRecord';
import { Route, Link, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div>
      < BrowserRouter >
      <div>
         <ul style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
            <li>
               <Link to="/">Home</Link>
            </li>
            <li>
               <Link to="/AddItem">AddItem</Link>
            </li>
         </ul>
         <Route exact path="/" component={Default} />
         <Route path="/AddItem" component={AddItem} />
         <Route path="/EditRecord" component={EditRecord} />
      </div>
   </ BrowserRouter >
    </div>
  );
}

export default App;
