CREATE DATABASE ProfessionalsWebDB
COLLATE Hebrew_100_CI_AI_SC_UTF8;
USE ProfessionalsWebDB;

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

-----------------------------------------------------------------------

-- DELETE FROM specializations;
-- DBCC CHECKIDENT ('specializations', RESEED, 0);

INSERT INTO specializations (specialization_name) VALUES 
('Clinical Psychology'),
('Child Therapy'),
('Cognitive Behavioral Therapy (CBT)'),
('Trauma Counseling'),
('Family Counseling'),
('טיפול זוגי');

-- DELETE FROM registrars;
-- DBCC CHECKIDENT ('registrars', RESEED, 0);

INSERT INTO registrars VALUES ('Asala','Akary','0542980000','asala@gmail.com','נקבה','צפון','הוא פשוט טקסט דמה של תעשיית הדפוס והקביעה. Lorem Ipsum היה טקסט הדמה הסטנדרטי של התעשייה מאז שנות ה-1500, כאשר מדפסת לא ידועה לקחה גלריה של סוג וערבלה אותה כדי ליצור ספר דגימות. הוא שרד לא רק חמש מאות שנים, אלא גם את הקפיצה לאלקטרוניקה','asala',1);
GO

INSERT INTO registrars (fname, lname, phone, email, gender, ezor, cardDescription, hashed_password, isActive)
VALUES
(N'דוד', N'דוויד', '0541234567', 'david.levi@example.com', N'זכר', N'תל אביב', 
 N'עם יותר מ-15 שנות ניסיון בפסיכולוגיה קלינית, דוד מתמחה בטיפול קוגניטיבי-התנהגותי (CBT) עבור אנשים המתמודדים עם חרדה, דיכאון ו-OCD. השיטות שלו משלבות טכניקות מבוססות מחקר עם גישה אמפתית ואישית על מנת לעזור למטופלים להגיע לרווחה נפשית ארוכת טווח.', 
 '$2a$12$XyU9z8k7dJ3O9ZJ1LbD9Keh.q7zMujDj9QZv6WwGzO6j5gAA0cOeq', 1),

(N'נועה', N'כהן', '0522345678', 'noa.cohen@example.com', N'נקבה', N'חיפה', 
 N'נועה היא מטפלת משפחתית מוסמכת שעוזרת לזוגות ולמשפחות להתמודד עם קשיים בקשרים, שיפור תקשורת והתמודדות עם אתגרי הורות. היא משתמשת בגישה אינטגרטיבית המשלבת טיפול נרטיבי עם מודלים מבוססי התקשרות.', 
 '$2a$12$KqU92ZuiP3OA9ZJ1LbC7Xy7QZv6WwGzO6j5gAA0cOeqKeh.q7zMujDj9', 1),

(N'איתן', N'שמאי', '0533456789', 'eitan.shamir@example.com', N'זכר', N'ירושלים', 
 N'איתן הוא מטפל מוסמך לטיפול בטראומה, מתמחה בטיפול ב-PTSD וטראומות מורכבות. הוא עושה שימוש בטיפול EMDR שהוכח כמועיל במיוחד לטיפול בטראומות.', 
 '$2a$12$KqiP2ZuiP3OA9ZJ1LbC7Xy7QZv6WwGzO6j5gAA0cOeqKeh.q7zMujDj9', 1),

(N'מאיה', N'בר', '0549876543', 'maya.bar@example.com', N'נקבה', N'באר שבע', 
 N'מאיה היא פסיכולוגית ילדים המתמחה בטיפול בילדים ובני נוער עם אתגרים רגשיים והתנהגותיים. היא משתמשת בטיפול במשחק ובטיפול קוגניטיבי-התנהגותי (CBT) ליצירת מרחב בטוח עבור ילדים להתמודד עם רגשותיהם.', 
 '$2a$12$KqP2ZuiP3OA9ZJ1LbC7Xy7QZv6WwGzO6j5gAA0cOeqKeh.q7zMujDj9', 1),

