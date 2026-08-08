import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const registerUser = async (
  request,
  response,
  next
) => {
  try {
    const {
      name,
      email,
      password,
    } = request.body;

    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      response.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (!user) {
      response.status(400);
      throw new Error('Invalid user data');
    }

    generateToken(response, user._id);

    response.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    next(error);
  }
};

const authUser = async (
  request,
  response,
  next
) => {
  try {
    const {
      email,
      password,
    } = request.body;

    const user = await User.findOne({
      email,
    });

    if (
      user &&
      (await user.matchPassword(password))
    ) {
      generateToken(response, user._id);

      return response.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    }

    response.status(401);

    throw new Error(
      'Invalid email or password'
    );
  } catch (error) {
    next(error);
  }
};

export {
  registerUser,
  authUser,
};