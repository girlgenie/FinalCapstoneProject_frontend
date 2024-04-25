import { useEffect, useState } from "react";

const Equipment = () => {
  const [equipment, setEquipment] = useState(null);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch("http://localhost:3000/equipment");
        if (!response.ok) {
          throw new Error("Failed to fetch equipment");
        }
        const json = await response.json();
        console.log(json);
        setEquipment(json);
      } catch (error) {
        console.error("Error fetching equipment:", error);
      }
    };

    fetchEquipment(); // Call the function here
  }, []); // Empty dependency array to run only once when component mounts

  return (
    <div className="equipment">
      {equipment && (
        <div>
          {equipment.map((item) => (
            <p key={item._id}>
              {item.name}
              {item.weight}
              {item.max_length}
              {item.location}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Equipment;
