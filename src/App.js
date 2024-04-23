import { useEffect, useState } from "react";
import axios from "axios";


function App() {
// store data in STATE
const [equipment, setEquipment]= useState(null); 
const [createForm, setCreateForm] = useState({
  name: '', 
    weight: '', 
    max_length: '', 
    location: '',
})

// USE EFFECT
useEffect(()=> { 
fetchEquipment(); 
}, [])
// create a function that catches equipment from database FUNCTIONS
const fetchEquipment = async () => { 
  // fetch Equipment 
const res = await axios.get('http://localhost:3001/equipment'); 
// set to state 
// console.log(res);
setEquipment(res.data.equipment);
// console.log(res); 
};

const updateCreateFormField = (e) => { 
  const {name,value} = e.target; 
  setCreateForm({
    ...createForm, 
    [name]:value, 

  })
  console.log({name,value})
}

const createEquipment = async (e)=> { 
e.preventDefault(); 


// create Equipment 
const res = await axios.post("http://localhost:3001/equipment", createForm); 
console.log(res)

// Update State
setEquipment([...equipment, res.data.equipment])

// clear form State to clear the fields 
setCreateForm({
  name: '', 
    weight: '', 
    max_length: '', 
    location: '',
})
}

const deleteEquipment = async (_id) => {
  // delete equipment 
  const res = await axios.delete(`http://localhost:3001/equipment/${_id}`)
  console.log(res)
  // update state
  const newEquipment = [...equipment].filter(equipment => { 
    return equipment._id !==_id; 
  })
  setEquipment(newEquipment);

};
  return (
    <div className="App">
      <div>
        <h2>Equipment:</h2>
       {equipment && equipment.map(equipment => { 
        return <div key={equipment._id}>
          <h3>{equipment.name}</h3>
          <button onClick={() => deleteEquipment(equipment._id)} >Delete Equipment</button>
        </div>
       })}

      </div>
      <div>
        <h2>Create Equipment</h2>
        <form onSubmit={createEquipment} >
          <input onChange={updateCreateFormField}  value={createForm.name}   name="name"></input>  
          <textarea onChange={updateCreateFormField} value={createForm.weight}  name="weight"/>
          <textarea onChange={updateCreateFormField} value={createForm.max_length}  name="max-length"/>
          <textarea onChange={updateCreateFormField} value={createForm.location}  name="location"/>


          <button type="submit">Create Equipment</button>

        </form >
      </div>
    </div>
  );
}

export default App;

//I am not able to save state in max length @15mins in video 2 https://www.youtube.com/watch?v=jjuXRSb1UT8&list=PL-LRDpVN2fZA-1igOQ6PDcqfBjS-vaC7w&index=2