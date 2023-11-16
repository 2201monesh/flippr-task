import { useEffect } from "react";


function App() {

  const apiRequest = async () => {
    const apiCall = await fetch("http://api.nobelprize.org/v1/prize.json");
    const data = await apiCall.json();
    console.log(data);
  }
  apiRequest();

  return (
    <div className="App">
      hello
    </div>
  );
}

export default App;
