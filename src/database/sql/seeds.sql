BEGIN;

INSERT INTO asistents (
  user_id,
  name,
  email,
  password,
  role
) VALUES
  ('00000008', 'asistente #1', 'fakeemail@gmail.com','$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.', 'asistent');
  
INSERT INTO users (
  user_id,
  name,
  email,
  password,
  role,
  asistent_id,
  phone,
  status
) VALUES
  ('00000000', 'u1', 'jarodriguez.21@est.ucab.edu.ve', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.', 'pacient','00000008', '0412-1234567', TRUE),
  ('00000001', 'u2', 'mpforero.21@est.ucab.edu.ve', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.', 'pacient', '00000008', '0412-1234568', TRUE),
  ('00000002', 'u3', 'ejarzolay.21@est.ucab.edu.ve', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.', 'pacient', '00000008', '0412-1234569', TRUE),
  ('00000003', 'u4', 'ajrosas.19@est.ucab.edu.ve', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.', 'pacient', '00000008', '0412-1234570', TRUE),
  ('00000004', 'u5', 'ejsucre.19@est.ucab.edu.ve', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.', 'pacient', '00000008', '0412-1234571', TRUE),
  ('00000005', 'u6', 'cjnaim.16@est.ucab.edu.ve', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.', 'pacient', '00000008', '0412-1234572', TRUE),
  ('00000006', 'u7', 'mggiorgetti.17@est.ucab.edu.ve', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.', 'pacient', '00000008', '0412-1234573', TRUE),
  ('00000007', 'u8', 'ynacosta.15@est.ucab.edu.ve', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.', 'pacient', '00000008', '0412-1234574', TRUE);

COMMIT;