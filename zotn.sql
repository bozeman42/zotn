--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.5
-- Dumped by pg_dump version 9.6.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: boon_cards; Type: TABLE; Schema: public; Owner: aaron
--

CREATE TABLE boon_cards (
    card_id integer NOT NULL,
    boon_id integer,
    player_id integer
);


ALTER TABLE boon_cards OWNER TO aaron;

--
-- Name: boon_cards_card_id_seq; Type: SEQUENCE; Schema: public; Owner: aaron
--

CREATE SEQUENCE boon_cards_card_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE boon_cards_card_id_seq OWNER TO aaron;

--
-- Name: boon_cards_card_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aaron
--

ALTER SEQUENCE boon_cards_card_id_seq OWNED BY boon_cards.card_id;


--
-- Name: boons; Type: TABLE; Schema: public; Owner: aaron
--

CREATE TABLE boons (
    boon_id integer NOT NULL,
    name character varying(80)
);


ALTER TABLE boons OWNER TO aaron;

--
-- Name: boons_boon_id_seq; Type: SEQUENCE; Schema: public; Owner: aaron
--

CREATE SEQUENCE boons_boon_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE boons_boon_id_seq OWNER TO aaron;

--
-- Name: boons_boon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aaron
--

ALTER SEQUENCE boons_boon_id_seq OWNED BY boons.boon_id;


--
-- Name: bullets; Type: TABLE; Schema: public; Owner: aaron
--

CREATE TABLE bullets (
    bullet_id integer NOT NULL,
    player_id integer NOT NULL
);


ALTER TABLE bullets OWNER TO aaron;

--
-- Name: bullets_bullet_id_seq; Type: SEQUENCE; Schema: public; Owner: aaron
--

CREATE SEQUENCE bullets_bullet_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE bullets_bullet_id_seq OWNER TO aaron;

--
-- Name: bullets_bullet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aaron
--

ALTER SEQUENCE bullets_bullet_id_seq OWNED BY bullets.bullet_id;


--
-- Name: bullets_player_id_seq; Type: SEQUENCE; Schema: public; Owner: aaron
--

CREATE SEQUENCE bullets_player_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE bullets_player_id_seq OWNER TO aaron;

--
-- Name: bullets_player_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aaron
--

ALTER SEQUENCE bullets_player_id_seq OWNED BY bullets.player_id;


--
-- Name: factions; Type: TABLE; Schema: public; Owner: aaron
--

CREATE TABLE factions (
    faction_id integer NOT NULL,
    faction_name character varying(50)
);


ALTER TABLE factions OWNER TO aaron;

--
-- Name: factions_faction_id_seq; Type: SEQUENCE; Schema: public; Owner: aaron
--

CREATE SEQUENCE factions_faction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE factions_faction_id_seq OWNER TO aaron;

--
-- Name: factions_faction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aaron
--

ALTER SEQUENCE factions_faction_id_seq OWNED BY factions.faction_id;


--
-- Name: hunter_lanyards; Type: TABLE; Schema: public; Owner: aaron
--

CREATE TABLE hunter_lanyards (
    hunter_id integer NOT NULL,
    player_id integer NOT NULL
);


ALTER TABLE hunter_lanyards OWNER TO aaron;

--
-- Name: hunter_lanyards_hunter_id_seq; Type: SEQUENCE; Schema: public; Owner: aaron
--

CREATE SEQUENCE hunter_lanyards_hunter_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hunter_lanyards_hunter_id_seq OWNER TO aaron;

--
-- Name: hunter_lanyards_hunter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aaron
--

ALTER SEQUENCE hunter_lanyards_hunter_id_seq OWNED BY hunter_lanyards.hunter_id;


--
-- Name: hunter_lanyards_player_id_seq; Type: SEQUENCE; Schema: public; Owner: aaron
--

CREATE SEQUENCE hunter_lanyards_player_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hunter_lanyards_player_id_seq OWNER TO aaron;

--
-- Name: hunter_lanyards_player_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aaron
--

ALTER SEQUENCE hunter_lanyards_player_id_seq OWNED BY hunter_lanyards.player_id;


--
-- Name: players; Type: TABLE; Schema: public; Owner: aaron
--

CREATE TABLE players (
    id integer NOT NULL,
    level integer,
    nickname character varying(80),
    faction integer
);


ALTER TABLE players OWNER TO aaron;

--
-- Name: players_id_seq; Type: SEQUENCE; Schema: public; Owner: aaron
--

