const mssql = require('mssql');
const connectionToDB = require('./connectToDB');
const appPool = connectionToDB.appPool;


//============================ Register New User ====================================
const registerUserStoredProcedure = async (userData) => {
    let myConnectionPoolToDB = await appPool.connect();
    try {
        let results = await myConnectionPoolToDB.request()
            .input("fname", mssql.NVarChar(100), userData.fname)
            .input("lname", mssql.NVarChar(100), userData.lname)
            .input("phone", mssql.NVarChar(15), userData.phone)
            .input("email", mssql.NVarChar(100), userData.email)
            .input("gender", mssql.NVarChar(10), userData.gender)
            .input("cardDescription", mssql.NVarChar(500), userData.cardDescription)
            .input("ezor", mssql.NVarChar(100), userData.ezor)
            .input("hashed_password", mssql.NVarChar(255), userData.hashed_password)
            .execute("spRegisterUser");

        return results.recordset[0];
    } catch (err) {
        console.error("Error executing stored procedure:", err);
        throw err;
    }
};
module.exports.registerUserStoredProcedure = registerUserStoredProcedure;

// Check if user exists
const checkIfUserExists = async (email) => {
    let myConnectionPoolToDB = await appPool.connect();

    let results = await myConnectionPoolToDB.request()
        .input('email', mssql.NVarChar(100), email)
        .execute('CheckIfUserExists');
    return results.recordset[0].count > 0; // Use results here
};
module.exports.checkIfUserExists = checkIfUserExists;

//============================Login User====================================


const getUserByEmailStoredProcedure = async (email) => {
    try {
        const result = await appPool.request()
            .input('email', mssql.NVarChar(100), email)
            .execute('spGetUserByEmail'); // Stored procedure to fetch user by email

        console.log("Stored procedure result:", result.recordset); // Add this line
        return result.recordset[0]; // Return the user object (or undefined if not found)
    } catch (error) {
        console.error("Error executing stored procedure for login:", error);
        throw error;
    }
};

module.exports.getUserByEmailStoredProcedure = getUserByEmailStoredProcedure;

//==============================GET ALL users==================================

const getAllUsersStoredProcedure = async () => {
    try {
        console.log("Executing spGetAllUsers...");
        const result = await appPool.request() // No input parameters
            .execute('spGetAllUsers');
        console.log("Fetched users:", result.recordset);
        return result.recordset;
    } catch (error) {
        console.error("Error in getAllUsersStoredProcedure:", error);
        throw error;
    }
};
module.exports.getAllUsersStoredProcedure = getAllUsersStoredProcedure;



//======================Fetch all unique ezor values=======================

const getUniqueEzorsStoredProcedure = async () => {
    const pool = await connectionToDB.appPool.connect();
    try {
        const result = await pool.request().execute('spGetUniqueEzors');
        return result.recordset; // Return the fetched ezor values
    } catch (error) {
        console.error("Error executing spGetUniqueEzors:", error);
        throw error;
    }
};

module.exports.getUniqueEzorsStoredProcedure = getUniqueEzorsStoredProcedure;

//==========================Get Person By Id=============================

const getPersonByIdStoredProcedure = async (id) => {
    const pool = await connectionToDB.appPool.connect();
    try {
        const result = await pool.request()
            .input('id', mssql.Int, id)
            .execute('spGetPersonById'); // Call the stored procedure
        return result.recordset[0]; // Return the single person object
    } catch (error) {
        console.error('Error executing spGetPersonById:', error);
        throw error;
    }
};
module.exports.getPersonByIdStoredProcedure = getPersonByIdStoredProcedure;


//==========================Get User Profile By Id=============================

const getUserProfileStoredProcedure = async (id) => {
    const pool = await connectionToDB.appPool.connect();
    try {
        const result = await pool.request()
            .input('id', mssql.Int, id)
            .execute('spGetUserProfile');
        return result.recordset[0]; // Return user data
    } catch (error) {
        console.error('Error executing spGetUserProfile:', error);
        throw error;
    }
};
module.exports.getUserProfileStoredProcedure = getUserProfileStoredProcedure;


//==========================Update User Info=============================

const updateUserProfileStoredProcedure = async (userInfo) => {
    const { id, fname, lname, gender, ezor, cardDescription, phone } = userInfo;
    const pool = await connectionToDB.appPool.connect();
    try {
        await pool.request()
            .input('id', mssql.Int, id)
            .input('fname', mssql.NVarChar(255), fname)
            .input('lname', mssql.NVarChar(255), lname)
            .input('gender', mssql.NVarChar(10), gender)
            .input('ezor', mssql.NVarChar(255), ezor)
            .input('cardDescription', mssql.NVarChar(500), cardDescription)
            .input('phone', mssql.NVarChar(255), phone)
            .execute('spUpdateUserProfile');
    } catch (error) {
        console.error('Error executing spUpdateUserProfile:', error);
        throw error;
    }
};
module.exports.updateUserProfileStoredProcedure = updateUserProfileStoredProcedure;






















//============================ DELETE user ====================================

// const deleteUsingStoredProcedure = async (theId) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let myConnectionPoolToDB = await appPool.connect()
//             try {
//                 let results = await myConnectionPoolToDB.request()
//                     .input('id', mssql.Int, theId)
//                     .execute('deleteUserById')

//                 console.log(results);
//                 resolve(results);
//             }
//             catch (err) {
//                 console.log("there was an error while sending query to DB ", err);
//                 reject(err);
//             }
//         }
//         catch (err) {
//             console.error('ERROR CONNECTION TO DB: ', err);
//             reject('ERROR CONNECTION TO DB: ', err);
//         }
//     })
// }

// module.exports.deleteUsingStoredProcedure = deleteUsingStoredProcedure;

// //============================ UPDATE user ==============================

// const updateUser = async (id, fname, lname, ezor) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let myConnectionPoolToDB = await appPool.connect()
//             try {
//                 let results = await myConnectionPoolToDB.request()
//                     .input('id', mssql.Int, id)
//                     .input('fname', mssql.VarChar, fname)
//                     .input('lname', mssql.VarChar, lname)
//                     .input('ezor', mssql.VarChar, ezor)
//                     .execute('updateUser')

//                 console.log(results);
//                 resolve(results);
//             }
//             catch (err) {
//                 console.log("there was an error while sending query to DB ", err);
//                 reject(err);
//             }
//         }
//         catch (err) {
//             console.error('ERROR CONNECTION TO DB: ', err);
//             reject('ERROR CONNECTION TO DB: ', err);
//         }
//     })
// }

// module.exports.updateUser = updateUser;



// //============================ Get user By Id ==============================

// const getUserById = async (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let myConnectionPoolToDB = await appPool.connect()
//             try {
//                 let results = await myConnectionPoolToDB.request()
//                     .input('id', mssql.Int, id)
//                     .execute('getUserById')

//                 console.log(results);
//                 resolve(results);
//             }
//             catch (err) {
//                 console.log("there was an error while sending query to DB ", err);
//                 reject(err);
//             }
//         }
//         catch (err) {
//             console.error('ERROR CONNECTION TO DB: ', err);
//             reject('ERROR CONNECTION TO DB: ', err);
//         }
//     })
// }

// module.exports.getUserById = getUserById;




//===========================================================================