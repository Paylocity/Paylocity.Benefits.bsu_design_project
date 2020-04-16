INSERT INTO User (employee_id, name_last, name_first)
VALUES ('123456', 'Andesite','Alice');

INSERT INTO User (employee_id, name_last, name_first)
VALUES ('654321', 'Boulder','Bob');

INSERT INTO InsuranceProvider (description, provider_npi, test_flag)
VALUES ('Eligible Test Provider', '1234567893', TRUE);

INSERT INTO UserInsurancePlan (description, descriptionSubtext, descriptionPhone, descriptionURL, user_id, provider_id, payer_id, member_id, network, plan_level)
VALUES (
  'COMPASS',
  'By United Health Care',
  '1-866-414-1959',
  'https://www.uhc.com/',
  (SELECT id FROM User WHERE name_last='Andesite'),
  (SELECT id FROM InsuranceProvider WHERE provider_npi='1234567893'),
  '00001',
  'UNITEDHEALTHCARE_COMPASS',
  'IN',
  'INDIVIDUAL'
);

INSERT INTO UserInsurancePlan (description, descriptionSubtext, descriptionPhone, descriptionURL, user_id, provider_id, payer_id, member_id, network, plan_level)
VALUES (
  'Oxford Health',
  '',
  '(877) 687-7317',
  'https://www.oxhp.com/',
  (SELECT id FROM User WHERE name_last='Andesite'),
  (SELECT id FROM InsuranceProvider WHERE provider_npi='1234567893'),
  '00001',
  'OXFORDHEALTH_001',
  'IN',
  'INDIVIDUAL'
);

INSERT INTO UserInsurancePlan (description, descriptionSubtext, descriptionPhone, descriptionURL, user_id, provider_id, payer_id, member_id, network, plan_level)
VALUES (
  'Harvard Pilgrim',
  '',
  '(888) 333-4742',
  'https://www.harvardpilgrim.org',
  (SELECT id FROM User WHERE name_last='Andesite'),
  (SELECT id FROM InsuranceProvider WHERE provider_npi='1234567893'),
  '00001',
  'HARVARDPILGRIM_001',
  'IN',
  'INDIVIDUAL'
);

INSERT INTO UserInsurancePlan (description, descriptionSubtext, descriptionPhone, descriptionURL, user_id, provider_id, payer_id, member_id, network, plan_level)
VALUES (
  'TriCare Standard',
  '',
  '1-844-866-9378',
  'https://www.tricare.mil/',
  (SELECT id FROM User WHERE name_last='Boulder'),
  (SELECT id FROM InsuranceProvider WHERE provider_npi='1234567893'),
  '00001',
  'TRICARE_PLAN_009_TRICARE_STANDARD',
  'IN',
  'INDIVIDUAL'
);

INSERT INTO UserInsurancePlan (description, descriptionSubtext, descriptionPhone, descriptionURL, user_id, provider_id, payer_id, member_id, network, plan_level)
VALUES (
  'Premera',
  'By Blue Cross',
  '877-342-5258',
  'https://www.premera.com',
  (SELECT id FROM User WHERE name_last='Boulder'),
  (SELECT id FROM InsuranceProvider WHERE provider_npi='1234567893'),
  '00001',
  'PREMERA_001',
  'IN',
  'INDIVIDUAL'
);

INSERT INTO UserInsurancePlan (description, descriptionSubtext, descriptionPhone, descriptionURL, user_id, provider_id, payer_id, member_id, network, plan_level)
VALUES (
  'AAK',
  '',
  'unavailable',
  'unavailable',
  (SELECT id FROM User WHERE name_last='Boulder'),
  (SELECT id FROM InsuranceProvider WHERE provider_npi='1234567893'),
  '00001',
  'AAK_001',
  'IN',
  'INDIVIDUAL'
);

