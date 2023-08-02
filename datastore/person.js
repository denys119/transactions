const PersonModel = require('../models/person');
const CommentModel = require('../models/comment');

async function deletePerson(personId) {
  const session = await PersonModel.startSession();
  session.startTransaction();
  const opts = { session };  // The options object, including the session

  try {
    const person = await PersonModel.findByIdAndDelete(personId, opts);
    console.log(person);
    await CommentModel.deleteMany({ person: personId }, opts);

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}

async function createPerson(name) {
  console.log(name);
  const session = await PersonModel.startSession();
  session.startTransaction();
  const opts = { session };  // The options object, including the session

  try {
    const person = new PersonModel({ name });
    await person.save(opts);
    console.log(person);

    throw new Error("Test Error");

    const comment = new CommentModel({ person: person._id, text: "Comment 1" });
    await comment.save(opts);

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}

async function updatePerson(personId, newName, newComment) {
  const session = await PersonModel.startSession();
  session.startTransaction();
  try {
    const person = await PersonModel.findById(personId);
    const editedPerson = await PersonModel.findByIdAndUpdate(person._id, { name: newName }, { new: true }).session(session);
    console.log(editedPerson);

    const comment = await CommentModel.findOne({ person: person._id }).session(session);
    const editedComment = await CommentModel.findByIdAndUpdate(comment._id, { text: newComment }, { new: true }).session(session);
    console.log(editedComment);

    throw new Error("Test Error");

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}


module.exports = {
  deletePerson,
  createPerson,
  updatePerson,
  updatePerson
}
