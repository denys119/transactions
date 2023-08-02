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

module.exports = {
  deletePerson
}
