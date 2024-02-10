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
