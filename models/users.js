const daoUser = require("../daos/users")
const utilSecurity = require("../utils/security")

module.exports = {
    getUsers,
    getUser,
    getSigninDetails,
    signinUser,
    signupUser,
    signoutUser,
    handleLikes,
    handleBeenTo
  };

function getUsers(queryFields) {
    return daoUser.find(queryFields);
}

async function getUser(queryField) {
  try {
    // Use the `.select()` method to specify the fields you want to return
    const user = await daoUser.findOne({ _id: queryField }).select('firstName lastName email');

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getSigninDetails(queryFields) {
  const signinFields = {
    name : 1,
    salt: 1,
    iterations: 1
  } 
  if (!queryFields.hasOwnProperty("email")){
    return {success: false, error: "missing email"};
  }
  const userEmail = decodeURIComponent(queryFields.email);
  const signinFieldsRes = await daoUser.findOne({"email": userEmail}, signinFields);
  return {success: true, data: signinFieldsRes};
}

async function signinUser(body) {
  if (!body.hasOwnProperty("email")) {
    return {success: false, error: "missing email"};
  }
  if (!body.hasOwnProperty("password")) {
    return {success: false, error: "missing password"};
  }

  const user = await daoUser.findOne({"email": body.email, "password": body.password});
  if (user == null || Object.keys(user).length == 0) {
    return {success: false, error: "Invalid email/password"};
  }
  
  const jwtPayload = {
    user: user._id,
    email: user.email,
    is_admin: user.is_admin
  };
  const token = utilSecurity.createJWT(jwtPayload);
  const expiry = utilSecurity.getExpiry(token);
  await daoUser.updateOne({"email": body.email}, {token: token, expire_at: expiry})
  return {success: true, data: token}
}

async function signupUser(body) {
    const user = await daoUser.findOne({"email": body.email});
    console.log(user);
    if (user) {
      return {success: false, error: "user already exist"};
    }
    const newUser = await daoUser.create(body);
    return {success: true, data: newUser};
}

async function signoutUser(body) {
  if (!body.hasOwnProperty('email')) {
    return {success: false, error: "missing email"};
  }
  await daoUser.updateOne({"email": body.email}, {token: null, expire_at: null});
  return {success: true, data: "signout successful!"};
}

//handling user's liked sites - toggle boolean
async function handleLikes (userId, id) {
  try {
    const user = await daoUser.findById(userId);
    if(!user) {
      return {success: false, error: "User not found"};
    }
    const siteIndex = user.likes.indexOf(id); 
    if(id >= 0) {
      user.likes.splice(siteIndex, 1) // unlike if already liked site
    } else {
      user.likes.push(id); // add to liked sites, if id doesn't alr exist
    }
    await user.save();
    return {success: true, data: user.likes}
  } catch (error) {
    return { success: false, error: error.message } 
  }
}

//handling user's beenTo sites - toggle boolean 
async function handleBeenTo (userId, id) {
  try {
    const user = await daoUser.findById(userId);
    if (!user) {
      return {success: false, error: "User not found"}; 
    }
    const siteIndex = user.beenTo.indexOf(id);
    if (siteIndex >=0) {
      user.beenTo.splice(siteIndex, 1); // remove "beenTo" site if alr exists
    } else {
      user.beenTo.push(id); // add "beenTo" if doesn't alr exist
    }
    await user.save(); 
    return {success: true, data: user.beenTo};
  } catch (error) {
    return {success: false, error: error.message}; 
  }
}