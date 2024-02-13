SELECT * FROM daily_assing WHERE date_assing::date = '2024-02-09'::date;

SELECT
  s.name AS name,
  sp.name AS especialidad,
  s.status AS status,
  u.role AS rol,
  COUNT(DISTINCT a.pacient_id) AS cantidad_pacientes,
  COUNT(DISTINCT b.program_id) AS cantidad_programas
FROM
  specialists s
JOIN
  specialties sp ON s.speciality_id = sp.specialty_id
JOIN
  users u ON s.user_id = u.user_id
LEFT JOIN
  assings a ON s.user_id = a.specialist_id AND a.assigned_status = TRUE
LEFT JOIN
  belongs b ON a.pacient_id = b.pacient_id
WHERE
  s.status = TRUE
GROUP BY
  s.name, sp.name, s.status, u.role;


-- get pacient
SELECT user_id, name, email, asistent_id, phone, status
FROM pacients
WHERE user_id = '00000000';


-- get specialist
SELECT user_id, name, email, phone, status
FROM specialists
WHERE user_id = '00000002';

-- get specialist specialtie
SELECT sp.name AS specialty_name
FROM specialists s
JOIN specialties sp ON s.speciality_id = sp.specialty_id
WHERE s.user_id = '00000002';

-- get specialist whit specialtie
SELECT s.user_id, s.name AS specialist_name, s.email, s.asistent_id, s.speciality_id, sp.name AS specialty_name, s.phone, s.status
FROM specialists s
JOIN specialties sp ON s.speciality_id = sp.specialty_id
WHERE s.user_id = '00000002';


-- Get antropometrics
SELECT arm_circumference, leg_circumference, waist, hip, weight, size, musculoskeletal_mass, body_fat_mass, body_mass_index, body_fat_percentage, waist_hip_ratio, visceral_fat_level
FROM atropometricos
WHERE pacient_id = '00000000'
ORDER BY created_at DESC
LIMIT 1;

-- get bot questions
SELECT question, answer
FROM bot_questions
WHERE specialist_id = '00000002';


--get meals
SELECT meal_id, description, meal_image_url, was_safistied, indicate_hour, pica
FROM meals
WHERE pacient_id = '00000000';


--Symptoms
SELECT symptom_id, name, description, when_appeared
FROM symptoms
WHERE pacient_id = '00000000';


-- Activities
SELECT activity_id, name, hour, time, distance, weight, repetitions, description
FROM activities
WHERE pacient_id = '00000000';

-- Indicaciones asignadas
SELECT indication_id, specialist_id, assigned_id
FROM assigned
WHERE pacient_id = '00000000' AND specialist_id = '00000002';

-- daily record of assigned
SELECT record_id, specialist_id, indication_id, pacient_id, date_assing, completed
FROM daily_assing
WHERE pacient_id = '00000000' AND specialist_id = '00000002' AND indication_id = 4;


--get pacients by specialist
SELECT pacient_id
FROM assings
WHERE specialist_id = '00000002';

-- get specialist by pacient
SELECT specialist_id
FROM assings
WHERE pacient_id = '00000000';

--get pacient program
SELECT asistent_id
FROM belongs
WHERE pacient_id = '00000000' ;

--post procedure symptoms

SELECT record_id, temperature, redness, swelling, secretions, pain, temperature_high, created_at
FROM post_procedure_symptoms
WHERE pacient_id = '00000000';



--secretions
SELECT record_id, abundant, yellow, blood, smelly
FROM secretions
WHERE pacient_id = '00000000';

-- get health queries
SELECT quote_id, quote_date, quote_atention, quote_review
FROM health_queries
WHERE pacient_id = '00000000';


-- get health query

SELECT 
  CASE 
    WHEN MAX(quote_date) > CURRENT_DATE THEN COALESCE(MAX(CAST(quote_date AS TEXT)), 'No hay proxima consulta')
    ELSE 'No hay proxima consulta'
  END AS next_quote_date
FROM health_queries
WHERE pacient_id = '00000000';
