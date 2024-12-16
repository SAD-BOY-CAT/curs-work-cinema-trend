--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-11-30 18:29:34 +03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 858 (class 1247 OID 22073)
-- Name: Gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Gender" AS ENUM (
    'MALE',
    'FEMALE',
    'OTHER'
);


ALTER TYPE public."Gender" OWNER TO postgres;

--
-- TOC entry 882 (class 1247 OID 23958)
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'MODERATOR'
);


ALTER TYPE public."Role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 227 (class 1259 OID 22117)
-- Name: FavoriteMovie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FavoriteMovie" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "movieId" integer NOT NULL,
    "favoritedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."FavoriteMovie" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 22116)
-- Name: FavoriteMovie_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."FavoriteMovie_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."FavoriteMovie_id_seq" OWNER TO postgres;

--
-- TOC entry 3686 (class 0 OID 0)
-- Dependencies: 226
-- Name: FavoriteMovie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."FavoriteMovie_id_seq" OWNED BY public."FavoriteMovie".id;


--
-- TOC entry 221 (class 1259 OID 22090)
-- Name: Movie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Movie" (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    "releaseDate" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    picture text NOT NULL,
    country text,
    duration integer,
    rating integer
);


ALTER TABLE public."Movie" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 22100)
-- Name: MovieCategory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MovieCategory" (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."MovieCategory" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 22099)
-- Name: MovieCategory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MovieCategory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."MovieCategory_id_seq" OWNER TO postgres;

--
-- TOC entry 3687 (class 0 OID 0)
-- Dependencies: 222
-- Name: MovieCategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MovieCategory_id_seq" OWNED BY public."MovieCategory".id;


--
-- TOC entry 220 (class 1259 OID 22089)
-- Name: Movie_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Movie_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Movie_id_seq" OWNER TO postgres;

--
-- TOC entry 3688 (class 0 OID 0)
-- Dependencies: 220
-- Name: Movie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Movie_id_seq" OWNED BY public."Movie".id;


--
-- TOC entry 229 (class 1259 OID 22125)
-- Name: Review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Review" (
    id integer NOT NULL,
    content text NOT NULL,
    rating integer DEFAULT 0 NOT NULL,
    "userId" integer NOT NULL,
    "movieId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Review" OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 22124)
-- Name: Review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Review_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Review_id_seq" OWNER TO postgres;

--
-- TOC entry 3689 (class 0 OID 0)
-- Dependencies: 228
-- Name: Review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Review_id_seq" OWNED BY public."Review".id;


--
-- TOC entry 219 (class 1259 OID 22080)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    username text,
    password text NOT NULL,
    date timestamp(3) without time zone,
    gender public."Gender",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    picture text,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 22079)
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- TOC entry 3690 (class 0 OID 0)
-- Dependencies: 218
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- TOC entry 225 (class 1259 OID 22109)
-- Name: WatchedMovie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."WatchedMovie" (
    id integer NOT NULL,
    "movieId" integer NOT NULL,
    "userId" integer NOT NULL,
    "watchedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."WatchedMovie" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 22108)
-- Name: WatchedMovie_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."WatchedMovie_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."WatchedMovie_id_seq" OWNER TO postgres;

--
-- TOC entry 3691 (class 0 OID 0)
-- Dependencies: 224
-- Name: WatchedMovie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."WatchedMovie_id_seq" OWNED BY public."WatchedMovie".id;


--
-- TOC entry 230 (class 1259 OID 22135)
-- Name: _MovieCategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_MovieCategories" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_MovieCategories" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 22061)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 3494 (class 2604 OID 22120)
-- Name: FavoriteMovie id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FavoriteMovie" ALTER COLUMN id SET DEFAULT nextval('public."FavoriteMovie_id_seq"'::regclass);


--
-- TOC entry 3489 (class 2604 OID 22093)
-- Name: Movie id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movie" ALTER COLUMN id SET DEFAULT nextval('public."Movie_id_seq"'::regclass);


--
-- TOC entry 3491 (class 2604 OID 22103)
-- Name: MovieCategory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MovieCategory" ALTER COLUMN id SET DEFAULT nextval('public."MovieCategory_id_seq"'::regclass);


--
-- TOC entry 3496 (class 2604 OID 22128)
-- Name: Review id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review" ALTER COLUMN id SET DEFAULT nextval('public."Review_id_seq"'::regclass);


--
-- TOC entry 3486 (class 2604 OID 22083)
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- TOC entry 3492 (class 2604 OID 22112)
-- Name: WatchedMovie id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WatchedMovie" ALTER COLUMN id SET DEFAULT nextval('public."WatchedMovie_id_seq"'::regclass);


--
-- TOC entry 3677 (class 0 OID 22117)
-- Dependencies: 227
-- Data for Name: FavoriteMovie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."FavoriteMovie" (id, "userId", "movieId", "favoritedAt") FROM stdin;
57	1	169	2024-10-10 09:29:56.801
58	1	196	2024-10-10 13:20:40.674
59	1	160	2024-10-10 13:20:41.714
60	1	154	2024-10-10 13:20:47.826
61	1	182	2024-10-26 06:41:33.195
63	2	169	2024-10-30 05:50:57.005
65	1	202	2024-11-02 11:09:50.421
66	2	153	2024-11-06 10:34:44.372
68	1	151	2024-11-21 10:45:32.307
71	1	212	2024-11-22 06:47:10.648
72	5	206	2024-11-22 07:22:27.254
73	6	169	2024-11-22 07:37:57.084
74	6	206	2024-11-22 07:37:58.301
75	7	206	2024-11-22 07:47:23.824
76	7	157	2024-11-22 07:52:08.131
77	2	199	2024-11-27 10:13:32.612
78	2	206	2024-11-27 10:14:19.167
79	2	196	2024-11-27 10:14:21.973
53	1	199	2024-10-08 13:01:33.942
54	1	173	2024-10-10 09:19:34.193
\.


