import './App.css'

function App() {

  // Accessing enviornment variable
  console.log(import.meta.env.VITE_APPWRITE_URL);
  return (
    <>
      <h1>A blog App</h1>
    </>
  )
}

export default App
