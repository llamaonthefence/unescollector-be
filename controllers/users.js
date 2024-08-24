const Users = require("../models/users");

module.exports = {
    getUser,
    signupUser,
    getSigninDetails,
    signinUser,
    checkSignin,
    checkPermission,
    signoutUser
  }
  
  async function getUser(req, res) {
    try {
      const { user_id } = req.params;
      console.log('Fetching user for user_id:', user_id); // Log user_id to check if it's coming through correctly
      const data = await Users.getUser(user_id);
      if (!data) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ user: data });
    } catch (err) {
      console.error('Error fetching user:', err.message); // Log detailed error message
      res.status(500).json({ errorMsg: err.message });
    }
  }
  
  async function signupUser(req, res) {
      try {
        const user = await Users.signupUser(req.body);
        // const profile = await Profiles.new(user.id);
        // const job = await Jobs.new(user.id);
        
        // res.json({ user, profile, job });
        res.json({ user });
      } catch (err) {
        console.log(err);
        res.status(500).json({ err });
      }
  }
  
  async function getSigninDetails(req, res) {
    try {
        const signinDetails = await Users.getSigninDetails(req.query);
        if (signinDetails.success != true) {
          res.status(400).json({errorMsg: signinDetails.error})
          return
        }
        res.json(signinDetails.data)
    } catch (err) {
        res.status(500).json({ errorMsg: err.message });
    }
  }
  
  async function signinUser(req, res) {
    try {
        const token = await Users.signinUser(req.body);
        console.log(token);
        if (!token.success) {
          res.status(400).json({errorMsg: token.error})
          return 
        }
        res.json(token.data)
    } catch (err) {
        res.status(500).json({ errorMsg: err.message });
    }
  }
  
  function checkSignin (req, res) {
    res.json({user: req.user});
  }
  
  function checkPermission (req, res) {
    res.json({user: req.user, body: req.body.email});
  }
  
  async function signoutUser(req, res) {
    try {
        const result = await Users.signoutUser(req.body);
        if (!result.success) {
          res.status(400).json({errorMsg: result.error})
          return 
        }
        res.json(result.data)
    } catch (err) {
        res.status(500).json({ errorMsg: err.message });
    }
  }