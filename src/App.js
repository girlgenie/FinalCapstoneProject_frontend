import Navbar from "./Navbar";
import "./index.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Routes } from "./Routes";

function App() {
  // store data in STATE
  const [equipment, setEquipment] = useState();
  const [createForm, setCreateForm] = useState({
    name: "",
    weight: "",
    max_length: "",
    location: "",
  });

  const [updateForm, setUpdateForm] = useState({
    _id: null,
    name: "",
    weight: "",
    max_length: "",
    location: "",
  });

  // USE EFFECT
  useEffect(() => {
    fetchEquipment();
  }, []);
  // create a function that catches equipment from database FUNCTIONS
  const fetchEquipment = async () => {
    // fetch Equipment
    const res = await axios.get("http://localhost:3001/equipment");
    console.log(res.data);
    // set to state
    setEquipment(res.data.equipment);
    // console.log(res);
  };

  const updateCreateFormField = (e) => {
    const { name, value } = e.target;
    setCreateForm({
      ...createForm,
      [name]: value,
    });
    console.log({ name, value });
  };

  const createEquipment = async (e) => {
    e.preventDefault();

    console.log("create equipment", createForm);
    // create Equipment
    const res = await axios.post("http://localhost:3001/equipment", createForm);
    console.log(res);

    // Update State
    setEquipment([...equipment, res.data.equipment]);

    // clear form State to clear the fields
    setCreateForm({
      name: "",
      weight: "",
      max_length: "",
      location: "",
      _id: null,
    });
  };

  //==== DELETE EQUIPMENT FUNCTION
  const deleteEquipment = async (_id) => {
    // delete equipment
    const res = await axios.delete(`http://localhost:3001/equipment/${_id}`);
    console.log(res);
    const newEquipment = [...equipment].filter((equipment) => {
      return equipment._id !== _id;
    });
    setEquipment(newEquipment);
  }; // update state

  //====HANDLE UPDATE FIELD CHANGE FUNCTION
  // if you run into an issue check this code for handleUpdateFieldChange below
  const handleUpdateFieldChange = (e) => {
    const { value, name } = e.target;
    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  // TOGGLE UPDATE FUNCTION
  const toggleUpdate = (Equipment) => {
    // get current equipment values
    console.log(Equipment);
    // set state on update form
    setUpdateForm({
      //this was originally  set to setEquipment
      name: Equipment.name,
      weight: Equipment.weight,
      max_length: Equipment.max_length,
      location: Equipment.location,
      _id: Equipment._id,
    });
  };

  // UPDATE EQUIPMENT FUNCTION
  const updateEquipment = async (e) => {
    e.preventDefault();
    const { name, weight, max_length, location, _id } = updateForm;
    console.log(updateForm._id);
    // send update request
    const res = await axios.put(
      `http://localhost:3001/equipment/${updateForm._id}`,
      {
        name,
        weight,
        max_length,
        location,
        _id,
      }
    );
    // update state
    const newEquipments = [...equipment];
    const equipmentIndex = newEquipments.findIndex((equipment) => {
      return equipment._id === updateForm._id;
    });

    newEquipments[equipmentIndex] = res.data.equipment;
    setEquipment(newEquipments);

    //Clear update form state
    setUpdateForm({
      name: "",
      weight: "",
      max_length: "",
      location: "",
      _id: null,
    });

    // ===== rendered code below here=============
  };
  return (
    <div className="App">
      <Navbar />

      <div className="create-equipment">
        <h2>Equipment Listing</h2>
        {/* <Button variant="primary">Primary</Button>{" "} */}
        {!updateForm._id && (
          <div>
            <h2>Create Equipment</h2>
            <form onSubmit={createEquipment}>
              <textarea
                placeholder="Equipment Name:"
                onChange={updateCreateFormField}
                value={createForm.name}
                name="name"
              ></textarea>
              <textarea
                placeholder="Weight:"
                onChange={updateCreateFormField}
                value={createForm.weight}
                name="weight"
              />
              <textarea
                placeholder="Max-Length:"
                onChange={updateCreateFormField}
                value={createForm.max_length}
                name="max_length"
              />
              <textarea
                placeholder="Location:"
                onChange={updateCreateFormField}
                value={createForm.location}
                name="location"
              />
              <span className="submit-button"></span>
              <Button
                className="create-equipment-button "
                variant="primary"
                type="submit"
              >
                Create Equipment
              </Button>
            </form>
          </div>
        )}
        {updateForm._id && (
          <div>
            <h2> Update Equipment</h2>
            <form onSubmit={updateEquipment}>
              <textarea
                onChange={handleUpdateFieldChange}
                value={updateForm.name}
                name="name"
              />
              <textarea
                onChange={handleUpdateFieldChange}
                value={updateForm.weight}
                name="weight"
              />
              <textarea
                onChange={handleUpdateFieldChange}
                value={updateForm.max_length}
                name="max_length"
              />
              <textarea
                onChange={handleUpdateFieldChange}
                value={updateForm.location}
                name="location"
              />
              <Button variant="warning" type="submit">
                Update Equipment
              </Button>
            </form>
          </div>
        )}
        <Card>
          {equipment ? (
            equipment.map((equipment) => {
              return (
                <div key={equipment._id}>
                  <Card.Body>
                    <Card.Title>{equipment.name}</Card.Title>
                    <Card.Text>
                      <p>Weight: {equipment.weight}</p>
                      <p>Max Length: {equipment.max_length}</p>
                      <p>Location: {equipment.location}</p>
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => toggleUpdate(equipment)}
                    >
                      Update Equipment
                    </Button>
                    <span className="button-span" />
                    <Button
                      variant="danger"
                      onClick={() => deleteEquipment(equipment._id)}
                    >
                      Delete Equipment
                    </Button>
                  </Card.Body>
                </div>
              );
            })
          ) : (
            <div>No equipment available.</div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default App;

//  QUESTIONS TO ASK ABOUT PROJECT =====================================

//RESOURCE: https://www.youtube.com/watch?v=jjuXRSb1UT8&list=PL-LRDpVN2fZA-1igOQ6PDcqfBjS-vaC7w&index=2

// shows as deleted in rendered screen but not in database

// stopped at 21:50 video 2
