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
CREATE TYPE dom_specialties AS ENUM ('nutricionista','psicologo','deportologo', 'internista', 'gastrointerologo','cirujano bariatrico');
CREATE TYPE dom_ingredient_type AS ENUM ('vegetal','fruta','proteina','lacteo','cereal','carbohidrato','otro');
-- Tables

-- 1
CREATE TABLE asistents (
  user_id dom_id_card NOT NULL,
  name dom_name NOT NULL,
  email dom_email UNIQUE NOT NULL,
  password dom_password NOT NULL,
  role dom_role NOT NULL,
  CONSTRAINT pk_asistent_id PRIMARY KEY (user_id)
);
-- 2
CREATE TABLE users (
  user_id dom_id_card NOT NULL,
  name dom_name NOT NULL,
  password dom_password NOT NULL,
  role dom_role NOT NULL,
  CONSTRAINT pk_user_id PRIMARY KEY (user_id)
);
-- 3
CREATE TABLE pacients (
  user_id dom_id_card NOT NULL,
  name dom_name NOT NULL,
  email dom_email UNIQUE NOT NULL,
  password dom_password NOT NULL,
  asistent_id dom_id_card,
  phone dom_phone_number,
  status BOOLEAN DEFAULT TRUE,
  created_at dom_created_at,
  updated_at dom_created_at,
  CONSTRAINT pk_pacient_id PRIMARY KEY (user_id)
);
-- 3.5
CREATE TABLE specialties (
  specialty_id SERIAL,
  name dom_specialties NOT NULL,
  CONSTRAINT pk_specialty_id PRIMARY KEY (specialty_id)
);
-- 4
CREATE TABLE specialists (
  user_id dom_id_card NOT NULL,
  name dom_name NOT NULL,
  email dom_email UNIQUE NOT NULL,
  password dom_password NOT NULL,
  asistent_id dom_id_card,
  speciality_id INTEGER NOT NULL,
  phone dom_phone_number,
  status BOOLEAN DEFAULT TRUE,
  created_at dom_created_at,
  updated_at dom_created_at,
  CONSTRAINT pk_specialist_id PRIMARY KEY (user_id),
  CONSTRAINT fk_speciality_id FOREIGN KEY (speciality_id) REFERENCES specialties(specialty_id) ON DELETE CASCADE ON UPDATE CASCADE
);
--4.5 
CREATE TABLE atropometricos (
  specialist_id dom_id_card,
  pacient_id dom_id_card,
  antropometrico_id SERIAL,
  arm_circumference dom_volume NOT NULL,
  leg_circumference dom_volume NOT NULL,
  waist dom_volume NOT NULL,
  hip dom_volume NOT NULL,
  weight dom_volume NOT NULL,
  size dom_volume NOT NULL,
  musculoskeletal_mass dom_volume NOT NULL,
  body_fat_mass dom_volume  NOT NULL,
  body_mass_index dom_volume NOT NULL,
  body_fat_percentage dom_volume NOT NULL,
  waist_hip_ratio dom_volume NOT NULL,
  visceral_fat_level dom_volume NOT NULL,
  created_at dom_created_at, 
  CONSTRAINT pk_atropometricos PRIMARY KEY (specialist_id,pacient_id, antropometrico_id),
  CONSTRAINT fk_specialist_id FOREIGN KEY (specialist_id) REFERENCES specialists(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- 5
CREATE TABLE programs (
  program_id SERIAL,
  name dom_name NOT NULL,
  description dom_description NOT NULL,
  created_at dom_created_at,
  CONSTRAINT pk_program_id PRIMARY KEY (program_id)
);

-- 7
CREATE TABLE indications (
  specialist_id dom_id_card,
  indication_id SERIAL,
  description dom_description NOT NULL,
  CONSTRAINT pk_indicationt PRIMARY KEY (specialist_id,indication_id),
  CONSTRAINT fk_specialist_id FOREIGN KEY (specialist_id) REFERENCES specialists(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- 8
CREATE TABLE bot_questions (
  specialist_id dom_id_card,
  question_id SERIAL,
  question dom_description NOT NULL,
  answer dom_description NOT NULL,
  CONSTRAINT pk_question PRIMARY KEY (specialist_id,question_id),
  CONSTRAINT fk_specialist_id FOREIGN KEY (specialist_id) REFERENCES specialists(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- 9
CREATE TABLE messages (
  user_id dom_id_card,
  message_id SERIAL,
  message dom_description NOT NULL,
  user_receptor dom_id_card NOT NULL,
  created_at dom_created_at,
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
  CONSTRAINT fk_pacient_id FOREIGN KEY (pacient_id) REFERENCES pacients(user_id) ON DELETE CASCADE ON UPDATE CASCADE
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
  CONSTRAINT fk_pacient_id FOREIGN KEY (pacient_id) REFERENCES pacients(user_id) ON DELETE CASCADE ON UPDATE CASCADE
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
  CONSTRAINT fk_pacient_id FOREIGN KEY (pacient_id) REFERENCES pacients(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- 14
CREATE TABLE assigned (
  specialist_id dom_id_card,
  indication_id INTEGER,
  pacient_id dom_id_card,
  assigned_id SERIAL,
  completed BOOLEAN DEFAULT FALSE,
  CONSTRAINT pk_assigned PRIMARY KEY (specialist_id,indication_id,pacient_id),
  CONSTRAINT fk_specialist_id FOREIGN KEY (specialist_id) REFERENCES specialists(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- 15
CREATE TABLE assings (
  asistent_id dom_id_card,
  specialist_id dom_id_card,
  pacient_id dom_id_card,
  assigned_date dom_created_at,
  assigned_status BOOLEAN DEFAULT TRUE,
  CONSTRAINT pk_assings PRIMARY KEY (asistent_id,specialist_id,pacient_id),
  CONSTRAINT fk_asistent_id FOREIGN KEY (asistent_id) REFERENCES asistents(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_specialist_id FOREIGN KEY (specialist_id) REFERENCES specialists(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_pacient_id FOREIGN KEY (pacient_id) REFERENCES pacients(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- 16
CREATE TABLE belongs (
  asistent_id dom_id_card,
  pacient_id dom_id_card,
  program_id INTEGER,
  entry_date dom_created_at,
  CONSTRAINT pk_belongs PRIMARY KEY (asistent_id,pacient_id,program_id),
  CONSTRAINT uq_belongs UNIQUE (pacient_id, program_id),
  CONSTRAINT fk_asistent_id FOREIGN KEY (asistent_id) REFERENCES asistents(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_pacient_id FOREIGN KEY (pacient_id) REFERENCES pacients(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_program_id FOREIGN KEY (program_id) REFERENCES programs(program_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE post_procedure_symtomps (
  pacient_id dom_id_card,
  record_id SERIAL,
  temperature dom_volume NOT NULL,
  redness BOOLEAN NOT NULL,
  swelling BOOLEAN NOT NULL,
  secretions BOOLEAN NOT NULL,
  pain BOOLEAN NOT NULL,
  temperature_high BOOLEAN GENERATED ALWAYS AS (
    CASE
      WHEN temperature > 38.5 THEN true
    END
  ) STORED,
  created_at dom_created_at,
  CONSTRAINT pk_post_procedure_symtomps PRIMARY KEY (pacient_id,record_id),
  CONSTRAINT fk_pacient_id FOREIGN KEY (pacient_id) REFERENCES pacients(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE SECRETIONS (
  pacient_id dom_id_card,
  record_id SERIAL,
  abundant BOOLEAN NOT NULL,
  yellow BOOLEAN NOT NULL,
  blood BOOLEAN NOT NULL,
  smelly BOOLEAN NOT NULL,
  CONSTRAINT pk_secretions PRIMARY KEY (pacient_id,record_id),
  CONSTRAINT fk_pacient_id FOREIGN KEY (pacient_id) REFERENCES pacients(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE quotes (
  specialist_id dom_id_card,
  quote_id SERIAL,
  quote_date dom_created_at NOT NULL,
  pacient_id dom_id_card NOT NULL,
  quote_atention BOOLEAN ,
  quote_review dom_description,
  CONSTRAINT pk_quote PRIMARY KEY (specialist_id,quote_id),
  CONSTRAINT fk_specialist_id FOREIGN KEY (specialist_id) REFERENCES specialists(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_pacient_id FOREIGN KEY (pacient_id) REFERENCES pacients(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- Functions

CREATE OR REPLACE FUNCTION update_updated_at ()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP - INTERVAL '4' HOUR;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_users ()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_TABLE_NAME = 'pacients' THEN
    INSERT INTO users (user_id, name, password, role)
    VALUES (NEW.user_id, NEW.name, NEW.password, 'pacient');
  ELSIF TG_TABLE_NAME = 'specialists' THEN
    INSERT INTO users (user_id, name, password, role)
    VALUES (NEW.user_id, NEW.name, NEW.password, 'specialist');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_user()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users
  SET name = NEW.name, password = NEW.password
  WHERE user_id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;



-- Triggers
CREATE TRIGGER update_updated_at_pacients
BEFORE UPDATE ON pacients
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_updated_at_specialists
BEFORE UPDATE ON specialists
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();



CREATE TRIGGER insert_users_from_pacients
AFTER INSERT ON pacients
FOR EACH ROW
EXECUTE FUNCTION insert_users();

CREATE TRIGGER insert_users_from_specialists
AFTER INSERT ON specialists
FOR EACH ROW
EXECUTE FUNCTION insert_users();

CREATE TRIGGER update_user_from_specialists
AFTER UPDATE ON specialists
FOR EACH ROW
EXECUTE FUNCTION update_user();

COMMIT;
