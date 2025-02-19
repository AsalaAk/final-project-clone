CREATE DATABASE ProfessionalsWebDB
COLLATE Hebrew_100_CI_AI_SC_UTF8;
USE ProfessionalsWebDB;

-- ALTER DATABASE ProfessionalsWebDB
-- COLLATE Hebrew_100_CI_AI_SC_UTF8;

/*------------   Create registrars table   --------------*/

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
-- DELETE FROM registrars;
-- ALTER TABLE registrars
-- ADD isActive BIT DEFAULT 1; -- Default value is 1 (active)

CREATE UNIQUE INDEX idx_email ON registrars(email);
-- DROP TABLE registrars;


/*------------   Specializations   --------------*/

CREATE TABLE specializations (
    id INT IDENTITY(1,1) PRIMARY KEY,
    specialization_name NVARCHAR(500) NOT NULL,
);

--Junction Table
CREATE TABLE registrar_specializations (
    registrar_id INT NOT NULL,
    specialization_id INT NOT NULL,
    PRIMARY KEY (registrar_id, specialization_id),
    FOREIGN KEY (registrar_id) REFERENCES registrars(id) ON DELETE CASCADE,
    FOREIGN KEY (specialization_id) REFERENCES specializations(id) ON DELETE CASCADE
);

-------------------------------------------------------------------
INSERT INTO registrars VALUES ('Asala','Akary','0542980000','asala@gmail.com','נקבה','צפון','הוא פשוט טקסט דמה של תעשיית הדפוס והקביעה. Lorem Ipsum היה טקסט הדמה הסטנדרטי של התעשייה מאז שנות ה-1500, כאשר מדפסת לא ידועה לקחה גלריה של סוג וערבלה אותה כדי ליצור ספר דגימות. הוא שרד לא רק חמש מאות שנים, אלא גם את הקפיצה לאלקטרוניקה','asala',1);
INSERT INTO registrars VALUES ('John','Doe','0542920000','john@gmail.com','זכר','תל אביב','הוא פשוט טקסט דמה של תעשיית הדפוס והקביעה. Lorem Ipsum היה טקסט הדמה הסטנדרטי של התעשייה מאז שנות ה-1500, כאשר מדפסת לא ידועה לקחה גלריה של סוג וערבלה אותה כדי ליצור ספר דגימות. הוא שרד לא רק חמש מאות שנים, אלא גם את הקפיצה לאלקטרוניקה','john',1);
INSERT INTO registrars VALUES ('Britney','Spears','0544980000','britney@gmail.com','נקבה','מרכז','הוא פשוט טקסט דמה של תעשיית הדפוס והקביעה. Lorem Ipsum היה טקסט הדמה הסטנדרטי של התעשייה מאז שנות ה-1500, כאשר מדפסת לא ידועה לקחה גלריה של סוג וערבלה אותה כדי ליצור ספר דגימות. הוא שרד לא רק חמש מאות שנים, אלא גם את הקפיצה לאלקטרוניקה','britney',1);
INSERT INTO registrars VALUES ('Kate','Klien','05429800220','kate@gmail.com','נקבה','חיפה','הוא פשוט טקסט דמה של תעשיית הדפוס והקביעה. Lorem Ipsum היה טקסט הדמה הסטנדרטי של התעשייה מאז שנות ה-1500, כאשר מדפסת לא ידועה לקחה גלריה של סוג וערבלה אותה כדי ליצור ספר דגימות. הוא שרד לא רק חמש מאות שנים, אלא גם את הקפיצה לאלקטרוניקה','kate',1);
INSERT INTO registrars VALUES ('Lucy','Akary','0522980000','lucy@gmail.com','נקבה','צפון','הוא פשוט טקסט דמה של תעשיית הדפוס והקביעה. Lorem Ipsum היה טקסט הדמה הסטנדרטי של התעשייה מאז שנות ה-1500, כאשר מדפסת לא ידועה לקחה גלריה של סוג וערבלה אותה כדי ליצור ספר דגימות. הוא שרד לא רק חמש מאות שנים, אלא גם את הקפיצה לאלקטרוניקה','lucy',1);
INSERT INTO registrars VALUES ('Jason','Akary','0542980000','jason@gmail.com','זכר','ירושלים','הוא פשוט טקסט דמה של תעשיית הדפוס והקביעה. Lorem Ipsum היה טקסט הדמה הסטנדרטי של התעשייה מאז שנות ה-1500, כאשר מדפסת לא ידועה לקחה גלריה של סוג וערבלה אותה כדי ליצור ספר דגימות. הוא שרד לא רק חמש מאות שנים, אלא גם את הקפיצה לאלקטרוניקה','jason',1);

