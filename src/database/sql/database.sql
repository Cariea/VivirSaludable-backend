BEGIN;

-- Domanins 
CREATE DOMAIN dom_name VARCHAR(64);
CREATE DOMAIN dom_id_card VARCHAR(16);
CREATE DOMAIN dom_description VARCHAR(256);
CREATE DOMAIN dom_phone_number VARCHAR(16);
CREATE DOMAIN dom_email VARCHAR(64);
CREATE DOMAIN dom_password VARCHAR(64);
CREATE DOMAIN dom_volume FLOAT check (value > 0);
CREATE DOMAIN dom_created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP - INTERVAL '4' HOUR);

-- Types
CREATE TYPE dom_role AS ENUM ('asistent', 'pacient', 'specialist');
CREATE TYPE dom_specialties AS ENUM ('nutricionista','psicologo','deportologo', 'internista', 'gastrointerologo','cirujano');
CREATE TYPE dom_ingredient_type AS ENUM ('vegetal','fruta','proteina','lacteo','cereal','carbohidrato','otro');
-- Tables

-- 1
CREATE TABLE asistents (
  asistent_id dom_id_card NOT NULL,
  name dom_name NOT NULL,
  email dom_email UNIQUE NOT NULL,
  password dom_password NOT NULL,
  role dom_role NOT NULL,
  CONSTRAINT pk_asistent_id PRIMARY KEY (asistent_id)
);
-- 2
CREATE TABLE users (
  user_id dom_id_card NOT NULL,
  name dom_name NOT NULL,
  email dom_email UNIQUE NOT NULL,
  role dom_role NOT NULL,
  asistent_id dom_id_card,
  created_at dom_created_at,
  updated_at dom_created_at,
  CONSTRAINT pk_user_id PRIMARY KEY (user_id),
  CONSTRAINT fk_asistent_id FOREIGN KEY (asistent_id) REFERENCES asistents(asistent_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- 3
CREATE TABLE pacients (
  pacient_id dom_id_card NOT NULL,
  name dom_name NOT NULL,
  email dom_email UNIQUE NOT NULL,
  password dom_password NOT NULL,
  created_at dom_created_at,
  updated_at dom_created_at,
  CONSTRAINT pk_pacient_id PRIMARY KEY (pacient_id)
);
-- 4
CREATE TABLE specialists (
  specialist_id dom_id_card NOT NULL,
  name dom_name NOT NULL,
  email dom_email UNIQUE NOT NULL,
  password dom_password NOT NULL,
  role dom_role NOT NULL,
  created_at dom_created_at,
  updated_at dom_created_at,
  CONSTRAINT pk_specialist_id PRIMARY KEY (specialist_id)
);
-- 5
CREATE TABLE programs (
  program_id SERIAL,
  name dom_name NOT NULL,
  description dom_description NOT NULL,
  created_at dom_created_at,
  updated_at dom_created_at,

  CONSTRAINT pk_program_id PRIMARY KEY (program_id)
);
-- 6
CREATE TABLE specialties (
  specialty_id SERIAL,
  name dom_name NOT NULL,
  CONSTRAINT pk_specialty_id PRIMARY KEY (specialty_id)
);
-- 7
CREATE TABLE indicationts (
  specialist_id dom_id_card,
  indicationt_id SERIAL,
  description dom_description NOT NULL,
  CONSTRAINT pk_indicationt PRIMARY KEY (specialist_id,indicationt_id),
  CONSTRAINT fk_specialist_id FOREIGN KEY (specialist_id) REFERENCES specialists(specialist_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- 8
CREATE TABLE bot_questions (
  specialist_id dom_id_card NOT NULL,
  question_id SERIAL,
  question dom_description NOT NULL,
  answer dom_description NOT NULL,
  CONSTRAINT pk_question PRIMARY KEY (specialist_id,question_id),
  CONSTRAINT fk_specialist_id FOREIGN KEY (specialist_id) REFERENCES specialists(specialist_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- 9
CREATE TABLE messages (
  user_id dom_id_card,
  message_id SERIAL,
  message dom_description NOT NULL,
  user_receptor dom_id_card NOT NULL,
  created_at dom_created_at,
  updated_at dom_created_at,
  CONSTRAINT pk_message PRIMARY KEY (user_id,message_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_user_receptor FOREIGN KEY (user_receptor) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- 10
CREATE TABLE meals (
  pacient_id dom_id_card,
  meal_id SERIAL,
  description dom_description NOT NULL,
  meal_image_url VARCHAR(256),
  was_safistied BOOLEAN,
  indicate_hour TIMESTAMP,
  pica BOOLEAN,
  created_at dom_created_at,

  CONSTRAINT pk_meal PRIMARY KEY (pacient_id,meal_id),
  CONSTRAINT fk_pacient_id FOREIGN KEY (pacient_id) REFERENCES pacients(pacient_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- 11
CREATE TABLE ingredients (
  pacient_id dom_id_card,
  meal_id INTEGER,
  ingredient_id SERIAL,
  ingredient_type dom_ingredient_type NOT NULL,
  name dom_name NOT NULL,
  volume dom_volume NOT NULL,
  created_at dom_created_at,

  CONSTRAINT pk_ingredient PRIMARY KEY (pacient_id,meal_id,ingredient_id),
  CONSTRAINT fk_meal_id FOREIGN KEY (pacient_id,meal_id) REFERENCES meals(pacient_id,meal_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- 12
CREATE TABLE symptoms (
  pacient_id dom_id_card,
  symptom_id SERIAL,
  name dom_name NOT NULL,
  description dom_description NOT NULL,
  when_appeared dom_description NOT NULL,
  created_at dom_created_at,
  CONSTRAINT pk_symptom PRIMARY KEY (pacient_id,symptom_id),
  CONSTRAINT fk_pacient_id FOREIGN KEY (pacient_id) REFERENCES pacients(pacient_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- 13
CREATE TABLE activities (
  pacient_id dom_id_card,
  activity_id SERIAL,
  name dom_name NOT NULL,
  hour TIMESTAMP,
  time dom_volume,
  distance dom_volume,
  weight dom_volume,
  repetitions dom_volume,
  description dom_description NOT NULL,
  created_at dom_created_at,
  CONSTRAINT pk_activity PRIMARY KEY (pacient_id,activity_id),
  CONSTRAINT fk_pacient_id FOREIGN KEY (pacient_id) REFERENCES pacients(pacient_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- 14
CREATE TABLE assigned (
  specialist_id dom_id_card,
  indicationt_id INTEGER,
  pacient_id dom_id_card,
  completed BOOLEAN DEFAULT FALSE,

  CONSTRAINT pk_assigned PRIMARY KEY (specialist_id,indicationt_id,pacient_id),
  CONSTRAINT fk_specialist_id FOREIGN KEY (specialist_id) REFERENCES specialists(specialist_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- 15
CREATE TABLE has_specialities (
  specialist_id dom_id_card,
  specialty_id INTEGER,

  CONSTRAINT pk_has_specialities PRIMARY KEY (specialist_id,specialty_id),
  CONSTRAINT fk_specialist_id FOREIGN KEY (specialist_id) REFERENCES specialists(specialist_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_specialty_id FOREIGN KEY (specialty_id) REFERENCES specialties(specialty_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- 16
CREATE TABLE assings (
  asistent_id dom_id_card,
  specialist_id dom_id_card,
  pacient_id dom_id_card,
  program_id INTEGER,
  assigned_date dom_created_at,
  assigned_status BOOLEAN DEFAULT TRUE,

  CONSTRAINT pk_assings PRIMARY KEY (asistent_id,specialist_id,pacient_id,program_id),
  CONSTRAINT fk_asistent_id FOREIGN KEY (asistent_id) REFERENCES asistents(asistent_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_specialist_id FOREIGN KEY (specialist_id) REFERENCES specialists(specialist_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_pacient_id FOREIGN KEY (pacient_id) REFERENCES pacients(pacient_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_program_id FOREIGN KEY (program_id) REFERENCES programs(program_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- 17
CREATE TABLE belongs (
  asistent_id dom_id_card,
  pacient_id dom_id_card,
  program_id INTEGER,
  entry_date dom_created_at,

  CONSTRAINT pk_belongs PRIMARY KEY (asistent_id,pacient_id,program_id),
  CONSTRAINT fk_asistent_id FOREIGN KEY (asistent_id) REFERENCES asistents(asistent_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_pacient_id FOREIGN KEY (pacient_id) REFERENCES pacients(pacient_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_program_id FOREIGN KEY (program_id) REFERENCES programs(program_id) ON DELETE CASCADE ON UPDATE CASCADE
);
COMMIT;
