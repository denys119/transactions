const { deletePerson, createPerson, updatePerson } = require("../datastore/person");

async function handleDeletePerson(personId) {
  try {
    const person = await deletePerson(personId);
    return person;  
  } catch (error) {
    console.error(error);
  }
}

async function handleCreatePerson(name) {
  try {
    const person = await createPerson(name);
    return person;  
  } catch (error) {
    console.error(error);
  }
}

async function handleUpdatePerson(personId, name, text) {
  try {
    const person = await updatePerson(personId, name, text);
    return person;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  handleDeletePerson,
  handleCreatePerson,
  handleUpdatePerson
}