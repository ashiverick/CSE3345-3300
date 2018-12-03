#show databases; 
drop database Test;
create database Test;
set foreign_key_checks = 0;
USE Test;
#DROP TABLE Users;
#DROP TABLE Children;
#DROP TABLE Posts;
#DROP TABLE Comments;

CREATE TABLE Users(
	firstName VARCHAR(31), 
	lastName VARCHAR(31), 
	email VARCHAR(63), 
	userName VARCHAR(255),
	passW VARCHAR(255), 
	gender VARCHAR(6), 
	birthday VARCHAR(10), 
	photoID VARCHAR(1000), 
constraint PK_Users primary key (userName));

CREATE TABLE Children(
	ChildID INT not null auto_increment, 
	parent VARCHAR(63), 
	firstName VARCHAR(31), 
	lastName VARCHAR(31), 
	gender VARCHAR(31), 
	birthday VARCHAR(15), 
	about VARCHAR(1000), 
	photoID VARCHAR(1000) DEFAULT 'https://image.shutterstock.com/image-vector/baby-vector-kid-boy-icon-450w-774339688.jpg', 
constraint PK_Children PRIMARY KEY(ChildID), constraint FK_Children FOREIGN KEY (parent) REFERENCES Users(userName));


CREATE TABLE Posts(
	PostID INT not null auto_increment, 
	ChildID INT, 
	userName VARCHAR(31), 
	body VARCHAR(1000), 
	likes INT, 
	photoID VARCHAR(1000), 
	postdate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	contentType enum('video', 'text', 'image'), 
	milestone enum('birthday', 'crawling', 'first steps', 'first words', 'other'),
constraint PK_Posts primary key(PostID), constraint FK_Posts foreign key(userName) REFERENCES Users(userName));


CREATE TABLE Comments(CommentID INT not null auto_increment, PostID INT, userName VARCHAR(31), body VARCHAR(255),
constraint PK_Comments PRIMARY KEY (CommentID),
constraint FK_Comments FOREIGN KEY (PostID) REFERENCES Posts(PostID),
constraint FK_Comments2 FOREIGN KEY (userName) REFERENCES Users(userName));



INSERT INTO Users (userName, firstName, lastName, email, passW) VALUES 
('admin', 'DB', 'GUI', 'dbgui@gmail.com', 'password');
INSERT INTO Users(firstName, lastName, email, userName, passW, gender, birthday) values
('Alden', 'Shiverick', 'ashiverick@mail.smu.edu', 'alden123', 'default', 'F', '1998-01-01');
INSERT INTO Users(firstName, lastName, email, userName, passW, gender, birthday) values
('Alex', 'Yang', 'yanga@mail.smu.edu', 'alex123', 'default', 'M', '1999-04-05');
INSERT INTO Users(firstName, lastName, email, userName, passW, gender, birthday) values
('Chase', 'Goehring', 'cgoehring@mail.smu.edu', 'chase123', 'default', 'M', '1997-01-01');
INSERT INTO Users(firstName, lastName, email, userName, passW, gender, birthday) values
('Kyle', 'Zhu', 'kjzhu@mail.smu.edu', 'kyle123', 'default', 'M', '1998-01-01');


INSERT INTO Children (parent, firstName, lastName, gender, birthday, about, photoID) VALUES 
('admin', 'Chase', 'Goering', 'Male', '1/1/18', "I'm Chase", 'https://cdn.discordapp.com/avatars/218183356074950657/f307ddc34a3f9e54447d82c220e190b2.png');
INSERT INTO Children (parent, firstName, lastName, gender, birthday, about, photoID) VALUES 
('admin', 'Alden', 'Shiverick', 'Female', '1/1/18', "I'm Alden", 'https://image.shutterstock.com/image-vector/baby-vector-kid-boy-icon-450w-774339688.jpg');
INSERT INTO Children (parent, firstName, lastName, gender, birthday, about, photoID) VALUES 
('admin', 'Alex', 'Yang', 'Male', '1/1/18', "I'm Alex", 'https://i.groupme.com/256x256.png.6bba88de0a344e07a08291012cc5a276.large');
INSERT INTO Children (parent, firstName, lastName, gender, birthday, about, photoID) VALUES 
('admin', 'Kyle', 'Zhu', 'Male', '1/1/18', "I'm Kyle", 'https://i.pinimg.com/originals/e9/72/7b/e9727b5cf33df9bf79fab69a5fc8e131.png');