(N'תומר', N'אלדר', '0554567890', 'tomer.eldar@example.com', N'זכר', N'אשדוד', 
 N'תומר הוא מטפל התנהגותי המתמחה בטיפול בהפרעות קשב וריכוז (ADHD). שיטות העבודה שלו כוללות אימון ממוקד, מיינדפולנס ואימון נוירופידבק לשיפור ריכוז ויכולת ארגון.', 
 '$2a$12$KqPiZuiP3OA9ZJ1LbC7Xy7QZv6WwGzO6j5gAA0cOeqKeh.q7zMujDj9', 1),

(N'רבקה', N'מזרחי', '0503456789', 'rivka.mizrahi@example.com', N'נקבה', N'רמת גן', 
 N'רבקה מתמחה בטיפול קוגניטיבי-התנהגותי (CBT) לטיפול בחרדות, פוביות ודיכאון. היא מסייעת למטופלים ללמוד לזהות מחשבות שליליות ולשנות אותן לדפוסים חיוביים יותר.', 
 '$2a$12$KqPiZuiP3OA9ZJ1LbC7Xy7QZv6WwGzO6j5gAA0cOeqKeh.q7zMujDj9', 1),

(N'שלומי', N'בן ארי', '0585678901', 'shlomi.benari@example.com', N'זכר', N'נתניה', 
 N'שלומי הוא יועץ זוגי מוסמך עם ניסיון רב בטיפול רגשי ממוקד (EFT) המסייע לזוגות לשקם מערכות יחסים, לשפר תקשורת ולחזק את הקרבה הרגשית.', 
 '$2a$12$KqPiZuiP3OA9ZJ1LbC7Xy7QZv6WwGzO6j5gAA0cOeqKeh.q7zMujDj9', 1),

(N'יעל', N'גולדמן', '0516789012', 'yael.goldman@example.com', N'נקבה', N'פתח תקווה', 
 N'יעל היא פסיכולוגית המתמחה באבחון וטיפול בילדים עם הפרעות על הספקטרום האוטיסטי (ASD). היא מציעה טיפולים מותאמים אישית לשיפור כישורים חברתיים ויכולות ויסות רגשי.', 
 '$2a$12$KqPiZuiP3OA9ZJ1LbC7Xy7QZv6WwGzO6j5gAA0cOeqKeh.q7zMujDj9', 1),

(N'דניאל', N'שרון', '0501234567', 'daniel.sharon@example.com', N'זכר', N'רעננה', 
 N'דניאל הוא פסיכולוג קליני המתמחה בטיפול דינמי קצר מועד. הוא מסייע למטופלים לזהות דפוסים רגשיים עמוקים ולפתח אסטרטגיות התמודדות לחיים מאוזנים יותר.', 
 '$2a$12$XyU9z8k7dJ3O9ZJ1LbD9Keh.q7zMujDj9QZv6WwGzO6j5gAA0cOeq', 1),

(N'טל', N'אביב', '0547654321', 'tal.aviv@example.com', N'נקבה', N'מודיעין', 
 N'טל היא מטפלת התנהגותית-קוגניטיבית (CBT) עם ניסיון רב בטיפול בילדים ובני נוער המתמודדים עם חרדות, קשיי למידה והפרעות קשב וריכוז.', 
 '$2a$12$KqU92ZuiP3OA9ZJ1LbC7Xy7QZv6WwGzO6j5gAA0cOeqKeh.q7zMujDj9', 1),

(N'רועי', N'אלמוג', '0526781234', 'roi.almog@example.com', N'זכר', N'הרצליה', 
 N'רועי הוא פסיכולוג ספורט העובד עם ספורטאים מקצועיים לשיפור יכולות מנטליות, חיזוק הביטחון העצמי וניהול לחצים בתחרויות.', 
 '$2a$12$KqiP2ZuiP3OA9ZJ1LbC7Xy7QZv6WwGzO6j5gAA0cOeqKeh.q7zMujDj9', 1),

