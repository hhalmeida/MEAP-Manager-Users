create table users(
	id bigserial primary key,
	username varchar(100),
	email varchar(100),
	passwd varchar(10),
	createAt timestamp without time zone,
	updateAt timestamp without time zone,
);

create table profiles(
	id bigserial primary key,
	userId integer,
	title varchar(100),
	createAt timestamp without time zone,
	updateAt timestamp without time zone,

	CONSTRAINT profiles_users_id_fkey FOREIGN KEY (userId)
      REFERENCES users (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

create table historys(
	id bigserial primary key,
	userId integer,
	title varchar(100),
	description varchar(255),
	createAt timestamp without time zone,
	updateAt timestamp without time zone,

	CONSTRAINT historys_users_id_fkey FOREIGN KEY (userId)
      REFERENCES users (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);