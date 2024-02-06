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
  
INSERT INTO bot_questions (
  specialist_id,
  question,
  answer
) VALUES
  ('00000002', 'pregunta #1', 'respuesta #1'),
  ('00000002', 'pregunta #2', 'respuesta #2'),
  ('00000002', 'pregunta #3', 'respuesta #3'),
  ('00000003', 'pregunta #4', 'respuesta #4'),
  ('00000003', 'pregunta #5', 'respuesta #5'),
  ('00000003', 'pregunta #6', 'respuesta #6'),
  ('00000004', 'pregunta #7', 'respuesta #7'),
  ('00000004', 'pregunta #8', 'respuesta #8'),
  ('00000004', 'pregunta #9', 'respuesta #9'),
  ('00000005', 'pregunta #10', 'respuesta #10'),
  ('00000005', 'pregunta #11', 'respuesta #11'),
  ('00000005', 'pregunta #12', 'respuesta #12');

INSERT INTO atropometricos (
  specialist_id,
  pacient_id,
  arm_circumference,
  leg_circumference,
  waist,
  hip,
  weight,
  size,
  musculoskeletal_mass,
  body_fat_mass,
  body_mass_index,
  body_fat_percentage,
  waist_hip_ratio,
  visceral_fat_level 
) VALUES 
  ('00000002', '00000000', 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 20),
  ('00000003', '00000001', 31, 41, 51, 61, 71, 81, 91, 101, 111, 121, 131, 20),
  ('00000004', '00000006', 32, 42, 52, 62, 72, 82, 92, 102, 112, 122, 132, 20),
  ('00000005', '00000007', 33, 43, 53, 63, 73, 83, 93, 103, 113, 123, 133, 20),
  ('00000002', '00000000', 34, 44, 54, 64, 74, 84, 94, 104, 114, 124, 134, 20),
  ('00000003', '00000001', 35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 20),
  ('00000004', '00000006', 36, 46, 56, 66, 76, 86, 96, 106, 116, 126, 136, 20),
  ('00000005', '00000007', 37, 47, 57, 67, 77, 87, 97, 107, 117, 127, 137, 20),
  ('00000002', '00000000', 38, 48, 58, 68, 78, 88, 98, 108, 118, 128, 138, 20),
  ('00000003', '00000001', 39, 49, 59, 69, 79, 89, 99, 109, 119, 129, 139, 20),
  ('00000004', '00000006', 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 20),
  ('00000005', '00000007', 41, 51, 61, 71, 81, 91, 101, 111, 121, 131, 141, 20),
  ('00000002', '00000000', 42, 52, 62, 72, 82, 92, 102, 112, 122, 132, 142, 20),
  ('00000003', '00000001', 43, 53, 63, 73, 83, 93, 103, 113, 123, 133, 143, 20),
  ('00000004', '00000006', 44, 54, 64, 74, 84, 94, 104, 114, 124, 134, 144, 20),
  ('00000005', '00000007', 45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145, 20);
COMMIT;