(N'הילה', N'זיו', '0538765432', 'hila.ziv@example.com', N'נקבה', N'בית שמש', 
 N'הילה מתמחה בטיפול זוגי ומשפחתי, ועוזרת לזוגות לשפר תקשורת, לבנות אמון מחדש ולמצוא פתרונות יעילים לאתגרים בחיי המשפחה.', 
 '$2a$12$KqP2ZuiP3OA9ZJ1LbC7Xy7QZv6WwGzO6j5gAA0cOeqKeh.q7zMujDj9', 1),

(N'אמיר', N'רוזן', '0553456789', 'amir.rozen@example.com', N'זכר', N'קריית אונו', 
 N'אמיר הוא פסיכותרפיסט בעל ניסיון בעבודה עם מטופלים המתמודדים עם דיכאון וחרדות. הוא משתמש בגישות פסיכודינמיות ומיינדפולנס.', 
 '$2a$12$KqPiZuiP3OA9ZJ1LbC7Xy7QZv6WwGzO6j5gAA0cOeqKeh.q7zMujDj9', 1),

(N'יעל', N'כהן', '0582345678', 'yael.kohen@example.com', N'נקבה', N'נהריה', 
 N'יעל מתמחה בפסיכולוגיה התפתחותית, ועובדת עם הורים וילדים צעירים לשיפור מיומנויות חברתיות והתמודדות עם קשיים רגשיים.', 
 '$2a$12$KqPiZuiP3OA9ZJ1LbC7Xy7QZv6WwGzO6j5gAA0cOeqKeh.q7zMujDj9', 1),

(N'אביב', N'גרינברג', '0569876543', 'aviv.greenberg@example.com', N'זכר', N'רחובות', 
 N'אביב הוא פסיכולוג שיקומי העוסק בטיפול באנשים לאחר תאונות ופגיעות מוחיות, ומלווה אותם בתהליך ההתמודדות והשיקום האישי.', 
 '$2a$12$KqPiZuiP3OA9ZJ1LbC7Xy7QZv6WwGzO6j5gAA0cOeqKeh.q7zMujDj9', 1),

(N'ליאור', N'רוזנטל', '0544321987', 'lior.rosenthal@example.com', N'נקבה', N'אילת', 
 N'ליאור היא פסיכולוגית קלינית המשלבת בין טיפול פרטני לבין טכניקות מיינדפולנס וניהול סטרס למצבי חרדה ודיכאון.', 
 '$2a$12$KqPiZuiP3OA9ZJ1LbC7Xy7QZv6WwGzO6j5gAA0cOeqKeh.q7zMujDj9', 1),

(N'אדם', N'לוי', '0598765432', 'adam.levi@example.com', N'זכר', N'קריית שמונה', 
 N'אדם מתמחה בטיפול התנהגותי-קוגניטיבי (CBT) במבוגרים עם הפרעות חרדה ופוביות ספציפיות.', 
 '$2a$12$KqPiZuiP3OA9ZJ1LbC7Xy7QZv6WwGzO6j5gAA0cOeqKeh.q7zMujDj9', 1),

(N'שירי', N'אורן', '0523456789', 'shiri.oren@example.com', N'נקבה', N'אשקלון', 
 N'שירי מתמחה בטיפול רגשי לילדים ומתבגרים, תוך שימוש בגישות טיפוליות מגוונות כגון טיפול במשחק ואומנות.', 
 '$2a$12$KqPiZuiP3OA9ZJ1LbC7Xy7QZv6WwGzO6j5gAA0cOeqKeh.q7zMujDj9', 1);

