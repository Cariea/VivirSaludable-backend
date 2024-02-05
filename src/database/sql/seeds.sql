BEGIN;

INSERT INTO asistents (
  user_id,
  name,
  email,
  password,
  role
) VALUES
  ('00000008', 'asistente #1', 'fakeemail@gmail.com','$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.', 'asistent');
  
INSERT INTO pacients (
  user_id,
  name,
  email,
  password,
  asistent_id,
  phone,
  status
) VALUES
  ('00000000', 'u1', 'jarodriguez.21@est.ucab.edu.ve', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.','00000008', '0412-1234567', TRUE),
  ('00000001', 'u2', 'mpforero.21@est.ucab.edu.ve', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.', '00000008', '0412-1234568', TRUE),
  ('00000006', 'u7', 'mggiorgetti.17@est.ucab.edu.ve', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.', '00000008', '0412-1234573', TRUE),
  ('00000007', 'u8', 'ynacosta.15@est.ucab.edu.ve', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.', '00000008', '0412-1234574', TRUE);

INSERT INTO specialties (
  name
) VALUES
  ('nutricionista'),
  ('deportologo'),
  ('psicologo'),
  ('internista'),
  ('gastrointerologo'),
  ('cirujano bariatrico');

INSERT INTO specialists (
  user_id,
  name,
  email,
  password,
  speciality_id,
  asistent_id,
  phone,
  status
  ) VALUES
    ('00000002', 'u3', 'ejarzolay.21@est.ucab.edu.ve', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.',1 , '00000008', '0412-1234569', TRUE),
    ('00000003', 'u4', 'ajrosas.19@est.ucab.edu.ve', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.',2 , '00000008', '0412-1234570', TRUE),
    ('00000004', 'u5', 'ejsucre.19@est.ucab.edu.ve', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.',3 , '00000008', '0412-1234571', TRUE),
    ('00000005', 'u6', 'cjnaim.16@est.ucab.edu.ve', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.',4 , '00000008', '0412-1234572', TRUE);


INSERT INTO indications (
  specialist_id,
  description
) VALUES
  ('00000004', 'tomar agua'),
  ('00000004', 'hacer ejercicio'),
  ('00000004', 'tomar medicamento'),
  ('00000002', 'hacer ejercicio'),
  ('00000002', 'tomar agua'),
  ('00000003', 'hacer ejercicio'),
  ('00000003', 'tomar medicamento'),
  ('00000005', 'hacer ejercicio'),
  ('00000005', 'tomar agua'),
  ('00000005', 'tomar medicamento');

  INSERT INTO programs (
    name,
    description
  ) VALUES
    ('programa #1', 'descripcion del programa #1'),
    ('programa #2', 'descripcion del programa #2'),
    ('programa #3', 'descripcion del programa #3'),
    ('programa #4', 'descripcion del programa #4'),
    ('programa #5', 'descripcion del programa #5'),
    ('programa #6', 'descripcion del programa #6');
  

COMMIT;