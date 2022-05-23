import './App.css';
import { Navbar, Header, Swap } from './components';

function App() {
  return (
    
    <div className="min-h-full flex flex-col space-y-4">
      <Navbar />
     
      <Swap />

      <div className="absolute w-full bottom-0 bg-slate-400 p-4 md:flex md:items-center md:justify-between md:p-6 ">
          <p className="text-sm text-gray-500 dark:text-gray-900">© 2022 <a href="https://www.linkedin.com/in/hamza-maarouf-4115471a0/" className="hover:underline" rel="noreferrer" target="_blank">Hamza Maarouf</a>. All Rights Reserved.
          </p>
      </div>
    </div>
  );
}

export default App;