--
-- TOC entry 3671 (class 0 OID 22090)
-- Dependencies: 221
-- Data for Name: Movie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Movie" (id, title, description, "releaseDate", "createdAt", "updatedAt", picture, country, duration, rating) FROM stdin;
153	Безумный Макс 2	Катастрофа пострашнее ядерной войны постигла нашу цивилизацию. Страшный энергетический кризис парализовал города, пути сообщения - одним словом, все. За топливо теперь дерутся любыми средствами. Потому что там, где бензин, - там жизнь... Одинокий водитель Макс как раз и бороздит пустоши далекой Австралии в поисках горючего. Повсюду брошенные жилища, машины, разный скарб. Наконец Макс находит поселение, превращенное в укрепленный лагерь со складами горючего. Исхудавшие, измученные люди как могут охраняют то, что им принадлежит. И вот, в довершение всех бед, на лагерь нападают враги, свирепые панки и байкеры под предводительством некоего Гумунгуса, садиста и душегуба. И тогда Макс вступает в схватку...	1981-11-24 00:00:00	2024-09-24 08:39:39.272	2024-09-24 08:39:39.272	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Action%2FMaks.webp?alt=media&token=054e37fa-c261-48b8-ae5c-c943e0096d7b	Австралия	5760	18
154	Рэмбо: Первая кровь 	Он - эксперт. Эксперт по оружию, ножам и собственному телу. Он человек, специально обученный не замечать боль и погодные условия. На войне он был героем, а на родине он никому не нужен. Неспособный приспособиться к мирной жизни Рэмбо путешествует по стране, но его задерживает провинциальный шериф, ненавидящий бродяг. Попав в тюрьму и вкусив унижений со стороны полиции, Рэмбо объявляет войну беспределу официальных структур и главе местной полиции лично.	1982-10-22 00:00:00	2024-09-24 08:43:55.014	2024-09-24 08:43:55.014	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Action%2FRambo.webp?alt=media&token=eeed5135-fd3e-4594-b4d2-6025a975a072	США	5640	18
155	Терминатор 2	Прошло более десяти лет с тех пор, как киборг из 2029 года пытался уничтожить Сару Коннор — женщину, чей будущий сын выиграет войну человечества против машин.\nТеперь у Сары родился сын Джон и время, когда он поведёт за собой выживших людей на борьбу с машинами, неумолимо приближается. Именно в этот момент из постапокалиптического будущего прибывает новый терминатор — практически неуязвимая модель T-1000, способная принимать любое обличье. Цель нового терминатора уже не Сара, а уничтожение молодого Джона Коннора.	1991-07-01 00:00:00	2024-09-24 08:47:41.678	2024-09-24 08:47:41.678	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Action%2FTerminator.webp?alt=media&token=734fefed-1349-47ae-9ab7-21eb815d490e	США	8640	18
156	Выживший	Охотник Хью Гласс серьезно ранен на неизведанных просторах американского Дикого Запада. Товарищ Хью по отряду покорителей новых земель Джон Фицжеральд предательски оставляет его умирать в одиночестве. Теперь у Гласса осталось только одно оружие – его сила воли. Он готов бросить вызов первобытной природе, суровой зиме и враждебным племенам индейцев, только чтобы выжить и отомстить Фицжеральду.	2015-11-16 00:00:00	2024-09-24 08:52:47.614	2024-09-24 08:52:47.614	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Adventure%2F600x900.webp?alt=media&token=d5a5a103-4963-4b09-b259-5406e4834a8f	США	9480	16
157	Эверест	Эверест — великая неприступная гора, покорить вершину которой мечтают многие профессиональные альпинисты. Одна из экспедиций на ее вершину закончилась настоящей трагедией, однако этот факт не останавливает отважных альпинистов.	2015-09-24 00:00:00	2024-09-24 08:57:31.655	2024-09-24 08:57:31.655	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Adventure%2FEverest.webp?alt=media&token=8491e1ab-05e2-4ba2-9007-5f740ab42f7f	США	7320	12
159	Круиз по джунглям	Хитростью и немалой сноровкой раздобыв бесценную карту верховьев Амазонки, бойкая археолог Лили Хоутон отправляется в экспедицию, чтобы найти волшебное дерево, цветок которого — согласно легенде — обладает невероятными целебными свойствами. Прихватив с собой младшего брата, который не в восторге от перспективы поездки в дикие джунгли, девушка нанимает проводника — капитана круизного пароходика по имени Фрэнк. Вся компания пускается в приключение, где их подстерегают не только смертельно опасные представители амазонской флоры и фауны, но и ловушки, подстроенные участниками конкурирующей экспедиции.	2021-07-29 00:00:00	2024-09-24 09:04:57.621	2024-09-24 09:04:57.621	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Adventure%2FJungle.webp?alt=media&token=b3932ef7-b3a9-495a-b2ef-cd984c6a4ffc	США	10200	6
160	Пираты Карибского моря	Новые приключения Джека Воробья и его друзей Уилла Тернера и Элизабет Суонн. На этот раз Уиллу и Элизабет придется объединиться с самим Капитаном Барбоссой для того, чтобы отправиться на край света и спасти своего друга — Джека. Ситуация осложняется тем, что Элизабет попадает к сингапурским пиратам…	2007-05-19 00:00:00	2024-09-24 09:09:09.931	2024-09-24 09:09:09.931	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Adventure%2FPirats.webp?alt=media&token=02bf06c8-db38-49f0-a62d-3145bf632d04	США	8100	12
161	История игрушек	В спальне Энди его игрушки начинают жить своей жизнью, как только он выходит из комнаты. В день рождения мальчика царит паника — все боятся появления новой игрушки, которая перетянет внимание на себя. И только любимчик Эдди, ковбой Вуди, ни о чем не переживает. Однако, когда мальчик получает в подарок фигурку астронавта Базза Лайтера, Вуди очень быстро оказывается забыт. И тогда ковбой решает вернуть себе первое место в сердце Энди.	1995-11-19 00:00:00	2024-09-24 09:13:11.447	2024-09-24 09:13:11.447	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Animation%2F600x900.webp?alt=media&token=a9f24f6b-08b4-4a65-bead-6237ccd00363	США	5400	0
162	Король Лев	У величественного Короля-Льва Муфасы рождается наследник по имени Симба. Уже в детстве любознательный малыш становится жертвой интриг своего завистливого дяди Шрама, мечтающего о власти.\nСимба познаёт горе утраты, предательство и изгнание, но в конце концов обретает верных друзей и находит любимую. Закалённый испытаниями, он в нелёгкой борьбе отвоёвывает своё законное место в «Круге жизни», осознав, что значит быть настоящим Королём.	1994-06-12 00:00:00	2024-09-24 09:16:06.907	2024-09-24 09:16:06.907	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Animation%2FLion%20King.webp?alt=media&token=e7b9fb94-bd6c-4b79-8f56-cb891ce1d993	США	5880	0
163	Кошмар перед Рождеством	В царстве Хэллоуин, царстве страхов и кошмаров, живут мертвецы, уродцы, чудовища во главе с царем ужасов Джеком Скеллингтоном. Под рождество Джек случайно попадает в город Рождества, где узнает, что где-то есть радость, добро и веселье. Ему страшно захотелось испытать это чувство — дарить людям счастье — и он похитил Санта Клауса и занял его место.	1993-10-09 00:00:00	2024-09-24 09:19:01.443	2024-09-24 09:19:01.443	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Animation%2FNightmare.webp?alt=media&token=3cfd04a2-549c-4353-9823-bf0c4e39d021	США	5760	6
164	Унесённые призраками	Тихиро с мамой и папой переезжает в новый дом. Заблудившись по дороге, они оказываются в странном пустынном городе, где их ждет великолепный пир. Родители с жадностью набрасываются на еду и к ужасу девочки превращаются в свиней, став пленниками злой колдуньи Юбабы. Теперь, оказавшись одна среди волшебных существ и загадочных видений, Тихиро должна придумать, как избавить своих родителей от чар коварной старухи.	2001-07-20 00:00:00	2024-09-24 09:21:09.696	2024-09-24 09:21:09.696	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Animation%2FSpirits.webp?alt=media&token=0730e60c-d8ce-4674-b5f1-d8fde9bcb76b	Япония	11700	6
165	Южный Парк	Приключения четырёх мальчиков и их друзей, живущих в маленьком городке Южный Парк, штат Колорадо.	2000-06-21 00:00:00	2024-09-24 09:23:03.951	2024-09-24 09:23:03.951	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Animation%2Fpark.webp?alt=media&token=3d063c82-c8ec-426a-8865-cccc76f6df9a	США	5400	18
167	Один дома	Американское семейство отправляется из Чикаго в Европу, но в спешке сборов бестолковые родители забывают дома... одного из своих детей. Юное создание, однако, не теряется и демонстрирует чудеса изобретательности. И когда в дом залезают грабители, им приходится не раз пожалеть о встрече с милым крошкой.	1990-10-10 00:00:00	2024-09-26 09:47:13.462	2024-09-26 09:47:13.462	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Comedy%2FOneInHouse.webp?alt=media&token=5c0dd65a-a98e-43a4-9279-7d901c54bdfd	США	5700	6
168	Реальные упыри	История жизни Виаго, Дикона и Владислава — трёх соседей и по совместительству бессмертных вампиров, которые всего лишь пытаются выжить в современном мире, где есть арендная плата, фейсконтроль в ночных клубах, губительный солнечный свет и другие неприятности.	2014-01-19 00:00:00	2024-09-26 09:49:40.44	2024-09-26 09:49:40.44	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Comedy%2FShadows.webp?alt=media&token=e35af6d8-4c9e-413a-9972-5d9be250cb5b	Новая Зеландия	7650	18
169	Батя	История о путешествии взрослого героя к своему Бате, суровому русскому мужику, который стал отцом на заре девяностых и воспитывал своего сына так, как это делали все советские люди.	2021-03-18 00:00:00	2024-09-26 09:52:38.668	2024-09-26 09:52:38.668	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Comedy%2Fdaedy.webp?alt=media&token=0c95ff8c-b245-41a6-ac3a-a6e47696e8ba	Россия	6600	12
170	Жмурки	Жмурки — старинная русская игра: водящий, с завязанными глазами, ловит остальных играющих. К середине 1990-х правила игры изменились: выигрывает тот, кто останется в живых, сделав жмуриками остальных.\nНижний Новгород. Два мелких бандита Серега и Саймон работают на крупного бандюгана Сергея Михайловича. Только вот очередное его поручение парни провалили: он велел привезти химика, колдовавшего над созданием новой порции белого порошка, а Серега и Саймон устроили в лаборатории бойню.	2005-05-27 00:00:00	2024-09-26 09:54:30.787	2024-09-26 09:54:30.787	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Comedy%2Fdaedy.webp?alt=media&token=0c95ff8c-b245-41a6-ac3a-a6e47696e8ba	Россия	6600	18
171	Крамб	Об авторе андерграундных комиксов Роберте Крамбе, творчество которого включало в себя навязчивые сексуальные идеи, социальную критику и личные наблюдения за странностями человеческой психологии.	1994-09-10 00:00:00	2024-09-26 09:57:42.633	2024-09-26 09:57:42.633	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Documentary%2FCrumb.webp?alt=media&token=cf8d4553-a6d3-4da5-8d13-18c6a15995cf	США	7200	16
172	Человек гризли	Фильм рассказывает о печальной судьбе исследователя-любителя Тимоти Тредвелла, посвятившего себя изучению повадок самого свирепого медведя на планете - гризли. Жизнь Тредвелла оборвалась в октябре 2003 года на Аляске.	2005-01-24 00:00:00	2024-09-26 10:00:31.31	2024-09-26 10:00:31.31	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Documentary%2FGrizzly.webp?alt=media&token=9a4651b4-3867-45ec-bf43-46cc473f3c20	США	7800	16
173	Баскетбольные мечты	Реальная история о двух подростках из бедного квартала Чикаго Артуре Эджи и Уильяме Гейтсе и об их поисках славы в НБА. Сразу после окончания школы мальчики попадают в группу скаутов-атлетов, изолированную от улиц, где учатся, в основном, белые подростки. Следуя по стопам своего баскетбольного идола Исайи Томаса, оба мальчика проходят строгий курс взросления, овладевая академическими знаниями и атлетикой.	1994-09-12 00:00:00	2024-09-26 10:02:24.818	2024-09-26 10:02:24.818	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Documentary%2FHoop.webp?alt=media&token=00237737-85ea-4ae0-9b85-942c5cae6554	США	10200	12
174	Неудобная правда	Бывший кандидат в президенты США Эл Гор на своих лекциях рассказывает общественности об опасности глобального потепления и призывает к немедленным действиям по пресечению его разрушительного воздействия на окружающую среду.	2006-01-24 00:00:00	2024-09-26 10:05:52.742	2024-09-26 10:05:52.742	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Documentary%2FInconvenient.webp?alt=media&token=88089cb4-a70c-45ad-a375-f46c48ef22df	США	7560	12
175	Роджер и я	Очень необычный, мастерски снятый документальный фильм о том, как в городке Флинт, штат Мичиган, с помощью автомобильного гиганта «Дженерал Моторс» похоронили американскую мечту. Дело в том, что завод там закрыли, и тридцать тысяч рабочих оказались не у дел.	1989-09-01 00:00:00	2024-09-26 10:08:00.29	2024-09-26 10:08:00.29	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Documentary%2FRoger.webp?alt=media&token=74b12fa1-5f56-4c2b-99d5-4a556aa9eb9b	США	6600	12
178	Форрест Гамп	Сидя на автобусной остановке, Форрест Гамп — не очень умный, но добрый и открытый парень — рассказывает случайным встречным историю своей необыкновенной жизни.	1994-06-23 00:00:00	2024-09-26 10:20:13.585	2024-09-26 10:20:13.585	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Drama%2FForrest.webp?alt=media&token=0d66c9fb-5d5b-43a7-a841-20bc7b99a50e	США	8400	12
179	Зеленая миля	Пол Эджкомб — начальник блока смертников в тюрьме «Холодная гора», каждый из узников которого однажды проходит «зеленую милю» по пути к месту казни. Пол повидал много заключённых и надзирателей за время работы. Однако гигант Джон Коффи, обвинённый в страшном преступлении, стал одним из самых необычных обитателей блока.	2000-12-06 00:00:00	2024-09-26 10:25:49.402	2024-09-26 10:25:49.402	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Drama%2FGreen.webp?alt=media&token=9c4af5a5-aa92-467f-84fe-7ba0d26bd562	США	8340	16
180	Побег из Шоушенка	Бухгалтер Энди Дюфрейн обвинён в убийстве собственной жены и её любовника. Оказавшись в тюрьме под названием Шоушенк, он сталкивается с жестокостью и беззаконием, царящими по обе стороны решётки. Каждый, кто попадает в эти стены, становится их рабом до конца жизни. Но Энди, обладающий живым умом и доброй душой, находит подход как к заключённым, так и к охранникам, добиваясь их особого к себе расположения.	1994-09-10 00:00:00	2024-09-26 10:28:11.623	2024-09-26 10:28:11.623	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Drama%2FShawshank.webp?alt=media&token=f8f243ce-d576-4c34-a4fe-109769bc2f39	США	8400	16
182	Дом Дракона	После смерти короля Визериса династия Таргариенов начинает бескомпромиссную борьбу за Железный трон. Предводительницей «черной» ветви становится принцесса Рейнира, а на стороне «зеленой» оказывается ее лучшая подруга и дочь десницы короля Алисента. В битве за престол соперницы заручаются поддержкой неожиданных союзников, плетут интриги — и используют разрушительную мощь драконов.	2022-08-21 00:00:00	2024-09-26 10:33:16.405	2024-09-26 10:33:16.405	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Fantasy%2FDragonHouse.webp?alt=media&token=9959443a-ae54-4026-bb6a-8c2c779cf52b	США	30000	18
199	Инопланетянин	Инопланетянин прилетает на землю в составе научно-исследовательской группы с мирными намерениями. Специалисты из NASA замечают приближение летающей тарелки и решают, что обязаны отловить хотя бы одну из инопланетных тварей. Несчастные существа улетают так спешно, что забывают захватить одного из коллег.	1982-05-25 00:00:00	2024-09-26 11:45:51.044	2024-09-26 11:45:51.044	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Science%20Fiction%2FTerrestrial.webp?alt=media&token=62723eea-0292-41bb-8887-e95286c41bde	США	6000	6
184	Гарри Поттер и философский камень	Жизнь десятилетнего Гарри Поттера нельзя назвать сладкой: родители умерли, едва ему исполнился год, а от дяди и тёти, взявших сироту на воспитание, достаются лишь тычки да подзатыльники. Но в одиннадцатый день рождения Гарри всё меняется. Странный гость, неожиданно появившийся на пороге, приносит письмо, из которого мальчик узнаёт, что на самом деле он - волшебник и зачислен в школу магии под названием Хогвартс. А уже через пару недель Гарри будет мчаться в поезде Хогвартс-экспресс навстречу новой жизни, где его ждут невероятные приключения, верные друзья и самое главное — ключ к разгадке тайны смерти его родителей.	2002-03-21 00:00:00	2024-09-26 10:38:02.491	2024-09-26 10:38:02.491	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Fantasy%2FHarry.webp?alt=media&token=b043db79-1211-4f8b-96e3-f5a02be07456	Великобритания	7920	6
185	Властелин колец: Возвращение короля	Повелитель сил тьмы Саурон направляет свою бесчисленную армию под стены Минас-Тирита, крепости Последней Надежды. Он предвкушает близкую победу, но именно это мешает ему заметить две крохотные фигурки — хоббитов, приближающихся к Роковой Горе, где им предстоит уничтожить Кольцо Всевластья.	2003-12-01 00:00:00	2024-09-26 10:40:44.469	2024-09-26 10:40:44.469	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Fantasy%2FLordOfRing.webp?alt=media&token=adf7ca28-c4ec-41fd-8481-839c698afe16	Новая Зеландия	11700	12
186	Чужие	Чужой – совершенный организм. Идеальная машина для убийства, чье физическое превосходство сочетается с его феноменальной жаждой уничтожения. Офицер Элен Рипли и команда космического корабля Ностромо один раз уже встретилась с такой тварью. В живых осталась только Элен.	1986-07-14 00:00:00	2024-09-26 10:42:58.44	2024-09-26 10:42:58.44	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Horror%2FAlien.webp?alt=media&token=aa7a8965-cbc0-46b2-945b-4ad119c8f72a	США	8220	18
187	Изгоняющий дьявола	В семью известной актрисы приходит беда — её несовершеннолетняя дочь начинает вести себя неадекватным образом. Мать полагает, что это следствие её личной трагедии, врачи подозревают психическое заболевание, но не могут поставить диагноз. Специально приглашенный священник подозревает, что девочка одержима дьяволом.	1973-12-26 00:00:00	2024-09-26 10:46:01.147	2024-09-26 10:46:01.147	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Horror%2FExorcist.webp?alt=media&token=0428adf2-504f-4fb3-a826-123109fb4f35	США	6600	12
188	Сияние	Джек Торренс с женой и сыном приезжает в элегантный отдалённый отель, чтобы работать смотрителем во время мертвого сезона. Торренс здесь раньше никогда не бывал. Или это не совсем так? Ответ лежит во мраке, сотканном из преступного кошмара.	1980-05-23 00:00:00	2024-09-26 10:47:42.931	2024-09-26 10:47:42.931	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Horror%2FShining.webp?alt=media&token=af1034e4-eebf-4556-8384-a5dcca5b3efe	США	8160	18
189	Техасская резня бензопилой	Обеспокоенные известием, что хулиганы испоганили кладбище в Техасе, где похоронен их дедушка, Салли и её прикованный к инвалидной коляске брат Франклин собирают друзей и отправляются проверить, не повреждена ли дедушкина могила. Оказавшись в районе кладбища, они решают навестить старую ферму, где жил их дедуля. По соседству расположена ещё одна ферма, внешне довольно неприятная — она украшена жуткими предметами, сделанными из кожи и костей людей и животных, а живёт там жуткая семейка рабочих скотобойни.	1974-10-01 00:00:00	2024-09-26 10:50:38.398	2024-09-26 10:50:38.398	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Horror%2FTexas.webp?alt=media&token=016157b9-5bff-4d16-8e74-3613e853fe55	США	4800	18
190	Нечто	Команде ученых американской исследовательской станции в Антарктике предстоит столкнуться с необъяснимым кошмаром. Отрезанные от остального мира полярники вступают в схватку с инопланетной тварью, способной принимать обличье земных существ.	1982-06-25 00:00:00	2024-09-26 10:52:18.854	2024-09-26 10:52:18.854	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Horror%2FThing.webp?alt=media&token=b8e45924-fd51-446d-9e64-a6118c1a2ffb	США	10800	18
192	Дневник памяти	Это история отношений юноши и девушки из разных социальных слоев, живших в Южной Каролине. Ной и Элли провели вместе незабываемое лето, пока их не разделили вначале родители, а затем Вторая мировая война.	2004-05-20 00:00:00	2024-09-26 11:32:37.399	2024-09-26 11:32:37.399	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Romance%2FDary.webp?alt=media&token=49a06d34-8716-4478-9f6d-211afb75db62	США	9600	12
193	Привидение	Влюблённая пара Сэм и Молли возвращается домой после приятного вечера, когда на них нападает грабитель. Защищаясь, Сэм погибает и становится призраком. Он узнаёт, что его смерть не была случайной, а над его возлюбленной нависла смертельная опасность. Чтобы предупредить Молли, Сэм начинает обход практикующих медиумов и, о чудо! - находит женщину, которая действительно может его слышать. Только вот сама она не горит желанием помогать назойливому привидению.	1990-07-13 00:00:00	2024-09-26 11:34:08.382	2024-09-26 11:34:08.382	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Romance%2FGhost.webp?alt=media&token=d7a3d23e-1934-4a36-8b6f-2200641314d1	США	7560	12
194	Титаник	В первом и последнем плавании шикарного «Титаника» встречаются двое. Пассажир нижней палубы Джек выиграл билет в карты, а богатая наследница Роза отправляется в Америку, чтобы выйти замуж по расчёту. Чувства молодых людей только успевают расцвести, и даже не классовые различия создадут испытания влюблённым, а айсберг, вставший на пути считавшегося непотопляемым лайнера.	1997-11-01 00:00:00	2024-09-26 11:35:31.811	2024-09-26 11:35:31.811	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Romance%2FTitanic.webp?alt=media&token=eeec1dbb-dcbf-4da4-aa14-4e847de88d0a	США	10200	12
195	Жизнь прекрасна	Во время Второй мировой войны из Италии в концлагерь были отправлены евреи - отец с маленьким сыном. Жена-итальянка добровольно последовала за ними. В лагере отец сказал мальчику, что всё происходящее вокруг является большой интересной игрой за приз в виде настоящего танка. И этот классный приз достанется тому мальчику, который сможет не попасться на глаза надзирателям.	1997-12-20 00:00:00	2024-09-26 11:37:16.871	2024-09-26 11:37:16.871	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Romance%2Flifi.webp?alt=media&token=1cd93517-a3a1-4b59-929d-c768893991b3	Италия	5760	12
196	Планета обезьян	Несколько поколений после правления Цезаря. Обезьяны являются доминирующим видом, живущим в гармонии, а люди вынуждены оставаться в тени. Пока новый тиранический лидер обезьян строит свою империю, один молодой шимпанзе отправляется в путешествие, которое заставит его усомниться во всём, что он знал о прошлом, и сделать выбор, который определит будущее как обезьян, так и людей.	2024-07-08 00:00:00	2024-09-26 11:39:30.874	2024-09-26 11:39:30.874	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Science%20Fiction%2FApes.webp?alt=media&token=81421da0-187b-4799-bd6f-62259d77e010	США	7200	12
197	Метрополис	Метрополис - город будущего, разделен на две части. Под землей находятся жилища рабочих, над ними цеха с машинами. В верхнем городе расположены офисы, богатые кварталы и сады развлечений. Вся власть в городе принадлежит магнату Иогану Фендерсону.	1927-01-10 00:00:00	2024-09-26 11:41:58.362	2024-09-26 11:41:58.362	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Science%20Fiction%2FMetropolis.webp?alt=media&token=10ed9197-8a68-4048-ba6d-539e48e2b181	Германия	5400	12
200	Путешествие на Луну	Ученый делает в Академии доклад о возможности полета на Луну. После бурных дискуссий решено отправить на Луну экспедицию, для которой строится космический корабль в виде полого снаряда, который запускается в космос выстрелом из огромной пушки.	1902-09-01 00:00:00	2024-09-26 11:48:26.166	2024-09-26 11:48:26.166	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Science%20Fiction%2Fdans.webp?alt=media&token=eccdbd4d-ac20-47c6-87c6-545e01d8e5f4	Франция	900	0
202	Бойцовский клуб	Сотрудник страховой компании страдает хронической бессонницей и отчаянно пытается вырваться из мучительно скучной жизни. Однажды в очередной командировке он встречает некоего Тайлера Дёрдена — харизматического торговца мылом с извращенной философией. Тайлер уверен, что самосовершенствование — удел слабых, а единственное, ради чего стоит жить, — саморазрушение.	2019-07-25 00:00:00	2024-09-26 11:52:55.996	2024-09-26 11:52:55.996	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Thriller%2FFight.webp?alt=media&token=d2e79778-2d12-478b-93e5-da232a03a8b5	США	8640	18
203	Исчезнувшая	Всё было готово для празднования пятилетия супружеской жизни, когда вдруг необъяснимо пропала виновница торжества. Остались следы борьбы в доме, кровь, которую явно пытались стереть, и цепочка подсказок в игре «охота за сокровищами» - жена ежегодно устраивала её для своего обожаемого мужа. И похоже, что эти подсказки дают шанс пролить свет на судьбу исчезнувшей.	2014-09-26 00:00:00	2024-09-26 11:54:14.478	2024-09-26 11:54:14.478	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Thriller%2FGone.webp?alt=media&token=0ff99466-25c1-40e9-9306-13120e6c6da0	США	8700	18
204	Престиж	Роберт и Альфред - фокусники-иллюзионисты, которые на рубеже XIX и XX веков соперничали друг с другом в Лондоне. С годами их дружеская конкуренция на профессиональной почве перерастает в настоящую войну.	2006-10-17 00:00:00	2024-09-26 11:55:46.034	2024-09-26 11:55:46.034	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Thriller%2FPrestige.webp?alt=media&token=e30849ba-d9ae-4271-ab2c-500119399187	США	10800	16
205	Остров проклятых	Два американских судебных пристава отправляются на один из островов в штате Массачусетс, чтобы расследовать исчезновение пациентки клиники для умалишенных преступников. При проведении расследования им придется столкнуться с паутиной лжи, обрушившимся ураганом и смертельным бунтом обитателей клиники.	2010-02-13 00:00:00	2024-09-26 11:57:09.833	2024-09-26 11:57:09.833	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Thriller%2FShutter.webp?alt=media&token=daed32e3-d154-4ebd-b541-f83407f12c55	США	8700	16
151	Крепкий орешек	В суперсовременном небоскребе Лос-Анджелеса полицейский Джон Макклейн ведет смертельную схватку с бандой политических террористов, взявших в заложники два десятка человек, в число которых попадает и его жена. Началось все с того, что парень приехал в город к жене, оказался на рождественском приеме, а кончилось настоящей войной...	1992-07-12 00:00:00	2024-09-24 08:30:09.059	2024-11-30 13:23:20.614	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Action%2F600x900.webp?alt=media&token=4ce7cc7b-9f3e-4ad3-b207-b5fcc7689ded	США	7920	18
152	Чужие (1986)	Чужой – совершенный организм. Идеальная машина для убийства, чье физическое превосходство сочетается с его феноменальной жаждой уничтожения. Офицер Элен Рипли и команда космического корабля Ностромо один раз уже встретилась с такой тварью. В живых осталась только Элен. Капсула с Элен найдена спасателями после многих лет блуждания в космосе. Ей сообщают, что планета L.V. 426 колонизирована, и ей придется вернуться туда, где начался ее кошмар, ибо связь с колонистами прервалась. И вот в составе группы космического десанта Рипли отправляется на проклятую планету. Но теперь их там поджидает не один Чужой, а тысячи. Кто сможет выжить в этой войне: чудовища, способные только убивать, или люди, способные мыслить?	1986-07-14 00:00:00	2024-09-24 08:36:10.923	2024-09-24 08:36:10.923	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Action%2FAlians.webp?alt=media&token=85cf6377-f8d1-49b2-bfbc-bdee540fffb2	США	8220	18
158	Время первых	1960-е, разгар холодной войны. Две супердержавы СССР и США бьются за первенство в космической гонке. Пока СССР впереди, на очереди — выход человека в открытый космос. За две недели до старта взрывается тестовый корабль. Времени на выявление причин нет. Опытный военный лётчик Павел Беляев и его напарник Алексей Леонов, необстрелянный и горячий, мечтающий о подвиге, — два человека, готовые шагнуть в неизвестность. Но никто не мог даже предположить всего, с чем им предстояло столкнуться в полёте. В этой миссии всё, что только могло, пошло не так.	2017-04-06 00:00:00	2024-09-24 09:00:22.209	2024-09-24 09:00:22.209	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Adventure%2FFirstTime.webp?alt=media&token=1473d06a-0371-43e2-91ef-e4cde4bec00d	Россия	7200	12
166	Круэлла	Великобритания, 1960-е годы. Эстелла была необычным ребёнком, и особенно трудно ей было мириться со всякого рода несправедливостью. Вылетев из очередной школы, она с мамой отправляется в Лондон. По дороге они заезжают в особняк известной модельерши по имени Баронесса, где в результате ужасного несчастного случая мама погибает. Добравшись до Лондона, Эстелла знакомится с двумя мальчишками — уличными мошенниками Джаспером и Хорасом.	2021-06-03 00:00:00	2024-09-26 09:45:06.055	2024-09-26 09:45:06.055	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Comedy%2FCruella.webp?alt=media&token=7e951ad8-d555-4480-8e1f-4b18c5f2f72b	США	8340	12
176	Брат	Демобилизовавшись, Данила Багров вернулся в родной городок. Но скучная жизнь российской провинции не устраивала его, и он решился податься в Петербург, где, по слухам, уже несколько лет процветает его старший брат. Данила нашел брата. Но все оказалось не так просто — брат работает наемным убийцей.	1997-05-17 00:00:00	2024-09-26 10:11:59.301	2024-09-26 10:11:59.301	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Drama%2FBrother.webp?alt=media&token=20e1bbc9-ffa2-4830-972e-95c6fca44e3d	Россия	8040	18
177	Игра престолов	К концу подходит время благоденствия, и лето, длившееся почти десятилетие, угасает. Вокруг средоточия власти Семи королевств, Железного трона, зреет заговор, и в это непростое время король решает искать поддержки у друга юности Эддарда Старка. В мире, где все — от короля до наемника — рвутся к власти, плетут интриги и готовы вонзить нож в спину, есть место и благородству, состраданию и любви. Между тем никто не замечает пробуждение тьмы из легенд далеко на Севере — и лишь Стена защищает живых к югу от нее.	2011-04-16 00:00:00	2024-09-26 10:15:24.922	2024-09-26 10:15:24.922	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Drama%2FFantasy.webp?alt=media&token=e0dcd29a-e9e9-48b5-947a-eb3e1e4315fc	США	36000	18
181	Волк с Уолл-стрит	1987 год. Джордан Белфорт становится брокером в успешном инвестиционном банке. Вскоре банк закрывается после внезапного обвала индекса Доу-Джонса. По совету жены Терезы Джордан устраивается в небольшое заведение, занимающееся мелкими акциями. Его настойчивый стиль общения с клиентами и врождённая харизма быстро даёт свои плоды. Он знакомится с соседом по дому Донни, торговцем, который сразу находит общий язык с Джорданом и решает открыть с ним собственную фирму. В качестве сотрудников они нанимают нескольких друзей Белфорта, его отца Макса и называют компанию «Стрэттон Оукмонт». В свободное от работы время Джордан прожигает жизнь: лавирует от одной вечеринки к другой, вступает в сексуальные отношения с проститутками, употребляет множество наркотических препаратов, в том числе кокаин и кваалюд. Однажды наступает момент, когда быстрым обогащением Белфорта начинает интересоваться агент ФБР...	2013-12-09 00:00:00	2024-09-26 10:30:18.54	2024-09-26 10:30:18.54	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Drama%2FWolf.webp?alt=media&token=ef0cafd2-f529-4a66-93d8-7fbe691fc36e	США	10800	18
183	Конёк-Горбунок	Иван — не царевич, не богатырь, не красавец, а старшие братья и вовсе его дураком считают. Но всё меняется, когда у Ивана появляется друг и верный помощник — Конёк-Горбунок. Пусть он ростом невелик, зато умный и смелый. С таким другом никакой враг не страшен. Ну, почти никакой. С таким помощником и ничего невозможного нет. Ну, почти, нет. Ивану с Коньком предстоит проверить свою дружбу на прочность, столкнуться с коварным противником, преодолеть невероятные испытания и встретить такую любовь, ради которой стоит рискнуть всем. Ну, почти всем.	2021-02-18 00:00:00	2024-09-26 10:36:02.905	2024-09-26 10:36:02.905	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Fantasy%2FGorbyn.webp?alt=media&token=ae2fe76c-2ede-45f5-99dc-a55b4bd92045	Россия	6600	0
191	Касабланка	Оставивший родину американец Рик Блейн, владелец игорного клуба в Касабланке, встречается с покинувшей его несколько лет назад возлюбленной Ильзой, которая приехала в город вместе со своим мужем — борцом антифашистского сопротивления Виктором Лазло. По их следу идут немцы, и Ильза пытается упросить Рика отдать принадлежащие ему важные документы, которые позволят Виктору бежать из Касабланки и продолжить борьбу.	1942-03-03 00:00:00	2024-09-26 11:28:52.466	2024-09-26 11:28:52.466	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Romance%2FCasablanca.webp?alt=media&token=a79874b0-bca1-4356-9d8b-cbf05583b403	США	6600	12
198	Звёздные войны: Новая надежда	Татуин. Планета-пустыня. Уже постаревший рыцарь Джедай Оби Ван Кеноби спасает молодого Люка Скайуокера, когда тот пытается отыскать пропавшего дроида. С этого момента Люк осознает свое истинное назначение: он один из рыцарей Джедай. В то время как гражданская война охватила галактику, а войска повстанцев ведут бои против сил злого Императора, к Люку и Оби Вану присоединяется отчаянный пилот-наемник Хан Соло, и в сопровождении двух дроидов, R2D2 и C-3PO, этот необычный отряд отправляется на поиски предводителя повстанцев – принцессы Леи. Героям предстоит отчаянная схватка с устрашающим Дартом Вейдером – правой рукой Императора и его секретным оружием – «Звездой Смерти».	1977-05-25 00:00:00	2024-09-26 11:44:01.164	2024-09-26 11:44:01.164	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Science%20Fiction%2FStarwars.webp?alt=media&token=0947121b-9258-4abd-92a7-50f936398f4e	США	8160	12
206	Джокер: Безумие на двоих	Находясь на принудительном лечении в больнице Аркхем, несостоявшийся комик Артур Флек встречает любовь всей своей жизни — Харли Квинн.	2024-09-04 10:21:00	2024-11-21 10:22:35.923	2024-11-30 13:22:41.95	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Drama%2FJokerCrazy.webp?alt=media&token=75f9788f-be84-4670-8fde-1be4dd4ca337	США	8285	17
212	Чикатило	Он убивал и оставался безнаказанным более десяти лет, от его руки погибло более пятидесяти человек. Вместо него был осужден и расстрелян невиновный человек. Долгое время совершенные им убийства не могли объединить в одно дело. Маньяков такого калибра просто не существовало в СССР, поэтому органы правопорядка оказались не готовы к борьбе с «Бешеным зверем», как позднее окрестили его журналисты. Для поимки Чикатило были задействованы дружинники, сотрудники милиции, следователи прокуратуры, психиатры, а также разработаны новые методики расследования, которые помогут спасти невинных людей.  В итоге попытки вычислить и поймать «Бешеного зверя» растянулись на годы и превратились в полное неожиданных и драматических поворотов противостояние между обществом и паразитирующим внутри него кровавым маньяком.	2021-02-21 06:41:00	2024-11-22 06:41:47.33	2024-11-22 06:50:20.462	https://firebasestorage.googleapis.com/v0/b/cinema-trend.appspot.com/o/Thriller%2Fchikatilo.webp?alt=media&token=78f4ee24-bf76-4587-b30e-11f01c6f8167	Россия	72000	18
\.


