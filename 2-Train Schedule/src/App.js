import { useState, useEffect} from 'react';
import axios from 'axios';
import TrainData from './TrainData';

function App() {
  const [data,setdata] = useState([])
  useEffect(() => {
    axios.get("http://localhost:8000/").then((res) => {
      setdata(res.data);
    });
  }, []);
  return (
    <div className="App">
        <TrainData/>
    </div>
  );
}

export default App;
