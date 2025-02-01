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
            .execute('spGetUserByEmail');

        return result.recordset[0]; // Ensure this returns { id, email, hashed_password }
    } catch (error) {
        console.error("Error executing spGetUserByEmail:", error);
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
            .query("SELECT id, fname, lname, email, gender, ezor, cardDescription FROM registrars WHERE id = @id");

        return result.recordset[0]; // Return the first matching user
    } catch (error) {
        console.error("Error fetching user by ID:", error);
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

const updateUserProfileStoredProcedure = async (id, updates) => {
    const pool = await connectionToDB.appPool.connect();
    try {
        let query = "UPDATE registrars SET ";
        let params = [];
        let index = 1;

        for (const key in updates) {
            if (updates[key] !== null && updates[key] !== undefined) {
                query += `${key} = @param${index}, `;
                params.push({ name: `param${index}`, type: mssql.NVarChar, value: updates[key] });
                index++;
            }
        }

        query = query.slice(0, -2); // Remove last comma
        query += " WHERE id = @userId";

        let request = pool.request();
        request.input("userId", mssql.Int, id);
        params.forEach(param => request.input(param.name, param.type, param.value));

        const result = await request.query(query);
        return result;
    } catch (error) {
        console.error("Error updating user profile:", error);
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