--
-- TOC entry 3673 (class 0 OID 22100)
-- Dependencies: 223
-- Data for Name: MovieCategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MovieCategory" (id, name) FROM stdin;
11	Action
12	Adventure
13	Animation
14	Comedy
15	Drama
16	Fantasy
17	Horror
18	Romance
19	Science Fiction
20	Thriller
23	Documentary
\.


--
-- TOC entry 3679 (class 0 OID 22125)
-- Dependencies: 229
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Review" (id, content, rating, "userId", "movieId", "createdAt", "updatedAt") FROM stdin;
9	Very good	8	1	151	2024-10-01 09:38:13.391	2024-10-01 09:38:13.391
11	Ужасный фильм	1	1	168	2024-10-01 09:48:51.085	2024-10-01 09:48:51.085
12	Пойдет	6	1	163	2024-10-01 09:49:13.029	2024-10-01 09:49:13.029
14	Bad romantic film	1	1	191	2024-10-01 09:51:45.405	2024-10-01 09:51:45.405
17	b	3	1	156	2024-10-01 14:14:43.919	2024-10-01 14:14:43.919
23	Средний фильм	6	1	157	2024-10-26 06:21:05.809	2024-10-26 06:21:05.809
25	Гуд	6	1	183	2024-11-01 10:28:50.87	2024-11-01 10:28:50.87
26	Да	2	1	202	2024-11-01 10:29:19.248	2024-11-01 10:29:19.248
32	Bad	1	2	178	2024-11-06 10:29:54.112	2024-11-06 10:29:54.112
43	THE BEST FILM IN THE WORLD	10	1	169	2024-11-11 07:44:36.732	2024-11-11 07:44:36.732
45	Мне понаравилось, но немного затянуто	8	5	169	2024-11-22 07:21:22.129	2024-11-22 07:21:22.129
46	Лучшее, что я смотрел	10	5	206	2024-11-22 07:22:04.673	2024-11-22 07:22:04.673
47	Не оч как-то	5	6	169	2024-11-22 07:37:47.44	2024-11-22 07:37:47.44
48	Милый фильм	10	7	206	2024-11-22 07:46:50.829	2024-11-22 07:46:50.829
49	Бе	2	7	169	2024-11-22 07:47:10.276	2024-11-22 07:47:10.276
50	2231	4	2	169	2024-11-27 10:13:12.812	2024-11-27 10:13:12.812
51	2231	6	1	206	2024-11-30 13:22:14.661	2024-11-30 13:22:14.661
\.


