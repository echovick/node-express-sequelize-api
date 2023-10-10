const User = require("../models/user");

class UserController {
  // Constructor to inject the User model
  constructor(User) {
    this.User = User;
  }

  // Register function
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      // const token = generateToken(user);
      // res.cookie("token", token, { httpOnly: true });
      res.status(201).json({ 
        status: true,
        message: "Registration Successful",
        statusCode: 201,
        data: user 
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Login function
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
  
      // Check if email/user exists
      if(!user){
        res.status(401).json({ 
          status: false,
          message: "User does not exist on our database",
          statusCode: 401
        });
      }

      // Check if passwords match
      if (user.password !== password) {
        res.status(401).json({ 
          status: false,
          message: "Incorrect password",
          statusCode: 401
        });
      }

      // Add restriction based on user role
      // if(user.role !== "gm"){
      //   res.status(401).json({ 
      //     status: false,
      //     message: "Non management staff, cannot access this dashboard",
      //     statusCode: 401
      //   });
      // }

      var otherData;
  
      // const token = generateToken(user);
      // res.cookie("token", token, { httpOnly: true });
      if(user.role === "gm"){
        otherData = [
          { 
            name: "Jon Doe",
            salary: "100,000",
          },
          {
            name: "Jane Doe",
            salary: "200,000",
          }
        ];
      }else if(user.role === "accountant"){
        otherData = [
          {
            name: "Purchase of Equipments",
            salary: "100,000",
          },
          {
            name: "JPayment of September Salary",
            salary: "200,000,000",
          }
        ];
      }

      res.status(200).json({ 
        status: true,
        message: "Login Successful",
        statusCode: 200,
        data: user,
        otherData: otherData
      });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = UserController;
