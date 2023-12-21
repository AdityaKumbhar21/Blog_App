import './App.css'
import config from './conf/config';

function App() {

  // Accessing enviornment variable
  console.log(config.appwriteUrl);
  return (
    <>
      <h1>A blog App</h1>
    </>
  )
}

export default App