--
-- TOC entry 3669 (class 0 OID 22080)
-- Dependencies: 219
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, username, password, date, gender, "createdAt", "updatedAt", picture, role) FROM stdin;
7	test6@gmail.com	user7	11111111	2024-11-22 07:39:10.027	OTHER	2024-11-22 07:38:53.195	2024-11-22 07:46:34.794	https://storage.googleapis.com/cinema-trend.appspot.com/users/a0d40eb4-95a2-46e9-a125-208a0d85846a.jpg	USER
8	test10@gmail.com	\N	11111111	\N	\N	2024-11-27 10:08:29.462	2024-11-27 10:08:29.462	\N	USER
2	test2@gmail.com	Hel	11111111	2000-09-02 10:45:00	FEMALE	2024-10-30 05:49:54.55	2024-11-27 10:16:47.01	https://storage.googleapis.com/cinema-trend.appspot.com/users/5552cdcf-171a-404f-8898-3d01ac43c7e4.jpg	USER
1	test1@gmail.com	SAD	11111111	2003-07-16 10:56:00	MALE	2024-09-12 09:37:09.415	2024-11-11 07:24:25.334	https://storage.googleapis.com/cinema-trend.appspot.com/users/09ac6dbc-a93b-47ea-b9d3-5dd1421603a5.jpg	MODERATOR
3		\N		\N	\N	2024-11-22 07:08:11.352	2024-11-22 07:08:11.352	\N	USER
4	test3@gmail.com	\N	11111111	\N	\N	2024-11-22 07:16:07.613	2024-11-22 07:16:07.613	\N	USER
5	test5@gmail.com	user5	11111111	2006-08-22 07:34:00	MALE	2024-11-22 07:20:46.985	2024-11-22 07:35:19.17	https://storage.googleapis.com/cinema-trend.appspot.com/users/4f2feb47-49d0-4d30-b324-ccdcd1967cb3.jpg	USER
6	test4@gmail.com	Girl	11111111	1983-01-22 07:36:00	FEMALE	2024-11-22 07:23:23.742	2024-11-22 07:37:27.125	https://storage.googleapis.com/cinema-trend.appspot.com/users/e9aef767-a7eb-496d-89f1-e6523ea3bf5c.jpg	USER
\.


