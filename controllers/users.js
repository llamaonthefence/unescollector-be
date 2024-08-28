const Users = require("../models/users");

module.exports = {
    getUser,
    signupUser,
    getSigninDetails,
    signinUser,
    checkSignin,
    checkPermission,
    signoutUser,
    handleLikes,
    handleBeenTo
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

  //handling site "likes"
  async function handleLikes(req, res) {
    try {
      const {userId} = req.params;
      const {siteId} = req.body; 

      console.log(`User ${userId} toggles like for site ${siteId}`)

      const result = await Users.handleLikes(userId, siteId);
      if(!result.success) {
        return res.status(400).json({errorMsg: result.error})   
      }
      res.json({likes: result.data}); 
    } catch (error) {
      console.error(`Error toggling like:`, error.message);
      res.status(500).json({errorMsg: error.message})
    }
  }

    //handling site "likes"
    async function handleBeenTo(req, res) {
      try {
        const {userId} = req.params;
        const {siteId} = req.body; 
  
        console.log(`User ${userId} toggles like for site ${siteId}`)
  
        const result = await Users.handleBeenTo(userId, siteId);
        if(!result.success) {
          return res.status(400).json({errorMsg: result.error})   
        }
        res.json({likes: result.data}); 
      } catch (error) {
        console.error(`Error toggling been-to:`, error.message);
        res.status(500).json({errorMsg: error.message})
      }
    }