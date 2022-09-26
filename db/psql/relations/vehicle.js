import db from "../config.js";

function getAllVehicles() {
  try {
    const query = "SELECT * FROM vehicle";
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getAllVehicles };