--
-- TOC entry 3675 (class 0 OID 22109)
-- Dependencies: 225
-- Data for Name: WatchedMovie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."WatchedMovie" (id, "movieId", "userId", "watchedAt") FROM stdin;
253	169	2	2024-11-27 10:14:01.893
255	196	2	2024-11-27 10:15:35.064
256	206	2	2024-11-27 10:17:18.671
193	196	1	2024-11-21 10:51:39.915
261	206	1	2024-11-30 13:22:43.399
264	151	1	2024-11-30 13:23:23.865
92	199	1	2024-10-10 09:19:27.637
152	160	1	2024-11-06 10:27:08.796
153	178	1	2024-11-06 10:27:17.048
97	157	1	2024-10-26 06:20:52.532
155	182	1	2024-11-06 10:27:40.815
99	154	1	2024-10-26 06:41:02.387
157	182	2	2024-11-06 10:28:32.841
103	173	1	2024-10-26 06:41:55.157
160	178	2	2024-11-06 10:29:48.832
162	183	2	2024-11-06 10:31:46.968
44	189	1	2024-10-03 14:17:36.485
163	153	2	2024-11-06 10:32:07.159
164	153	1	2024-11-06 10:32:36.124
47	164	1	2024-10-03 15:54:48.87
48	177	1	2024-10-03 15:55:04.135
51	155	1	2024-10-03 15:56:27.674
167	160	2	2024-11-06 10:36:29.089
170	151	2	2024-11-06 10:38:05.702
172	193	1	2024-11-06 11:13:06.696
234	169	5	2024-11-22 07:21:00.837
119	183	1	2024-11-01 10:28:37.341
174	202	1	2024-11-11 07:24:31.879
236	206	5	2024-11-22 07:35:23.497
237	206	6	2024-11-22 07:36:24.349
238	169	6	2024-11-22 07:37:31.883
240	169	7	2024-11-22 07:46:56.73
183	158	1	2024-11-21 07:28:12.585
243	206	7	2024-11-22 07:51:07.831
250	212	1	2024-11-27 10:12:25.354
251	169	1	2024-11-27 10:12:35.188
\.


