const { deletePerson } = require("../datastore/person");

async function handleDeletePerson(personId) {
  try {
    const person = await deletePerson(personId);
    return person;  
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  handleDeletePerson
}