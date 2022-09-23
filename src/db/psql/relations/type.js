import db from "../config.js";

function getAllTypes() {
  try {
    const query = "SELECT * FROM type";
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getAllTypes, };
