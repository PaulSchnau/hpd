BEGIN;

CREATE SCHEMA IF NOT EXISTS hpd;

drop table if EXISTS contacts;
drop table if EXISTS registrations;

create table IF NOT EXISTS hpd.registrations (
       registrationID integer,
       buildingID integer,
       boroID smallint,
       boro text,
       housenumber text,
       lowhousenumber text,
       highhousenumber text,
       streetname text,
       streetcode integer,
       zip text,
       block smallint,
       lot smallint,
       BIN integer,
       communityboard smallint,
       lastregistrationdate date,
       registrationenddate date
);

create table IF NOT EXISTS hpd.contacts (
       registrationcontactID integer,
       registrationID integer,
       registrationcontacttype text,
       ContactDescription text,
       CorporationName text,
       Title text,
       FirstName text,
       MiddleInitial text,
       LastName text,
       BusinessHouseNumber text,
       BusinessStreetName text,
       BusinessApartment text,
       BusinessCity text,
       BusinessState text,
       BusinessZip text
);

COMMIT;