CREATE SEQUENCE players_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE players_id_seq OWNER TO aaron;

--
-- Name: players_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aaron
--

ALTER SEQUENCE players_id_seq OWNED BY players.id;


--
-- Name: zombie_lanyards; Type: TABLE; Schema: public; Owner: aaron
--

CREATE TABLE zombie_lanyards (
    zombie_id integer NOT NULL,
    player_id integer NOT NULL
);


ALTER TABLE zombie_lanyards OWNER TO aaron;

--
-- Name: zombie_lanyards_player_id_seq; Type: SEQUENCE; Schema: public; Owner: aaron
--

CREATE SEQUENCE zombie_lanyards_player_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE zombie_lanyards_player_id_seq OWNER TO aaron;

--
-- Name: zombie_lanyards_player_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aaron
--

ALTER SEQUENCE zombie_lanyards_player_id_seq OWNED BY zombie_lanyards.player_id;


--
-- Name: zombie_lanyards_zombie_id_seq; Type: SEQUENCE; Schema: public; Owner: aaron
--

CREATE SEQUENCE zombie_lanyards_zombie_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE zombie_lanyards_zombie_id_seq OWNER TO aaron;

--
-- Name: zombie_lanyards_zombie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aaron
--

ALTER SEQUENCE zombie_lanyards_zombie_id_seq OWNED BY zombie_lanyards.zombie_id;


--
-- Name: boon_cards card_id; Type: DEFAULT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY boon_cards ALTER COLUMN card_id SET DEFAULT nextval('boon_cards_card_id_seq'::regclass);


--
-- Name: boons boon_id; Type: DEFAULT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY boons ALTER COLUMN boon_id SET DEFAULT nextval('boons_boon_id_seq'::regclass);


--
-- Name: bullets bullet_id; Type: DEFAULT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY bullets ALTER COLUMN bullet_id SET DEFAULT nextval('bullets_bullet_id_seq'::regclass);


--
-- Name: bullets player_id; Type: DEFAULT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY bullets ALTER COLUMN player_id SET DEFAULT nextval('bullets_player_id_seq'::regclass);


--
-- Name: factions faction_id; Type: DEFAULT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY factions ALTER COLUMN faction_id SET DEFAULT nextval('factions_faction_id_seq'::regclass);


--
-- Name: hunter_lanyards hunter_id; Type: DEFAULT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY hunter_lanyards ALTER COLUMN hunter_id SET DEFAULT nextval('hunter_lanyards_hunter_id_seq'::regclass);


--
-- Name: hunter_lanyards player_id; Type: DEFAULT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY hunter_lanyards ALTER COLUMN player_id SET DEFAULT nextval('hunter_lanyards_player_id_seq'::regclass);


--
-- Name: players id; Type: DEFAULT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY players ALTER COLUMN id SET DEFAULT nextval('players_id_seq'::regclass);


--
-- Name: zombie_lanyards zombie_id; Type: DEFAULT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY zombie_lanyards ALTER COLUMN zombie_id SET DEFAULT nextval('zombie_lanyards_zombie_id_seq'::regclass);


--
-- Name: zombie_lanyards player_id; Type: DEFAULT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY zombie_lanyards ALTER COLUMN player_id SET DEFAULT nextval('zombie_lanyards_player_id_seq'::regclass);


--
-- Data for Name: boon_cards; Type: TABLE DATA; Schema: public; Owner: aaron
--

COPY boon_cards (card_id, boon_id, player_id) FROM stdin;
1	1	519
2	1	\N
\.


--
-- Name: boon_cards_card_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aaron
--

SELECT pg_catalog.setval('boon_cards_card_id_seq', 1, false);


--
-- Data for Name: boons; Type: TABLE DATA; Schema: public; Owner: aaron
--

COPY boons (boon_id, name) FROM stdin;
1	Single Shot Shotgun
\.


--
-- Name: boons_boon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aaron
--

SELECT pg_catalog.setval('boons_boon_id_seq', 1, false);


--
-- Data for Name: bullets; Type: TABLE DATA; Schema: public; Owner: aaron
--

COPY bullets (bullet_id, player_id) FROM stdin;
1	519
2	519
\.


--
-- Name: bullets_bullet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aaron
--

SELECT pg_catalog.setval('bullets_bullet_id_seq', 1, false);


--
-- Name: bullets_player_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aaron
--

