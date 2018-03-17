CREATE DATABASE "zotn";

CREATE TABLE "factions" (
	"faction_id" SERIAL PRIMARY KEY,
	"faction_name" VARCHAR(50)
);

CREATE TABLE "players" (
	"id" SERIAL PRIMARY KEY,
	"zombie_level" INT DEFAULT 1,
	"hunter_level" INT DEFAULT 1,
	"score" INTEGER DEFAULT 0,
	"credits" INTEGER DEFAULT 0,
	"xp" INTEGER DEFAULT 0,
	"nickname" VARCHAR(80),
	"badge_name" VARCHAR(80),
	"faction" INTEGER REFERENCES "factions"
);

CREATE TABLE "bullets" (
	"bullet_id" SERIAL PRIMARY KEY,
	"player_id" INTEGER REFERENCES "players"
);

CREATE TABLE "bites" (
	"bite_id" SERIAL PRIMARY KEY,
	"player_id" INTEGER REFERENCES "players"
);

CREATE TABLE "faction_lanyards" (
	"id" SERIAL PRIMARY KEY,
	"player_id" INTEGER REFERENCES "players",
	"faction_id" INTEGER REFERENCES "factions",
	"level" INTEGER
);

CREATE TABLE "boons" (
	"boon_id" SERIAL PRIMARY KEY,
	"name" VARCHAR(80) UNIQUE
);

CREATE TABLE "boon_cards" (
	"card_id" SERIAL PRIMARY KEY,
	"boon_id" INTEGER REFERENCES "boons",
	"player_id" INTEGER REFERENCES "players"
);

INSERT INTO "factions" ("faction_id","faction_name") VALUES
	(1,'Hunter'),
	(2,'Zombie');


SELECT
	(SELECT COUNT(*) FROM "players" WHERE "faction" = 1) as "hunter_count",
	(SELECT COUNT(*) FROM "players" WHERE "faction" = 2) as "zombie_count",
	(SELECT COUNT(*) FROM "players") as "player_count";