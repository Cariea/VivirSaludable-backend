-- For Seeding the Database

-- Á 🐘 ├ü
-- á 🐘 ├í
-- É 🐘 ├ë
-- é 🐘 ├®
-- Í 🐘 ├ì
-- í 🐘 ├¡
-- Ó 🐘 ├ô
-- ó 🐘 ├│
-- Ú 🐘 ├Ü
-- ú 🐘 ├║
-- ñ 🐘 ├▒
-- ¿ 🐘 ┬┐


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
  address,
  status
) VALUES
  ('00000000', 'Albert Einstein', 'albert@mail.com', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.', '00000008', '0412-1234567', 'Alemania',TRUE),
  ('00000001', 'Isaac Newton', 'newton@mail.com', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.', '00000008', '0412-1234568', 'Inglaterra',TRUE),
  ('00000006', 'Galileo Galilei', 'galilei@mail.com', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.', '00000008', '0412-1234573', 'Italia',TRUE),
  ('00000007', 'Nikola Tesla', 'tesla@mail.com', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.', '00000008', '0412-1234574', 'Serbia',TRUE),
  ('25559633', 'Carmelo Naim','carmelonaim30@gmail.com','$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.', '00000008', '0412-4992818', 'Venezuela',TRUE),
  ('12345678', 'Hugo Rafael','hugor@mail.com','$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.', '00000008', '0412-4992818', 'Venezuela',TRUE);
  




INSERT INTO specialties (
  name
) VALUES
  ('nutricionista'),
  ('deportologo'),
  ('psicologo'),
  ('internista'),
  ('gastroenter├│logo'),
  ('cirujano bariatrico');

INSERT INTO specialists (
  user_id,
  name,
  email,
  password,
  speciality_id,
  asistent_id,
  phone,
  address,
  status
  ) VALUES
    ('00000002', 'Marie Curie', 'curie@mail.com', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.',1 , '00000008', '0412-1234569', 'Polonia',TRUE),
    ('00000003', 'Vincenzo Viviani', 'viviani@mail.com', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.',2 , '00000008', '0412-1234570', 'Italia',TRUE),
    ('00000004', 'Alessandro Volta', 'volta@mail.com', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.',3 , '00000008', '0412-1234571', 'Italia',TRUE),
    ('00000005', 'Enrico Fermi', 'fermi@mail.com', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.',4 , '00000008', '0412-1234572', 'Italia',TRUE),
    ('00000009', 'Vicente Lecuna', 'lecuna@mail.com', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.',5 , '00000008', '0412-1234573', 'Venezuela',TRUE),
    ('00000010', 'Luisa Caceres', 'caceres@mail.com', '$2b$10$Simzix3jRBxKmNxzHxdZEeheAC6AijygvCvs/UkXyJTjYQwtm/3x.',6 , '00000008', '0412-1234574', 'Venezuela',TRUE);

INSERT INTO assings (
  asistent_id,
  specialist_id,
  pacient_id
) VALUES
  ('00000008', '00000002', '12345678'),
  ('00000008', '00000003', '12345678'),
  ('00000008', '00000004', '12345678'),
  ('00000008', '00000005', '12345678'),
  ('00000008', '00000002', '25559633'),
  ('00000008', '00000003', '25559633'),
  ('00000008', '00000004', '25559633'),
  ('00000008', '00000009', '25559633'),
  ('00000008', '00000002', '00000000'),
  ('00000008', '00000002', '00000001'),
  ('00000008', '00000002', '00000006'),
  ('00000008', '00000002', '00000007'),
  ('00000008', '00000003', '00000000'),
  ('00000008', '00000003', '00000001'),
  ('00000008', '00000003', '00000006'),
  ('00000008', '00000003', '00000007'),
  ('00000008', '00000004', '00000000'),
  ('00000008', '00000004', '00000001'),
  ('00000008', '00000004', '00000006'),
  ('00000008', '00000004', '00000007'),
  ('00000008', '00000005', '00000000'),
  ('00000008', '00000005', '00000001'),
  ('00000008', '00000009', '00000006'),
  ('00000008', '00000010', '00000007');


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
  ('00000005', 'tomar medicamento'),
  ('00000005', 'salir a correr cada ma├▒ana de 8 a 10am sin falta te estoy vigilando pendiente pues');


  INSERT INTO programs (
    name,
    description
  ) VALUES
    ('tradicional', 'programa tradicional'),
    ('bypass', 'programa bypass'),
    ('manga gastrica endoscopica', 'programa manga gastrica endoscopica'),
    ('balon gastrico', 'programa balon gastrico'),
    ('manga gastrica quirurgica', 'programa manga gastrica quirurgica'),
    ('liraglutida','programa liraglutido'),
    ('medicacion',' programa de medicacion');
  
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

INSERT INTO antropometricos (
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

INSERT INTO meals (
  pacient_id,
  description,
  meal_image_url,
  was_safistied,
  indicate_hour,
  pica,
  created_at
) VALUES
  ('00000000', 'desayuno', 'https://cocineroaficionado.com/wp-content/uploads/2020/12/breakfast-500x375.jpg', TRUE, '2021-10-10 08:00:00', TRUE, '2021-10-10 08:00:00'),
  ('00000000', 'almuerzo', 'https://www.tropicanafm.com/wp-content/uploads/2023/01/09-01-23-Almuerzo-corrientazo.jpg', TRUE, '2021-10-10 12:00:00', TRUE, '2021-10-10 12:00:00'),
  ('00000000', 'cena', 'https://amp.protocolo.org/extfiles/i-99-cG.16432.1.jpg', TRUE, '2021-10-10 18:00:00', TRUE, '2021-10-10 18:00:00'),
  ('00000001', 'desayuno', 'https://media.glamour.mx/photos/64c03dbd1baec96cda9e64d7/master/pass/desayunos_que_controlan_los_picos_de_glucosa.jpg', TRUE, '2021-10-10 08:00:00', TRUE, '2021-10-10 08:00:00'),
  ('00000001', 'almuerzo', 'https://assets.delirec.com/images%2F7kvvCGhNNYQx63gkeQvUQTWB9zx2%2Frecipe%2F8f788146-e645-4bec-bb8c-3a94fb5d2f5c-Almo%C3%A7o-fit--gallery-0', TRUE, '2021-10-10 12:00:00', TRUE, '2021-10-10 12:00:00'),
  ('00000001', 'cena', 'https://amp.protocolo.org/extfiles/i-99-cG.16432.1.jpg', TRUE, '2021-10-10 18:00:00', TRUE, '2021-10-10 18:00:00'),
  ('00000006', 'desayuno', 'https://cncsalud.com/wp-content/uploads/2018/01/omelet-scaled.jpeg', TRUE, '2021-10-10 08:00:00', TRUE, '2021-10-10 08:00:00'),
  ('00000006', 'almuerzo', 'https://www.shutterstock.com/image-photo/diet-breakfast-lunch-weight-loss-600nw-2175437679.jpg', TRUE, '2021-10-10 12:00:00', TRUE, '2021-10-10 12:00:00'),
  ('00000006', 'cena', 'https://amp.protocolo.org/extfiles/i-99-cG.16432.1.jpg', TRUE, '2021-10-10 18:00:00', TRUE, '2021-10-10 18:00:00'),
  ('00000007', 'desayuno', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf3crluQuORlHNF_BL3QVc-gTNPCb1VrDSUw&usqp=CAU', TRUE, '2021-10-10 08:00:00', TRUE, '2021-10-10 08:00:00'),
  ('00000007', 'almuerzo', 'https://www.shutterstock.com/image-photo/executive-dish-breaded-fillet-rice-600nw-1943554549.jpg', TRUE, '2021-10-10 12:00:00', TRUE, '2021-10-10 12:00:00'),
  ('00000007', 'cena', 'https://amp.protocolo.org/extfiles/i-99-cG.16432.1.jpg', TRUE, '2021-10-10 18:00:00', TRUE, '2021-10-10 18:00:00');


INSERT INTO ingredients (
  pacient_id,
  meal_id,
  ingredient_type,
  name,
  volume
) VALUES
  ('00000000', 1, 'fruta', 'manzana', 100),
  ('00000000', 1, 'fruta', 'pera', 100),
  ('00000000', 1, 'fruta', 'uva', 100),
  ('00000000', 2, 'proteina', 'pollo', 100),
  ('00000000', 2, 'proteina', 'res', 100),
  ('00000000', 2, 'proteina', 'cerdo', 100),
  ('00000000', 3, 'vegetal', 'zanahoria', 100),
  ('00000000', 3, 'vegetal', 'lechuga', 100),
  ('00000000', 3, 'vegetal', 'tomate', 100),
  ('00000006', 7, 'lacteo', 'frijol', 200),
  ('00000006', 7, 'lacteo', 'lenteja', 200),
  ('00000006', 7, 'lacteo', 'garbanzo', 200),
  ('00000001', 5, 'lacteo', 'leche', 200),
  ('00000001', 5, 'lacteo', 'yogurt', 200),
  ('00000001', 5, 'lacteo', 'queso', 200),
  ('00000001', 6, 'cereal', 'arroz', 200),
  ('00000001', 6, 'cereal', 'avena', 200),
  ('00000001', 6, 'cereal', 'trigo', 200),
  ('00000000', 1, 'fruta', 'manzana', 100),
  ('00000000', 1, 'fruta', 'pera', 100),
  ('00000000', 1, 'fruta', 'uva', 100),
  ('00000000', 2, 'proteina', 'pollo', 100),
  ('00000000', 2, 'proteina', 'res', 100),
  ('00000000', 2, 'proteina', 'cerdo', 100),
  ('00000000', 3, 'vegetal', 'zanahoria', 100),
  ('00000000', 3, 'vegetal', 'lechuga', 100),
  ('00000000', 3, 'vegetal', 'tomate', 100),
  ('00000006', 7, 'lacteo', 'frijol', 200),
  ('00000006', 7, 'lacteo', 'lenteja', 200),
  ('00000006', 7, 'lacteo', 'garbanzo', 200),
  ('00000001', 5, 'lacteo', 'leche', 200),
  ('00000001', 5, 'lacteo', 'yogurt', 200),
  ('00000001', 5, 'lacteo', 'queso', 200),
  ('00000001', 6, 'cereal', 'arroz', 200),
  ('00000001', 6, 'cereal', 'avena', 200),
  ('00000001', 6, 'cereal', 'trigo', 200),
  ('00000000', 1, 'fruta', 'manzana', 100),
  ('00000000', 1, 'fruta', 'pera', 100),
  ('00000000', 1, 'fruta', 'uva', 100),
  ('00000000', 2, 'proteina', 'pollo', 100),
  ('00000000', 2, 'proteina', 'res', 100),
  ('00000000', 2, 'proteina', 'cerdo', 100),
  ('00000000', 3, 'vegetal', 'zanahoria', 100),
  ('00000000', 3, 'vegetal', 'lechuga', 100),
  ('00000000', 3, 'vegetal', 'tomate', 100),
  ('00000006', 7, 'lacteo', 'frijol', 200),
  ('00000006', 7, 'lacteo', 'lenteja', 200),
  ('00000006', 7, 'lacteo', 'garbanzo', 200),
  ('00000001', 5, 'lacteo', 'leche', 200),
  ('00000001', 5, 'lacteo', 'yogurt', 200),
  ('00000001', 5, 'lacteo', 'queso', 200),
  ('00000001', 6, 'cereal', 'arroz', 200),
  ('00000001', 6, 'cereal', 'avena', 200),
  ('00000001', 6, 'cereal', 'trigo', 200),
  ('00000000', 1, 'fruta', 'manzana', 100),
  ('00000000', 1, 'fruta', 'pera', 100),
  ('00000000', 1, 'fruta', 'uva', 100),
  ('00000000', 2, 'proteina', 'pollo', 100),
  ('00000000', 2, 'proteina', 'res', 100),
  ('00000000', 2, 'proteina', 'cerdo', 100),
  ('00000000', 3, 'vegetal', 'zanahoria', 100),
  ('00000000', 3, 'vegetal', 'lechuga', 100),
  ('00000000', 3, 'vegetal', 'tomate', 100),
  ('00000006', 7, 'lacteo', 'frijol', 200),
  ('00000006', 7, 'lacteo', 'lenteja', 200),
  ('00000006', 7, 'lacteo', 'garbanzo', 200),
  ('00000001', 5, 'lacteo', 'leche', 200),
  ('00000001', 5, 'lacteo', 'yogurt', 200),
  ('00000001', 5, 'lacteo', 'queso', 200),
  ('00000001', 6, 'cereal', 'arroz', 200),
  ('00000001', 6, 'cereal', 'avena', 200),
  ('00000001', 6, 'cereal', 'trigo', 200);


INSERT INTO symptoms (
  pacient_id,
  specialist_id,
  name,
  description,
  when_appeared
) VALUES
  ('00000000', '00000002', 'sintoma #1', 'descripcion del sintoma #1', '2021-10-10 08:00:00'),
  ('00000000', '00000002', 'sintoma #2', 'descripcion del sintoma #2', '2021-10-10 12:00:00'),
  ('00000000', '00000002', 'sintoma #3', 'descripcion del sintoma #3', '2021-10-10 18:00:00'),
  ('00000001', '00000002', 'sintoma #4', 'descripcion del sintoma #4', '2021-10-10 08:00:00'),
  ('00000001', '00000002', 'sintoma #5', 'descripcion del sintoma #5', '2021-10-10 12:00:00'),
  ('00000001', '00000002', 'sintoma #6', 'descripcion del sintoma #6', '2021-10-10 18:00:00'),
  ('00000006', '00000002', 'sintoma #7', 'descripcion del sintoma #7', '2021-10-10 08:00:00'),
  ('00000006', '00000002', 'sintoma #8', 'descripcion del sintoma #8', '2021-10-10 12:00:00'),
  ('00000006', '00000002', 'sintoma #9', 'descripcion del sintoma #9', '2021-10-10 18:00:00'),
  ('00000007', '00000002', 'sintoma #10', 'descripcion del sintoma #10', '2021-10-10 08:00:00'),
  ('00000007', '00000002', 'sintoma #11', 'descripcion del sintoma #11', '2021-10-10 12:00:00'),
  ('00000007', '00000002', 'sintoma #12', 'descripcion del sintoma #12', '2021-10-10 18:00:00');



INSERT INTO activities (
  pacient_id,
  name,
  hour,
  time,
  distance,
  weight,
  repetitions,
  description
) VALUES
  ('00000000', 'actividad #1', '2021-10-10 08:00:00', 1, 1, 1, 1, 'descripcion de la actividad #1'),
  ('00000000', 'actividad #2', '2021-10-10 12:00:00', 1, 1, 1, 1, 'descripcion de la actividad #2'),
  ('00000000', 'actividad #3', '2021-10-10 18:00:00', 1, 1, 1, 1, 'descripcion de la actividad #3'),
  ('00000001', 'actividad #4', '2021-10-10 08:00:00', 1, 1, 1, 1, 'descripcion de la actividad #4'),
  ('00000001', 'actividad #5', '2021-10-10 12:00:00', 1, 1, 1, 1, 'descripcion de la actividad #5'),
  ('00000001', 'actividad #6', '2021-10-10 18:00:00', 1, 1, 1, 1, 'descripcion de la actividad #6'),
  ('00000006', 'actividad #7', '2021-10-10 08:00:00', 1, 1, 1, 1, 'descripcion de la actividad #7'),
  ('00000006', 'actividad #8', '2021-10-10 12:00:00', 1, 1, 1, 1, 'descripcion de la actividad #8'),
  ('00000006', 'actividad #9', '2021-10-10 18:00:00', 1, 1, 1, 1, 'descripcion de la actividad #9'),
  ('00000007', 'actividad #10', '2021-10-10 08:00:00', 1, 1, 1, 1, 'descripcion de la actividad #10'),
  ('00000007', 'actividad #11', '2021-10-10 12:00:00', 1, 1, 1, 1, 'descripcion de la actividad #11'),
  ('00000007', 'actividad #12', '2021-10-10 18:00:00', 1, 1, 1, 1, 'descripcion de la actividad #12');


INSERT INTO assigned (
  specialist_id,
  indication_id,
  pacient_id
) VALUES
  ('00000005', 11, '00000000'),
  ('00000003', 7, '00000000'),
  ('00000005', 8, '00000000'),
  ('00000004', 2, '00000000'),
  ('00000002', 4, '00000000'),
  ('00000002', 5, '00000000'),
  ('00000002', 4, '00000001'),
  ('00000002', 5, '00000001'),
  ('00000002', 4, '00000006'),
  ('00000002', 5, '00000006'),
  ('00000002', 4, '00000007'),
  ('00000002', 5, '00000007');

INSERT INTO daily_assing (
  specialist_id,
  indication_id,
  pacient_id
) VALUES
  ('00000005', 11, '00000000'),
  ('00000003', 7, '00000000'),
  ('00000005', 8, '00000000'),
  ('00000004', 2, '00000000'),
  ('00000002', 4, '00000000'),
  ('00000002', 5, '00000000'),
  ('00000002', 4, '00000001'),
  ('00000002', 5, '00000001'),
  ('00000002', 4, '00000006'),
  ('00000002', 5, '00000006'),
  ('00000002', 4, '00000007'),
  ('00000002', 5, '00000007');


INSERT INTO belongs (
  asistent_id,
  pacient_id,
  program_id,
  entry_date
) VALUES
  ('00000008', '25559633', 2, '2024-02-14 08:00:00'),
  ('00000008', '00000000', 1, '2024-02-14 08:00:00'),
  ('00000008', '00000001', 2, '2024-02-14 08:00:00'),
  ('00000008', '00000006', 3, '2024-02-14 08:00:00'),
  ('00000008', '00000007', 4, '2024-02-14 08:00:00');



INSERT INTO post_procedure_symptoms (
  pacient_id,
  temperature,
  redness,
  swelling,
  secretions,
  pain
) VALUES
  ('00000000', 37.5, TRUE, TRUE, TRUE, TRUE),
  ('00000001', 37.5, TRUE, TRUE, TRUE, TRUE),
  ('00000006', 37.5, TRUE, TRUE, TRUE, TRUE),
  ('00000007', 37.5, TRUE, TRUE, TRUE, TRUE),
  ('00000000', 37.5, TRUE, TRUE, TRUE, TRUE),
  ('00000001', 37.5, TRUE, TRUE, TRUE, TRUE),
  ('00000006', 39.5, TRUE, TRUE, TRUE, TRUE),
  ('00000007', 39.5, TRUE, TRUE, TRUE, TRUE);

INSERT INTO secretions (
  pacient_id,
  abundant,
  yellow,
  blood,
  smelly
) VALUES
  ('00000000', TRUE, TRUE, TRUE, TRUE),
  ('00000001', TRUE, TRUE, TRUE, TRUE),
  ('00000006', TRUE, TRUE, TRUE, TRUE),
  ('00000007', TRUE, TRUE, TRUE, TRUE),
  ('00000000', TRUE, TRUE, TRUE, TRUE),
  ('00000001', TRUE, TRUE, TRUE, TRUE),
  ('00000006', TRUE, TRUE, TRUE, TRUE),
  ('00000007', TRUE, TRUE, TRUE, TRUE);


INSERT INTO health_queries (
  specialist_id,
  pacient_id,
  quote_date
) VALUES
  ('00000002', '00000001', '2024-02-10'),
  ('00000002', '00000006', '2024-02-10'),
  ('00000002', '00000007', '2024-02-10'),
  ('00000003', '00000000', '2024-02-10'),
  ('00000003', '00000001', '2024-02-11'),
  ('00000004', '00000006', '2024-02-11'),
  ('00000005', '00000007', '2024-02-09');


INSERT INTO messages (
  user_id,
  message,
  user_receptor
  ) VALUES
    ('00000000', 'A los que al contemplarme', '00000001'),
    ('00000000', 'Rodando en el fango quisieran llorar', '00000001'),
    ('00000000', 'Que sepan que soy un charco de lodo', '00000001'),
    ('00000000', 'Pero que tambien soy un manantial', '00000001'),
    ('00000001', 'No sabia de tristezas', '00000000'),
    ('00000001', 'Ni de lagrimas ni nada', '00000000'),
    ('00000001', 'Que me hicieran llorar', '00000000'),
    ('00000001', 'Yo sabia de caricias, de ternura', '00000000'),
    ('00000006', '1', '00000007'),
    ('00000006', '2', '00000007'),
    ('00000006', '3', '00000007'),
    ('00000006', '4', '00000007'),
    ('00000007', '1', '00000006'),
    ('00000007', '2', '00000006'),
    ('00000007', '3', '00000006'),
    ('00000007', '4', '00000006');

COMMIT;