--
-- TOC entry 3680 (class 0 OID 22135)
-- Dependencies: 230
-- Data for Name: _MovieCategories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_MovieCategories" ("A", "B") FROM stdin;
152	17
152	20
152	19
152	16
153	11
153	16
153	20
153	12
154	11
154	12
154	20
155	11
155	20
155	16
156	11
156	12
156	15
156	23
157	12
157	20
157	23
157	15
158	12
158	20
159	12
159	14
159	16
160	11
160	12
160	16
161	12
161	13
161	14
161	16
162	12
162	13
162	15
163	13
163	16
164	12
164	13
164	16
165	13
165	14
166	14
166	15
167	14
168	14
168	17
169	14
169	15
170	14
171	14
171	15
171	23
172	23
173	23
173	15
174	23
175	23
176	11
176	15
177	11
177	12
177	15
177	16
178	14
178	15
179	15
179	16
180	15
181	15
181	14
182	11
182	15
182	16
183	16
183	14
183	12
184	16
184	12
185	16
185	12
185	15
186	17
186	20
186	16
186	11
186	12
187	17
188	15
188	17
188	20
189	17
190	16
190	17
191	18
191	15
192	15
192	18
193	18
194	18
194	15
194	23
195	14
195	15
195	18
196	19
196	15
196	16
196	11
197	15
197	16
197	19
198	11
198	16
198	19
199	19
199	15
199	16
200	19
200	14
200	11
202	20
202	15
203	20
203	15
204	20
204	15
204	16
205	20
205	15
212	15
212	20
212	23
206	15
206	20
151	11
151	16
151	20
\.


