const usersRepository = require('../Database/user-repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//==========================Register User=============================

const registerNewUser = async (req, res) => {
    try {
        const userData = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(userData.password, 12);

        // Check if the user already exists
        const userExists = await usersRepository.checkIfUserExists(userData.email);
        if (userExists) {
            return res.status(400).send("User with this email already exists.");
        }

        // Include hashed password in user data
        userData.hashed_password = hashedPassword; // Correct the variable name

        // Call repository to register user
        const result = await usersRepository.registerUserStoredProcedure(userData);

        if (!result || !result.id) {
            return res.status(500).send("Failed to register user. User ID not returned.");
        }

        // Generate JWT token
        const token = jwt.sign(
            { email: userData.email, id: result.id },  // Payload
            process.env.JWT_SECRET_KEY,     // Store this in `.env` file  // Secret key (should be stored securely)
            { expiresIn: '1h' }                       // Token expiration time
        );

        // Respond with the result and the token
        res.status(201).json({
            message: "User registered successfully",
            token: token,  // Send the token to the frontend
            id: result.id, // Send the user's ID to the frontend

        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Failed to register user.");
    }
};

module.exports.registerNewUser = registerNewUser;



//==========================Login User=============================

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt for:", { email, password });

        // Call the repository to execute the stored procedure
        const user = await usersRepository.getUserByEmailStoredProcedure(email);
        console.log("User fetched from DB:", user);

        if (!user) {
            console.log("No user found with the given email.");
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.Email }, // Ensure user.id exists
            process.env.JWT_SECRET_KEY,             // Secret key
            { expiresIn: '5h' }                 // Expiration
        );

        console.log("Login successful for user:", user.Email, user.id);

        res.status(200).json({ message: "Login successful!", token, id: user.id });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Login failed." });
    }
};

module.exports.loginUser = loginUser;

//==========================GET ALL users=============================

const getAllUsers = async (req, res) => {
    try {
        console.log("Received request for /users/persons...");
        const users = await usersRepository.getAllUsersStoredProcedure();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error in getAllUsers controller:", error);
        res.status(500).json({ message: "Failed to fetch users." });
    }
};
module.exports.getAllUsers = getAllUsers;

//==========================GET UNIQUE EZORS=============================
// Fetch all unique ezor values
const getUniqueEzors = async (req, res) => {
    try {
        const uniqueEzors = await usersRepository.getUniqueEzorsStoredProcedure();
        res.status(200).json(uniqueEzors);
    } catch (error) {
        console.error("Error fetching unique ezors:", error);
        res.status(500).json({ message: "Failed to fetch ezors." });
    }
};

module.exports.getUniqueEzors = getUniqueEzors;

//==========================Get Person By Id=============================

const getPersonById = async (req, res) => {
    const { id } = req.params;
    try {
        const person = await usersRepository.getPersonByIdStoredProcedure(id);
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.status(200).json(person);
    } catch (error) {
        console.error('Error fetching person by ID:', error);
        res.status(500).json({ message: 'Failed to fetch person info' });
    }
};
module.exports.getPersonById = getPersonById;

//==========================Get User Profile By Id=============================
const getUserProfile = async (req, res) => {
    const { id } = req.params;

    // Ensure user ID from token matches the requested profile ID
    if (req.user.id != id) {
        return res.status(403).json({ message: "Access Denied: Unauthorized to access this profile." });
    }

    try {
        const profile = await usersRepository.getUserProfileStoredProcedure(id);

        if (!profile) {
            return res.status(404).json({ message: "profile not found." });
        }

        res.status(200).json(profile);
    } catch (error) {
        console.error("Error fetching profile profile:", error);
        res.status(500).json({ message: "Failed to fetch profile data." });
    }
};

module.exports.getUserProfile = getUserProfile;

//==========================Update User Info=============================

const updateUserProfile = async (req, res) => {
    const { id } = req.params;  // Extract `id` from the URL
    const updates = req.body;    // Data sent from frontend

    console.log("Updating user ID:", id, "with data:", updates);

    if (!id) {
        return res.status(400).json({ message: "User ID is required." });
    }

    try {
        const result = await usersRepository.updateUserProfileStoredProcedure(id, updates);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "User not found or no changes made." });
        }

        res.status(200).json({ message: "Profile updated successfully." });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Failed to update profile." });
    }
};
module.exports.updateUserProfile = updateUserProfile;

















// //=========================DELETE user==============================

// const deleteUserById = async (req, res) => {
//     let x = await usersRepository.deleteUsingStoredProcedure(req.params.idOfCustomer);
//     res.json(x);
// };

// module.exports.deleteUserById = deleteUserById;

// //=========================UPDATE user==============================

// const updateUser = async (req, res) => {
//     let x = await usersRepository.updateUser(req.params.id, req.body.fname, req.body.lname, req.body.ezor);
//     res.json(x);
// };
// module.exports.updateUser = updateUser;

// //=========================GET user by id==============================


// const getUserById = async (req, res) => {
//     let x = await usersRepository.getUserById(req.params.id);
//     res.json(x);
// };
// module.exports.getUserById = getUserById;


