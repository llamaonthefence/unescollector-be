const commentsDao = require("../daos/comments");

module.exports = {
    getComments,
    createComment,
    findOneAndUpdate,
    findOneAndDelete,
    getUserComments
}

//possibly to query comments based on site_id
function getComments(queryFields) {
    return commentsDao.find(queryFields); 
}

async function createComment(body) {
    console.log("Model request body (comment):", body)
    
    const data = await commentsDao.findOne({comment_id: body.comment_id});
    console.log(data)

    if(data) {
        return {success: false, error: "comment already exists"}
    }
    const newComment = await commentsDao.create(body);
    return {success: true, data: newComment}
}

async function findOneAndUpdate(filter, update, options) {
    try {
        const updatedComment = await commentsDao.findOneAndUpdate(filter, update, options);
        return updatedComment;
    } catch (error) {
        console.error("Error updating comment", error); 
        throw error; 
    }
}

async function findOneAndDelete(filter, options) {
    try {
        const deletedComment = await commentsDao.findOneAndDelete(filter, options); 
        return deletedComment;
    } catch (error) {
        console.error("Error deleting comment", error);
        throw error; 
    }
}

//get comments by user_id
async function getUserComments(user_id) {
    return commentsDao.find(user_id)
}