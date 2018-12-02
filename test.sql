#show databases;

#create database Test;
set foreign_key_checks = 0;
USE Test;
DROP TABLE Users;
DROP TABLE Children;
DROP TABLE Posts;
DROP TABLE Comments;

CREATE TABLE Users(firstName VARCHAR(31), lastName VARCHAR(31), email VARCHAR(63), userName VARCHAR(255),
passW VARCHAR(255), gender VARCHAR(6), birthday date, photoID VARCHAR(1000), constraint PK_Users primary key (userName));

CREATE TABLE Children(ChildID INT not null auto_increment, parent VARCHAR(63), firstName VARCHAR(31), lastName VARCHAR(31), 
gender VARCHAR(31), birthday VARCHAR(15), about VARCHAR(1000), photoID VARCHAR(1000), 
constraint PK_Children PRIMARY KEY(ChildID), constraint FK_Children FOREIGN KEY (parent) REFERENCES Users(userName));


CREATE TABLE Posts(PostID INT not null auto_increment, ChildID INT, userName VARCHAR(31), body VARCHAR(1000), likes INT, 
photoID VARCHAR(1000), postDate date, contentType enum('text','image', 'video'), 
milestone enum('birthday', 'crawling', 'first steps', 'first words', 'other'),
constraint PK_Posts primary key(PostID), constraint FK_Posts foreign key(userName) REFERENCES Users(userName));

CREATE TABLE Comments(CommentID INT not null auto_increment, PostID INT, userName VARCHAR(31), body VARCHAR(255),
constraint PK_Comments PRIMARY KEY (CommentID),
constraint FK_Comments FOREIGN KEY (PostID) REFERENCES Posts(PostID),
constraint FK_Comments2 FOREIGN KEY (userName) REFERENCES Users(userName));


#post - date, content type enum, milestone enum (birthdays, crawling, first steps, first words, other)
INSERT INTO Users(firstName, lastName, email, userName, passW, gender, birthday, photoID) values
('Alden', 'Shiverick', 'ashiverick@mail.smu.edu', 'alden123', 'default', 'F', '1998-01-01', 'stock.png');
INSERT INTO Users(firstName, lastName, email, userName, passW, gender, birthday, photoID) values
('Alex', 'Yang', 'yanga@mail.smu.edu', 'alex123', 'default', 'M', '1999-04-05', 'stock.png');
INSERT INTO Users(firstName, lastName, email, userName, passW, gender, birthday, photoID) values
('Chase', 'Goehring', 'cgoehring@mail.smu.edu', 'chase123', 'default', 'M', '1997-01-01', 'stock.png');
INSERT INTO Users(firstName, lastName, email, userName, passW, gender, birthday, photoID) values
('Kyle', 'Zhu', 'kjzhu@mail.smu.edu', 'kyle123', 'default', 'M', '1998-01-01', 'stock.png');

#fills children
INSERT INTO Children(parent, firstName, lastName, gender, birthday, about, photoID) values
('alden123', 'Avery', 'Shiverick', 'F', '2023-01-01', 'likes flowers', 'stock.png');
INSERT INTO Children(parent, firstName, lastName, gender, birthday, about, photoID) values
('alden123', 'Andy', 'Shiverick', 'M', '2023-01-01', 'likes cars', 'stock.png');
INSERT INTO Children(parent, firstName, lastName, gender, birthday, about, photoID) values
('alex123', 'Annabelle', 'Yang', 'F', '2023-01-01', 'likes flowers', 'stock.png');
INSERT INTO Children(parent, firstName, lastName, gender, birthday, about, photoID) values
('alex123', 'Alexander', 'Yang', 'M', '2023-01-01', 'likes cars', 'stock.png');
INSERT INTO Children(parent, firstName, lastName, gender, birthday, about, photoID) values
('chase123', 'Caroline', 'Goehring', 'F', '2023-01-01', 'likes flowers', 'stock.png');
INSERT INTO Children(parent, firstName, lastName, gender, birthday, about, photoID) values
('chase123', 'Chris', 'Goehring', 'M', '2023-01-01', 'likes cars', 'stock.png');
INSERT INTO Children(parent, firstName, lastName, gender, birthday, about, photoID) values
('kyle123', 'Katherine', 'Zhu', 'F', '2023-01-01', 'likes flowers', 'stock.png');
INSERT INTO Children(parent, firstName, lastName, gender, birthday, about, photoID) values
('kyle123', 'Kaden', 'Zhu', 'M', '2023-01-01', 'likes cars', 'stock.png');

INSERT INTO Posts(ChildID, userName, body, likes, photoID, postDate, contentType, milestone) values
(1, 'alden123', 'Avery just took her first steps!', 31, 'walking.jpg', '2024-06-24', 2, 3);

INSERT INTO Posts(ChildID, userName, body, likes, postDate, contentType, milestone) values
(3, 'alex123', 'Alexander just threw up :( Wish him well.', 4, '2027-11-10', 1, 4);

INSERT INTO Posts(ChildID, userName, body, likes, photoID, postDate, contentType, milestone) values
(5, 'chase123', 'Caroline just turned 1, Happy Birthday!', 42, 'celebration.mp4', '2024-01-01', 3, 1);

INSERT INTO Posts(ChildID, userName, body, likes, photoID, postDate, contentType, milestone) values
(7, 'kyle123', 'Kaden is grounded for life. Don\'t let your kids play with him.', 121, 'laughing_emoji.jpg', '2030-02-28', 2, 4);

INSERT INTO Comments(PostID, userName, body) values
(1, 'alex123', 'Wow! Amazing!');

INSERT INTO Comments(PostID, userName, body) values
(2, 'chase123', 'I have some medication if you need it :( hope he gets better');

INSERT INTO Comments(PostID, userName, body) values
(3, 'kyle123', 'Happy Birthday Caroline! Hope you enjoyed our present!');

INSERT INTO Comments(PostID, userName, body) values
(4, 'alden123', 'Good riddance, now my kids don\'t have to play with that psycho!');

SELECT * FROM Users;
SELECT * FROM Children;
SELECT * FROM Posts;
SELECT * FROM Comments;