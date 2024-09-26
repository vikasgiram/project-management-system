
import AllRoutes from './AllRoutes';
import {Toaster} from 'react-hot-toast'
import './App.css';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <>
      <UserProvider>
        <AllRoutes />
        <Toaster/>
      </UserProvider>
    </>
  );
}

export default App;
