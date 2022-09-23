function handleIndex(req, res) {
  res.send("Type route...");
}

async function handleAllTypes(req, res) {
  // Database object passed from middleware...
  const database = res.locals.database;
  const queryRes = await database.relations.type.getAllTypes();
  res.status(200).send(queryRes.rows);
}

export default {
  handleIndex,
  handleAllTypes,
};
