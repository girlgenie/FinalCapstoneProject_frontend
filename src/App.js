import { useEffect, useState } from "react";
import axios from "axios";


function App() {
// store data in state
const [equipment, setEquipment]= useState(null); 
const [createForm, setCreateForm] = useState({
  name: '', 
    weight: '', 
    max_length: '', 
    location: '',
})


useEffect(()=> { 
fetchEquipment(); 
}, [])
// create a function that catches equipment from database 
const fetchEquipment = async () => { 
  // fetch Equipment 
const res = await axios.get('http://localhost:3001/equipment'); 
// set to state 
// console.log(res);
setEquipment(res.data.equipment);
// console.log(res); 
};

  return (
    <div className="App">
      <div>
        <h2>Equipment:</h2>
       {equipment && equipment.map(equipment => { 
        return <div key={equipment._id}>
          <h3>{equipment.name}</h3>
        </div>
       })}

      </div>
      <div>
        <h2>Create Equipment</h2>
        <form>
          <input value={createForm.name}   name="name"></input>
          <textarea value={createForm.weight}  name="weight"/>
          <textarea value={createForm.max_length}  name="max-length"/>
          <textarea value={createForm.location}  name="location"/>


          <button type="submit">Create Equipment</button>

        </form>
      </div>
    </div>
  );
}

export default App;
