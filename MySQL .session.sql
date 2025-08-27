
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    department VARCHAR(100),
    semester INT,
    price DECIMAL(10, 2),
    contact_info VARCHAR(255),
    image_url TEXT
);

INSERT INTO books (title, author, department, semester, price, contact_info, image_url)
VALUES
('Engineering Mathematics I', 'B.S. Grewal', 'Engineering', 1, 350.00, 'user1@example.com', NULL),
('Basic Electrical Engineering', 'V.K. Mehta', 'Engineering', 1, 400.00, 'user2@example.com', NULL),
('Engineering Physics', 'H.K. Malik', 'Engineering', 1, 300.00, 'user3@example.com', NULL),
('Engineering Chemistry', 'O.P. Tandon', 'Engineering', 1, 320.00, 'user4@example.com', NULL),
('Engineering Mechanics', 'S.S. Bhavikatti', 'Engineering', 2, 450.00, 'user5@example.com', NULL),
('Computer Programming', 'E. Balagurusamy', 'Engineering', 2, 375.00, 'user6@example.com', NULL),
('Environmental Science', 'Cunningham', 'Engineering', 2, 280.00, 'user7@example.com', NULL),
('Data Structures', 'Seymour Lipschutz', 'Engineering', 3, 420.00, 'user8@example.com', NULL),
('Digital Logic Design', 'M. Morris Mano', 'Engineering', 3, 500.00, 'user9@example.com', NULL),
('Electronics Devices & Circuits', 'Millman', 'Engineering', 3, 470.00, 'user10@example.com', NULL),
('Signals and Systems', 'Alan V. Oppenheim', 'Engineering', 4, 520.00, 'user11@example.com', NULL),
('Control Systems', 'Nagrath & Gopal', 'Engineering', 4, 490.00, 'user12@example.com', NULL),
('Communication Systems', 'Simon Haykin', 'Engineering', 4, 530.00, 'user13@example.com', NULL),
('Network Analysis', 'Van Valkenburg', 'Engineering', 4, 480.00, 'user14@example.com', NULL),
('Microprocessors', 'Ramesh Gaonkar', 'Engineering', 5, 600.00, 'user15@example.com', NULL),
('Operating Systems', 'Galvin', 'Engineering', 5, 550.00, 'user16@example.com', NULL),
('Computer Networks', 'Andrew Tanenbaum', 'Engineering', 5, 580.00, 'user17@example.com', NULL),
('Database Systems', 'Raghu Ramakrishnan', 'Engineering', 6, 590.00, 'user18@example.com', NULL),
('Artificial Intelligence', 'Elaine Rich', 'Engineering', 6, 610.00, 'user19@example.com', NULL),
('Machine Learning', 'Tom Mitchell', 'Engineering', 6, 650.00, 'user20@example.com', NULL);
