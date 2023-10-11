import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route,  Routes} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import ViewReminder from './components/ViewReminder';
import ModifyReminder from './components/ModifyReminder';
import DisableReminder from './components/DisableReminder';
import EnableReminder from './components/EnableReminder';
import DeleteReminder from './components/DeleteReminder';
import AddNote from './components/AddNote';

function App() {
  
  return (
    <>
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert message="React Course" />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/login" element={<Login />}/>
            <Route exact path="/signup" element={<Signup/>}/>
            <Route exact path="/set-reminder" element={<AddNote/>}/>
            <Route exact path="/view-all-reminders" element={<ViewReminder/>}/>
            <Route exact path="/modify-reminders" element={<ModifyReminder/>}/>
            <Route exact path="/disable-reminders" element={<DisableReminder/>}/>
            <Route exact path="/enable-reminders" element={<EnableReminder/>}/>
            <Route exact path="/delete-reminders" element={<DeleteReminder/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
