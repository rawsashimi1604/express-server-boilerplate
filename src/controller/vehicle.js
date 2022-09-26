function handleIndex(req, res) {
  res.send("Vehicle route...");
}

async function handleAllVehicles(req, res) {
  // Database object passed from middleware...
  const database = res.locals.database;
  const queryRes = await database.relations.vehicle.getAllVehicles();
  res.status(200).send(queryRes.rows);
}

export default {
  handleIndex,
  handleAllVehicles,
};