INSERT INTO registrars VALUES ('Asala','Akary','0542980000','asalaa@gmail.com','נקבה','צפון','הוא פשוט טקסט דמה של תעשיית הדפוס והקביעה. Lorem Ipsum היה טקסט הדמה הסטנדרטי של התעשייה מאז שנות ה-1500, כאשר מדפסת לא ידועה לקחה גלריה של סוג וערבלה אותה כדי ליצור ספר דגימות. הוא שרד לא רק חמש מאות שנים, אלא גם את הקפיצה לאלקטרוניקה','asala',1);
INSERT INTO registrars VALUES ('John','Doe','0542920000','johna@gmail.com','זכר','תל אביב','הוא פשוט טקסט דמה של תעשיית הדפוס והקביעה. Lorem Ipsum היה טקסט הדמה הסטנדרטי של התעשייה מאז שנות ה-1500, כאשר מדפסת לא ידועה לקחה גלריה של סוג וערבלה אותה כדי ליצור ספר דגימות. הוא שרד לא רק חמש מאות שנים, אלא גם את הקפיצה לאלקטרוניקה','john',1);
INSERT INTO registrars VALUES ('Britney','Spears','0544980000','britneya@gmail.com','נקבה','מרכז','הוא פשוט טקסט דמה של תעשיית הדפוס והקביעה. Lorem Ipsum היה טקסט הדמה הסטנדרטי של התעשייה מאז שנות ה-1500, כאשר מדפסת לא ידועה לקחה גלריה של סוג וערבלה אותה כדי ליצור ספר דגימות. הוא שרד לא רק חמש מאות שנים, אלא גם את הקפיצה לאלקטרוניקה','britney',1);
INSERT INTO registrars VALUES ('Kate','Klien','05429800220','katea@gmail.com','נקבה','חיפה','הוא פשוט טקסט דמה של תעשיית הדפוס והקביעה. Lorem Ipsum היה טקסט הדמה הסטנדרטי של התעשייה מאז שנות ה-1500, כאשר מדפסת לא ידועה לקחה גלריה של סוג וערבלה אותה כדי ליצור ספר דגימות. הוא שרד לא רק חמש מאות שנים, אלא גם את הקפיצה לאלקטרוניקה','kate',1);
INSERT INTO registrars VALUES ('Lucy','Akary','0522980000','lucya@gmail.com','נקבה','צפון','הוא פשוט טקסט דמה של תעשיית הדפוס והקביעה. Lorem Ipsum היה טקסט הדמה הסטנדרטי של התעשייה מאז שנות ה-1500, כאשר מדפסת לא ידועה לקחה גלריה של סוג וערבלה אותה כדי ליצור ספר דגימות. הוא שרד לא רק חמש מאות שנים, אלא גם את הקפיצה לאלקטרוניקה','lucy',1);
INSERT INTO registrars VALUES ('Jason','Akary','0542980000','jasona@gmail.com','זכר','ירושלים','הוא פשוט טקסט דמה של תעשיית הדפוס והקביעה. Lorem Ipsum היה טקסט הדמה הסטנדרטי של התעשייה מאז שנות ה-1500, כאשר מדפסת לא ידועה לקחה גלריה של סוג וערבלה אותה כדי ליצור ספר דגימות. הוא שרד לא רק חמש מאות שנים, אלא גם את הקפיצה לאלקטרוניקה','jason',1);
GO


INSERT INTO specializations VALUES ('CBT');
INSERT INTO specializations VALUES ('טיפול זוגי');
GO

INSERT INTO specializations (specialization_name) VALUES 
('Clinical Psychology'),
('Child Therapy'),
('Cognitive Behavioral Therapy (CBT)'),
('Trauma Counseling'),
('Family Counseling'),
('טיפול זוגי'),
('CBT');