INSERT INTO Children(parent, firstName, lastName, gender, birthday, about) values
('alden123', 'Avery', 'Shiverick', 'F', '2023-01-01', 'likes flowers');
INSERT INTO Children(parent, firstName, lastName, gender, birthday, about) values
('alden123', 'Andy', 'Shiverick', 'M', '2023-01-01', 'likes cars');
INSERT INTO Children(parent, firstName, lastName, gender, birthday, about) values
('alex123', 'Annabelle', 'Yang', 'F', '2023-01-01', 'likes flowers');
INSERT INTO Children(parent, firstName, lastName, gender, birthday, about) values
('alex123', 'Alexander', 'Yang', 'M', '2023-01-01', 'likes cars');
INSERT INTO Children(parent, firstName, lastName, gender, birthday, about) values
('chase123', 'Caroline', 'Goehring', 'F', '2023-01-01', 'likes flowers');
INSERT INTO Children(parent, firstName, lastName, gender, birthday, about) values
('chase123', 'Chris', 'Goehring', 'M', '2023-01-01', 'likes cars');
INSERT INTO Children(parent, firstName, lastName, gender, birthday, about) values
('kyle123', 'Katherine', 'Zhu', 'F', '2023-01-01', 'likes flowers');
INSERT INTO Children(parent, firstName, lastName, gender, birthday, about) values
('kyle123', 'Kaden', 'Zhu', 'M', '2023-01-01', 'likes cars');



INSERT INTO Children (parent, firstName, lastName) VALUES 
('user2', 'Alex', 'Yang');
INSERT INTO Children 
SET firstName = 'Test', lastName = 'Baby', gender = 'male', birthday = '1/1/18', about = 'test', photoID = 'C:\test.jpg',
	parent = (SELECT email FROM Users WHERE email = 'dbgui@gmail.com');

INSERT INTO Children
SET firstName = 'Test', lastName = 'Baby', gender = 'male', birthday = '1/1/18', about = 'test', photoID = 'C:\test.jpg',
	parent = (SELECT email FROM Users WHERE email = 'dbgui123@gmail.com');

INSERT INTO Posts(ChildID, userName, body, likes, photoID, contentType, milestone) values
(1, 'admin', 'Chase was born!', 31, 'walking.jpg', 2, 3);

INSERT INTO Posts(ChildID, userName, body, likes, photoID, contentType, milestone) values
(1, 'admin', 'Chase is older', 31, 'walking.jpg', 2, 3);

INSERT INTO Posts(ChildID, userName, body, likes, photoID, contentType, milestone) values
(1, 'admin', 'Chase can crawl!', 31, 'walking.jpg', 2, 3);

INSERT INTO Posts(ChildID, userName, body, likes, photoID, contentType, milestone) values
(1, 'admin', 'Chase can walk!', 31, 'walking.jpg', 2, 3);

INSERT INTO Posts(ChildID, userName, body, likes, photoID, contentType, milestone) values
(2, 'admin', 'Alden was born!', 31, 'walking.jpg', 2, 3);

INSERT INTO Posts(ChildID, userName, body, likes, photoID, contentType, milestone) values
(2, 'admin', 'Alden is not happy', 31, 'https://giant.gfycat.com/ComfortableJoyfulBedbug.webm', 1, 3);

INSERT INTO Posts(ChildID, userName, body, likes, photoID, contentType, milestone) values
(4, 'admin', 'Just celebrated his first birthday.', 31, 'walking.jpg', 2, 3);

INSERT INTO Posts(ChildID, userName, body, likes, photoID, contentType, milestone) values
(5, 'alden123', 'Avery just took her first steps!', 31, 'walking.jpg', 2, 3);

INSERT INTO Posts(ChildID, userName, body, likes, contentType, milestone) values
(8, 'alex123', 'Alexander just threw up :( Wish him well.', 4, 1, 4);

INSERT INTO Posts(ChildID, userName, body, likes, photoID, contentType, milestone) values
(9, 'chase123', 'Caroline just turned 1, Happy Birthday!', 42, 'celebration.mp4', 3, 1);

INSERT INTO Posts(ChildID, userName, body, likes, photoID, contentType, milestone) values
(12, 'kyle123', "Kaden is grounded for life. Don\'t let your kids play with him.", 121, 'laughing_emoji.jpg', 2, 4);

#parents might need an about section as well
#SELECT * FROM Users WHERE email = 'dbgui@gmail.com';
#SELECT b.*, a.email FROM Children AS b RIGHT JOIN Users as a ON (b.parent = a.email)
#SELECT * FROM Children WHERE (Children.parent = 'dbgui123@gmail.com');
SELECT * FROM Users;
SELECT * FROM Children;
#SELECT passW FROM Users WHERE email='dbguisucks@gmail.com';