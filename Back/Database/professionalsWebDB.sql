CREATE DATABASE ProfessionalsWebDB
COLLATE Hebrew_100_CI_AI_SC_UTF8;
USE ProfessionalsWebDB;

-- ALTER DATABASE ProfessionalsWebDB
-- COLLATE Hebrew_100_CI_AI_SC_UTF8;

/*------------   Create tables   --------------*/

CREATE TABLE registrars(
    id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
    fname varchar(255) NOT NULL,
    lname varchar(255) NOT NULL,
    phone varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    gender varchar(10) NOT NULL,   --selection
    ezor varchar(255) NOT NULL,  --selection
    cardDescription varchar(500) NOT NULL,
    hashed_password varchar(255) NOT NULL,
    isActive BIT DEFAULT 1
);

-- ALTER TABLE registrars
-- ADD isActive BIT DEFAULT 1; -- Default value is 1 (active)

CREATE UNIQUE INDEX idx_email ON registrars(email);
-- DROP TABLE registrars;





INSERT INTO registrars VALUES ('Briftney','speafrs','0542339485','britney@dgmail.com','female','description exaple lorem ipsum','צפון','A12345@@',1);
INSERT INTO registrars VALUES ('test','speafrs','0542339485','test@dgmail.com','female','צפון','description exaple lorem ipsum','A12345@d@',1);
INSERT INTO registrars VALUES ('test2','speafrs','0542339485','test2@dgmail.com','female','צפון','description exaple lorem ipsum','A12345@d@',1);
GO