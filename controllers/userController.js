class UserController {
  // Constructor to inject the User model
  constructor(User) {
    this.User = User;
  }

  // Index function to return "Hello World"
  index(req, res) {
    res.status(200).json({
      status: true,
      message: "Hello World!",
      statusCode: 200,
    });
  }
}

module.exports = UserController;
