USE ProfessionalsWebDB;
-------------------------Register User-------------------------
-- DROP PROCEDURE [dbo].[spRegisterUser];
CREATE PROCEDURE [dbo].[spRegisterUser]
@fname NVARCHAR(100),
@lname NVARCHAR(100),
@phone NVARCHAR(15),
@Email NVARCHAR(100),
@gender NVARCHAR(10),
@cardDescription NVARCHAR(500),
@ezor NVARCHAR(100),
@hashed_password NVARCHAR(255)
AS
BEGIN
    BEGIN TRY
        INSERT INTO registrars (fname, lname, phone, email, gender, cardDescription, ezor, hashed_password)
        VALUES (@fname, @lname, @phone, @Email, @gender, @cardDescription, @ezor, @hashed_password);
        SELECT SCOPE_IDENTITY() AS id; -- Return the newly created user's id
        
    END TRY
    BEGIN CATCH
        SELECT ERROR_MESSAGE() AS ErrorMessage;
    END CATCH
END;

-- this is to test, exec is for running the procedure
EXEC [dbo].[spRegisterUser] 
   @fname = 'John',
   @lname = 'Doe',
   @phone = '123456789',
   @email = 'johffn@example.com',
   @gender = 'Male',
   @cardDescription = 'Short description',
   @ezor = 'Region 1',
   @hashed_password = 'hashedpassword123'
GO
-------------------------Check if User Exists-------------------------

CREATE PROCEDURE [dbo].[CheckIfUserExists]
@Email NVARCHAR(100)
AS
BEGIN
    SELECT COUNT(*) AS count FROM registrars WHERE email = @Email;
END;
GO

-------------------------GET User By Email for Login-------------------------

CREATE PROCEDURE [dbo].[spGetUserByEmail]
@Email NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    -- Fetch id, email, and hashed password for login validation
    SELECT id, email, hashed_password
    FROM registrars
    WHERE email = @Email;
END


EXEC [dbo].[spGetUserByEmail] 
   @Email = 'test@gmail.com';

-- DROP PROCEDURE [dbo].[spGetUserByEmail];
-------------------------GET All Users-------------------------
-- DROP PROCEDURE [dbo].[spGetAllUsers];
-- DROP PROCEDURE [dbo].[spGetPersonById];

CREATE PROCEDURE [dbo].[spGetAllUsers]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
    id AS id,
        fname AS fname,
        lname AS lname,
        gender AS gender,
        ezor AS ezor,
        cardDescription AS cardDescription
    FROM 
        registrars
    WHERE 
        isActive = 1; -- Optional: Include only active registrars
END;


-- DROP PROCEDURE [dbo].[spGetAllUsers];
EXEC spGetAllUsers;
------------------------------------------------------------------

SELECT DISTINCT ezor FROM registrars WHERE isActive = 1;

-------------------------Get Unique Ezors-------------------------
CREATE PROCEDURE spGetUniqueEzors
AS
BEGIN
    SET NOCOUNT ON;

    SELECT DISTINCT ezor
    FROM registrars
    WHERE isActive = 1;
END;


-------------------------Get Person By Id-------------------------
CREATE PROCEDURE spGetPersonById
    @id INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        fname,
        lname,
        ezor,
        gender,
        cardDescription,
        phone
    FROM 
        registrars
    WHERE 
        id = @id AND isActive = 1;
END;

-------------------------Get User Profile-------------------------

CREATE PROCEDURE spGetUserProfile
    @id INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        id,
        fname,
        lname,
        gender,
        ezor,
        cardDescription,
        phone
    FROM registrars
    WHERE id = @id AND isActive = 1;
END;

-------------------------Update User Profile-------------------------

CREATE PROCEDURE spUpdateUserProfile
    @id INT,
    @fname NVARCHAR(255),
    @lname NVARCHAR(255),
    @gender NVARCHAR(10),
    @ezor NVARCHAR(255),
    @cardDescription NVARCHAR(500),
    @phone NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE registrars
    SET
        fname = @fname,
        lname = @lname,
        gender = @gender,
        ezor = @ezor,
        cardDescription = @cardDescription,
        phone = @phone
    WHERE id = @id AND isActive = 1;
END;

-- DROP PROCEDURE [dbo].[spUpdateUserInfo];

-------------------------Get Specializations-------------------------

CREATE PROCEDURE spGetSpecializations
AS
BEGIN
    SET NOCOUNT ON;
    SELECT id, specialization_name FROM specializations;
END;


-------------------------Assign Specializations To Registrar-------------------------
CREATE PROCEDURE spAssignSpecializationsToRegistrar
@registrar_id INT,
@specialization_ids NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @xml XML = CONVERT(XML, '<root><id>' + REPLACE(@specialization_ids, ',', '</id><id>') + '</id></root>');

    INSERT INTO registrar_specializations (registrar_id, specialization_id)
    SELECT @registrar_id, x.n.value('.', 'INT')
    FROM @xml.nodes('/root/id') AS x(n);
END;

-- DROP PROCEDURE [dbo].[spAssignSpecializationsToRegistrar];
-- DROP PROCEDURE [dbo].[spGetPersonById];

