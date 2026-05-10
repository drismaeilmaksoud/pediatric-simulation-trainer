-- Seed data for development

-- Insert sample users
INSERT INTO users (email, password_hash, first_name, last_name, role, specialty) VALUES
('resident1@example.com', '$2a$10$example_hash', 'John', 'Resident', 'resident', 'General Pediatrics'),
('faculty1@example.com', '$2a$10$example_hash', 'Jane', 'Faculty', 'faculty', 'General Pediatrics'),
('admin@example.com', '$2a$10$example_hash', 'Admin', 'User', 'admin', NULL);

-- Insert sample cases
INSERT INTO cases (title, description, specialty, difficulty_level, created_by, content) VALUES
('Fever in a 2-year-old', 'A 2-year-old presents with fever and rash', 'General Pediatrics', 'beginner', 
 (SELECT id FROM users WHERE email = 'faculty1@example.com'),
 '{"nodes": [], "title": "Fever with Rash"}');