--
-- TOC entry 3667 (class 0 OID 22061)
-- Dependencies: 217
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
70534615-259b-4357-8841-a21a0152e08c	f9f5e5189fab99a48b690ad50d61d604d26fed3e281c12fdf36f5374400af2b8	2024-09-12 11:44:02.403071+03	20240912084402_init	\N	\N	2024-09-12 11:44:02.38669+03	1
19422bf8-8de5-4a3f-ae13-ed79f01aa6fe	9d8631c274c496ba3050d70e721a744e5227d85b5a91a7a435a3623389307ca0	2024-09-19 21:26:07.974654+03	20240919182607_movies	\N	\N	2024-09-19 21:26:07.971765+03	1
34844eba-4fdf-438d-acd4-8cc99eb0ca16	c384c199c6e9db678d7fb671fb2104579544e6e3b5ca320ee5f864e326dee853	2024-09-27 18:02:05.483508+03	20240927150205_update_movie	\N	\N	2024-09-27 18:02:05.479956+03	1
58429c0f-68ad-4c15-8aac-1cc5b83434e1	5a80f76b81466a26e12a4727a3d64343d533a6761867c42e21d7685f02be198c	2024-10-31 10:37:57.060002+03	20241031073757_update	\N	\N	2024-10-31 10:37:57.0576+03	1
b7ab5234-8a9f-4d33-904f-4d4006dac24c	a8c4372acfb61c1292a46fae8d775fb8d8f3bdcccba037df6854a8ea702f82e4	2024-11-11 09:44:21.409308+03	20241111064421_role	\N	\N	2024-11-11 09:44:21.40441+03	1
\.