EXEC spAssignSpecializationToRegistrar @registrar_id = 1, @specialization_id = 5;
EXEC spAssignSpecializationToRegistrar @registrar_id = 1, @specialization_id = 2;
EXEC spAssignSpecializationToRegistrar @registrar_id = 1, @specialization_id = 3;
EXEC spAssignSpecializationToRegistrar @registrar_id = 1, @specialization_id = 6;
EXEC spAssignSpecializationToRegistrar @registrar_id = 2, @specialization_id = 4;
EXEC spAssignSpecializationToRegistrar @registrar_id = 2, @specialization_id = 1;
EXEC spAssignSpecializationToRegistrar @registrar_id = 2, @specialization_id = 3;
EXEC spAssignSpecializationToRegistrar @registrar_id = 3, @specialization_id = 2;
EXEC spAssignSpecializationToRegistrar @registrar_id = 3, @specialization_id = 4;
EXEC spAssignSpecializationToRegistrar @registrar_id = 4, @specialization_id = 1;
EXEC spAssignSpecializationToRegistrar @registrar_id = 4, @specialization_id = 5;
EXEC spAssignSpecializationToRegistrar @registrar_id = 5, @specialization_id = 1;
EXEC spAssignSpecializationToRegistrar @registrar_id = 5, @specialization_id = 3;
EXEC spAssignSpecializationToRegistrar @registrar_id = 5, @specialization_id = 2;
EXEC spAssignSpecializationToRegistrar @registrar_id = 6, @specialization_id = 4;
EXEC spAssignSpecializationToRegistrar @registrar_id = 7, @specialization_id = 1;
EXEC spAssignSpecializationToRegistrar @registrar_id = 8, @specialization_id = 3;
EXEC spAssignSpecializationToRegistrar @registrar_id = 8, @specialization_id = 2;
EXEC spAssignSpecializationToRegistrar @registrar_id = 9, @specialization_id = 4;
EXEC spAssignSpecializationToRegistrar @registrar_id = 9, @specialization_id = 1;
EXEC spAssignSpecializationToRegistrar @registrar_id = 10, @specialization_id = 5;
EXEC spAssignSpecializationToRegistrar @registrar_id = 10, @specialization_id = 1;
EXEC spAssignSpecializationToRegistrar @registrar_id = 11, @specialization_id = 3;
EXEC spAssignSpecializationToRegistrar @registrar_id = 12, @specialization_id = 2;
EXEC spAssignSpecializationToRegistrar @registrar_id = 12, @specialization_id = 4;
EXEC spAssignSpecializationToRegistrar @registrar_id = 13, @specialization_id = 1;
EXEC spAssignSpecializationToRegistrar @registrar_id = 14, @specialization_id = 3;
EXEC spAssignSpecializationToRegistrar @registrar_id = 15, @specialization_id = 2;
EXEC spAssignSpecializationToRegistrar @registrar_id = 15, @specialization_id = 4;
EXEC spAssignSpecializationToRegistrar @registrar_id = 15, @specialization_id = 1;
EXEC spAssignSpecializationToRegistrar @registrar_id = 16, @specialization_id = 5;
EXEC spAssignSpecializationToRegistrar @registrar_id = 16, @specialization_id = 1;
EXEC spAssignSpecializationToRegistrar @registrar_id = 17, @specialization_id = 3;
EXEC spAssignSpecializationToRegistrar @registrar_id = 17, @specialization_id = 2;
EXEC spAssignSpecializationToRegistrar @registrar_id = 17, @specialization_id = 4;
EXEC spAssignSpecializationToRegistrar @registrar_id = 17, @specialization_id = 1;
EXEC spAssignSpecializationToRegistrar @registrar_id = 18, @specialization_id = 3;
EXEC spAssignSpecializationToRegistrar @registrar_id = 18, @specialization_id = 2;
EXEC spAssignSpecializationToRegistrar @registrar_id = 19, @specialization_id = 4;
EXEC spAssignSpecializationToRegistrar @registrar_id = 19, @specialization_id = 1;
EXEC spAssignSpecializationToRegistrar @registrar_id = 20, @specialization_id = 5;
EXEC spAssignSpecializationToRegistrar @registrar_id = 20, @specialization_id = 3;
EXEC spAssignSpecializationToRegistrar @registrar_id = 20, @specialization_id = 2;