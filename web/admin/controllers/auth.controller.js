const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { format, addDays, isSameISOWeek, getISOWeek } = require('date-fns');
const { generateAccessToken } = require('../middlewares/auth.middleware');
const models = require('../../../managers/models');

module.exports = {

  // Verify OTP API
  getLogin: async (req, res) => {
    try {
      res.render('a-login', {
        title: "admin",
        error: "Welcome to Login"
      })
    } catch (err) {
      res.render('a-login', {
        title: "admin",
        error: err
      })
    }
  },

  // User Login API
  verifyLogin: async (req, res) => {
    const loginData = {
      email: req.body.email,
      password: req.body.password,
      remember: req.body.remember,
    };

    console.log(loginData)
    try {
      // Check if the mobile number exists in the database
      const userExists = await models.CustomerModel.User.findOne({ email: loginData.email });

      console.log(userExists)

      if (!userExists) {
        return res.redirect(`/admin/auth/login?error=User Not Found${encodeURIComponent(loginData.email)}`);
      }

      // Generate and send OTP
      // const isPasswordValid = await bcrypt.compare(loginData.password, userExists.password);

      // if (!isPasswordValid) {
      //     return res.redirect(`/admin/auth/login?error=Invalid email or password&email=${encodeURIComponent(loginData.email)}`);
      // }

      const token = generateAccessToken(userExists);

      //  Set the token as a cookie or in the response body, depending on your preference
      if (loginData.remember) {
        res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true });
      } else {
        res.cookie('jwt', token, { httpOnly: true });
      }
      res.return = token;

      return res.redirect('/admin/auth/dashboard');

    } catch (error) {
      console.error('Error during login:', error);
      return res.status(StatusCodesConstants.INTERNAL_SERVER_ERROR).json({ status: false, status_code: StatusCodesConstants.INTERNAL_SERVER_ERROR, message: MessageConstants.INTERNAL_SERVER_ERROR, data: {} });
    }
  },

  // User Dashboard API
  getdashboard: async (req, res) => {
    const user = req.user;
    if (!user) {
      res.redirect('/admin/auth/login');
    }



    res.render('admin/dashboard', { user: user, error: "Welcome to Dashboard" });
  },

  getuser: async (req, res) => {
    try {
      const user = req.user;

      if (!user) {
        res.redirect('/admin/auth/login');
      }

      const userId = req.params.userId;

      const customers = await models.CustomerModel.Client.findOne({ _id: userId });
      console.log(customers);

      res.json({ data: customers });

    } catch (error) {
      console.error('Error during getuser:', error);
      res.status(500).send('An error occurred during getuser.');
    }
  },
  // User Logout API
  logout: (req, res) => {
    try {
      // Clear the user session
      const user = req.user;

      res.clearCookie('jwt'); // Clear the JWT cookie

      res.redirect('admin/auth/login')


    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).send('An error occurred during logout.');
    }
  },

  pageNotFound: async (req, res) => {
    const user = req.user;

    console.log(user)
    if (!user) {
      res.redirect('/admin/auth/login');
    }

    res.status(404).render('partials/404', { user }); // Render the pagenotfound.ejs view
  },

  redirecter: async (req, res) => {
    const user = req.user;

    console.log(user);
    if (!user) {
      res.redirect('/admin/auth/login');
    }

    return res.redirect('/admin/auth/dashboard');
  },

}

