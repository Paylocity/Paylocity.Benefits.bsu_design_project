DROP TABLE IF EXISTS UserInsurancePlan;
DROP TABLE IF EXISTS InsuranceProvider;
DROP TABLE IF EXISTS User;

CREATE TABLE User (
  id           INTEGER       PRIMARY KEY AUTO_INCREMENT,
  name_last    VARCHAR(127)  NOT NULL,
  name_first   VARCHAR(127)  NOT NULL,
  name_middle  VARCHAR(127),
  name_suffix  VARCHAR(15),
  ssn          VARCHAR(15),
  dob          DATE,
  addr_city    VARCHAR(127),
  addr_state   VARCHAR(3),
  addr_zip     VARCHAR(15),
  gender       VARCHAR(3),
  employee_id  VARCHAR(31)
);

CREATE TABLE InsuranceProvider (
  id                   INTEGER       PRIMARY KEY AUTO_INCREMENT,
  description          VARCHAR(127)  NOT NULL,
  provider_npi         VARCHAR(31)   NOT NULL,
  provider_org         VARCHAR(127),
  provider_org_name    VARCHAR(127),
  provider_name_last   VARCHAR(127),
  provider_name_first  VARCHAR(127),
  provider_tax_id      VARCHAR(31),
  provider_tax_code    VARCHAR(31),
  provider_pin         VARCHAR(31),
  provider_number      VARCHAR(31),
  portal_user          VARCHAR(127),
  portal_pass          VARCHAR(127),
  service_type         INTEGER,
  cpt_code             INTEGER,
  test_flag            BOOLEAN
);

CREATE TABLE UserInsurancePlan (
  id                     INTEGER      PRIMARY KEY AUTO_INCREMENT,
  description            VARCHAR(127) NOT NULL,
  user_id                INTEGER      NOT NULL,
  provider_id            INTEGER      NOT NULL,
  payer_id               VARCHAR(31)  NOT NULL,
  member_id              VARCHAR(63)  NOT NULL,
  network                VARCHAR(7),
  plan_level             VARCHAR(31),
  cached_plan            BLOB,
  cached_plan_timestamp  DATETIME,
  FOREIGN KEY (user_id    ) REFERENCES User(id),
  FOREIGN KEY (provider_id) REFERENCES InsuranceProvider(id)
);

