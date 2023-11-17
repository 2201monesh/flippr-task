import { useEffect } from "react";


function App() {

  const getData = async () => {
    const url = await fetch("http://api.nobelprize.org/v1/prize.json");
    const response = await url.json();
    console.log(data);
  }
  
  useEffect(() => {
    getData()
  }, []);

  return (
    <div className="App">
      hello
    </div>
  );
}

export default App;