--
-- TOC entry 3692 (class 0 OID 0)
-- Dependencies: 226
-- Name: FavoriteMovie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."FavoriteMovie_id_seq"', 79, true);


--
-- TOC entry 3693 (class 0 OID 0)
-- Dependencies: 222
-- Name: MovieCategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MovieCategory_id_seq"', 25, true);


--
-- TOC entry 3694 (class 0 OID 0)
-- Dependencies: 220
-- Name: Movie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Movie_id_seq"', 212, true);


--
-- TOC entry 3695 (class 0 OID 0)
-- Dependencies: 228
-- Name: Review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Review_id_seq"', 51, true);


--
-- TOC entry 3696 (class 0 OID 0)
-- Dependencies: 218
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 8, true);


--
-- TOC entry 3697 (class 0 OID 0)
-- Dependencies: 224
-- Name: WatchedMovie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."WatchedMovie_id_seq"', 264, true);


--
-- TOC entry 3511 (class 2606 OID 22123)
-- Name: FavoriteMovie FavoriteMovie_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FavoriteMovie"
    ADD CONSTRAINT "FavoriteMovie_pkey" PRIMARY KEY (id);


--
-- TOC entry 3507 (class 2606 OID 22107)
-- Name: MovieCategory MovieCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MovieCategory"
    ADD CONSTRAINT "MovieCategory_pkey" PRIMARY KEY (id);


--
-- TOC entry 3505 (class 2606 OID 22098)
-- Name: Movie Movie_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movie"
    ADD CONSTRAINT "Movie_pkey" PRIMARY KEY (id);


--
-- TOC entry 3513 (class 2606 OID 22134)
-- Name: Review Review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (id);


--
-- TOC entry 3503 (class 2606 OID 22088)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 3509 (class 2606 OID 22115)
-- Name: WatchedMovie WatchedMovie_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WatchedMovie"
    ADD CONSTRAINT "WatchedMovie_pkey" PRIMARY KEY (id);


--
-- TOC entry 3500 (class 2606 OID 22069)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3501 (class 1259 OID 22138)
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- TOC entry 3514 (class 1259 OID 22139)
-- Name: _MovieCategories_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_MovieCategories_AB_unique" ON public."_MovieCategories" USING btree ("A", "B");


--
-- TOC entry 3515 (class 1259 OID 22140)
-- Name: _MovieCategories_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_MovieCategories_B_index" ON public."_MovieCategories" USING btree ("B");


--
-- TOC entry 3518 (class 2606 OID 22156)
-- Name: FavoriteMovie FavoriteMovie_movieId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FavoriteMovie"
    ADD CONSTRAINT "FavoriteMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES public."Movie"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3519 (class 2606 OID 22151)
-- Name: FavoriteMovie FavoriteMovie_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FavoriteMovie"
    ADD CONSTRAINT "FavoriteMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3520 (class 2606 OID 22166)
-- Name: Review Review_movieId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES public."Movie"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3521 (class 2606 OID 22161)
-- Name: Review Review_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3516 (class 2606 OID 22146)
-- Name: WatchedMovie WatchedMovie_movieId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WatchedMovie"
    ADD CONSTRAINT "WatchedMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES public."Movie"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3517 (class 2606 OID 22141)
-- Name: WatchedMovie WatchedMovie_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WatchedMovie"
    ADD CONSTRAINT "WatchedMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3522 (class 2606 OID 22171)
-- Name: _MovieCategories _MovieCategories_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_MovieCategories"
    ADD CONSTRAINT "_MovieCategories_A_fkey" FOREIGN KEY ("A") REFERENCES public."Movie"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3523 (class 2606 OID 22176)
-- Name: _MovieCategories _MovieCategories_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_MovieCategories"
    ADD CONSTRAINT "_MovieCategories_B_fkey" FOREIGN KEY ("B") REFERENCES public."MovieCategory"(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2024-11-30 18:29:35 +03

--
-- PostgreSQL database dump complete
--

