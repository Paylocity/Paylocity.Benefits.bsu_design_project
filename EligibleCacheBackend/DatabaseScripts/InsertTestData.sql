INSERT INTO User (employee_id, name_last, name_first)
VALUES ('123456', 'Andesite','Alice');

INSERT INTO User (employee_id, name_last, name_first)
VALUES ('654321', 'Boulder','Bob');

INSERT INTO InsuranceProvider (description, provider_npi, test_flag)
VALUES ('Eligible Test Provider', '1234567893', TRUE);

INSERT INTO UserInsurancePlan (description, user_id, provider_id, payer_id, member_id, network)
VALUES (
  'United Health Care COMPASS (individual in-network)',
  (SELECT id FROM User WHERE name_last='Andesite'),
  (SELECT id FROM InsuranceProvider WHERE provider_npi='1234567893'),
  '00001',
  'UNITEDHEALTHCARE_COMPASS',
  'IN'
);

INSERT INTO UserInsurancePlan (description, user_id, provider_id, payer_id, member_id, network)
VALUES (
  'Oxford Health (individual in-network)',
  (SELECT id FROM User WHERE name_last='Andesite'),
  (SELECT id FROM InsuranceProvider WHERE provider_npi='1234567893'),
  '00001',
  'OXFORDHEALTH_001',
  'IN'
);

INSERT INTO UserInsurancePlan (description, user_id, provider_id, payer_id, member_id, network)
VALUES (
  'Harvard Pilgrim (individual in-network)',
  (SELECT id FROM User WHERE name_last='Andesite'),
  (SELECT id FROM InsuranceProvider WHERE provider_npi='1234567893'),
  '00001',
  'HARVARDPILGRIM_001',
  'IN'
);

INSERT INTO UserInsurancePlan (description, user_id, provider_id, payer_id, member_id, network)
VALUES (
  'TriCare Standard (individual in-network)',
  (SELECT id FROM User WHERE name_last='Boulder'),
  (SELECT id FROM InsuranceProvider WHERE provider_npi='1234567893'),
  '00001',
  'TRICARE_PLAN_009_TRICARE_STANDARD',
  'IN'
);

INSERT INTO UserInsurancePlan (description, user_id, provider_id, payer_id, member_id, network)
VALUES (
  'Premera (individual in-network)',
  (SELECT id FROM User WHERE name_last='Boulder'),
  (SELECT id FROM InsuranceProvider WHERE provider_npi='1234567893'),
  '00001',
  'PREMERA_001',
  'IN'
);

INSERT INTO UserInsurancePlan (description, user_id, provider_id, payer_id, member_id, network)
VALUES (
  'AAK (individual in-network)',
  (SELECT id FROM User WHERE name_last='Boulder'),
  (SELECT id FROM InsuranceProvider WHERE provider_npi='1234567893'),
  '00001',
  'AAK_001',
  'IN'
);