SELECT pg_catalog.setval('bullets_player_id_seq', 1, false);


--
-- Data for Name: factions; Type: TABLE DATA; Schema: public; Owner: aaron
--

COPY factions (faction_id, faction_name) FROM stdin;
1	Hunter
2	Zombie
\.


--
-- Name: factions_faction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aaron
--

SELECT pg_catalog.setval('factions_faction_id_seq', 2, true);


--
-- Data for Name: hunter_lanyards; Type: TABLE DATA; Schema: public; Owner: aaron
--

COPY hunter_lanyards (hunter_id, player_id) FROM stdin;
1	519
\.


--
-- Name: hunter_lanyards_hunter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aaron
--

SELECT pg_catalog.setval('hunter_lanyards_hunter_id_seq', 1, false);


--
-- Name: hunter_lanyards_player_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aaron
--

SELECT pg_catalog.setval('hunter_lanyards_player_id_seq', 1, false);


--
-- Data for Name: players; Type: TABLE DATA; Schema: public; Owner: aaron
--

COPY players (id, level, nickname, faction) FROM stdin;
519	1	Bozeman42	1
1	2	Patient 0	2
\.


--
-- Name: players_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aaron
--

SELECT pg_catalog.setval('players_id_seq', 1, true);


--
-- Data for Name: zombie_lanyards; Type: TABLE DATA; Schema: public; Owner: aaron
--

COPY zombie_lanyards (zombie_id, player_id) FROM stdin;
1	1
\.


--
-- Name: zombie_lanyards_player_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aaron
--

SELECT pg_catalog.setval('zombie_lanyards_player_id_seq', 1, false);


--
-- Name: zombie_lanyards_zombie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aaron
--

SELECT pg_catalog.setval('zombie_lanyards_zombie_id_seq', 1, false);


--
-- Name: boon_cards boon_cards_pkey; Type: CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY boon_cards
    ADD CONSTRAINT boon_cards_pkey PRIMARY KEY (card_id);


--
-- Name: boons boons_name_key; Type: CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY boons
    ADD CONSTRAINT boons_name_key UNIQUE (name);


--
-- Name: boons boons_pkey; Type: CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY boons
    ADD CONSTRAINT boons_pkey PRIMARY KEY (boon_id);


--
-- Name: bullets bullets_pkey; Type: CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY bullets
    ADD CONSTRAINT bullets_pkey PRIMARY KEY (bullet_id);


--
-- Name: factions factions_pkey; Type: CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY factions
    ADD CONSTRAINT factions_pkey PRIMARY KEY (faction_id);


--
-- Name: hunter_lanyards hunter_lanyards_pkey; Type: CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY hunter_lanyards
    ADD CONSTRAINT hunter_lanyards_pkey PRIMARY KEY (hunter_id);


--
-- Name: players players_pkey; Type: CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY players
    ADD CONSTRAINT players_pkey PRIMARY KEY (id);


--
-- Name: zombie_lanyards zombie_lanyards_pkey; Type: CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY zombie_lanyards
    ADD CONSTRAINT zombie_lanyards_pkey PRIMARY KEY (zombie_id);


--
-- Name: boon_cards boon_cards_boon_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY boon_cards
    ADD CONSTRAINT boon_cards_boon_id_fkey FOREIGN KEY (boon_id) REFERENCES boons(boon_id);


--
-- Name: boon_cards boon_cards_player_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY boon_cards
    ADD CONSTRAINT boon_cards_player_id_fkey FOREIGN KEY (player_id) REFERENCES players(id);


--
-- Name: bullets bullets_player_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY bullets
    ADD CONSTRAINT bullets_player_id_fkey FOREIGN KEY (player_id) REFERENCES players(id);


--
-- Name: hunter_lanyards hunter_lanyards_player_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY hunter_lanyards
    ADD CONSTRAINT hunter_lanyards_player_id_fkey FOREIGN KEY (player_id) REFERENCES players(id);


--
-- Name: players players_faction_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY players
    ADD CONSTRAINT players_faction_fkey FOREIGN KEY (faction) REFERENCES factions(faction_id);


--
-- Name: zombie_lanyards zombie_lanyards_player_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aaron
--

ALTER TABLE ONLY zombie_lanyards
    ADD CONSTRAINT zombie_lanyards_player_id_fkey FOREIGN KEY (player_id) REFERENCES players(id);


--
-- PostgreSQL database dump complete
--

