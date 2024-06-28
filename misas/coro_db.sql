DROP DATABASE IF EXISTS coro_db;

CREATE DATABASE IF NOT EXISTS coro_db;

USE coro_db;

CREATE TABLE IF NOT EXISTS integrante(
	in_nombre VARCHAR (50) NOT NULL,
    in_genero ENUM ('M','F') NOT NULL
	);

CREATE TABLE IF NOT EXISTS canto_entrada(
	ca_entrada VARCHAR (30) NOT NULL,
    PRIMARY KEY (ca_entrada)
	);
    
CREATE TABLE IF NOT EXISTS canto_piedad(
	ca_piedad VARCHAR (30) NOT NULL,
    PRIMARY KEY (ca_piedad)
	);
    
CREATE TABLE IF NOT EXISTS canto_gloria(
	ca_gloria VARCHAR (30) NOT NULL,
    PRIMARY KEY (ca_gloria)
	);
    
CREATE TABLE IF NOT EXISTS canto_salmo(
	ca_salmo VARCHAR (30) NOT NULL,
    PRIMARY KEY (ca_salmo)
	);
    
CREATE TABLE IF NOT EXISTS canto_aleluya(
	ca_aleluya VARCHAR (30) NOT NULL,
    PRIMARY KEY (ca_aleluya)
	);
    
CREATE TABLE IF NOT EXISTS canto_ofertorio(
	ca_ofertorio VARCHAR (30) NOT NULL,
    PRIMARY KEY (ca_ofertorio)
	);
    
CREATE TABLE IF NOT EXISTS canto_santo(
	ca_santo VARCHAR (30) NOT NULL,
    PRIMARY KEY (ca_santo)
	);
    
CREATE TABLE IF NOT EXISTS canto_cordero(
	ca_cordero VARCHAR (30) NOT NULL,
    PRIMARY KEY (ca_cordero)
	);
    
CREATE TABLE IF NOT EXISTS canto_comunion(
	ca_comunion VARCHAR (30) NOT NULL,
    PRIMARY KEY (ca_comunion)
	);
    
CREATE TABLE IF NOT EXISTS canto_salida(
	ca_salida VARCHAR (30) NOT NULL,
    PRIMARY KEY (ca_salida)
	);

CREATE TABLE IF NOT EXISTS misa(
	mi_id INT NOT NULL AUTO_INCREMENT,
    mi_fecha DATE NOT NULL,
    mi_tipo VARCHAR (30),
	mi_entrada VARCHAR (30) NOT NULL,
	mi_piedad VARCHAR (30) NOT NULL,
	mi_gloria VARCHAR (30) NOT NULL,
	mi_salmo VARCHAR (30) NOT NULL,
	mi_aleluya VARCHAR (30) NOT NULL,
	mi_ofertorio VARCHAR (30) NOT NULL,
	mi_santo VARCHAR (30) NOT NULL,
	mi_cordero VARCHAR (30) NOT NULL,
	mi_comunion VARCHAR (30) NOT NULL,
	mi_salida VARCHAR (30) NOT NULL,
	mi_comentario VARCHAR (300),
    PRIMARY KEY (mi_id),
    INDEX idx_fecha (mi_fecha),
    FOREIGN KEY (mi_entrada) REFERENCES canto_entrada(ca_entrada),
	FOREIGN KEY (mi_piedad) REFERENCES canto_piedad(ca_piedad),
	FOREIGN KEY (mi_gloria) REFERENCES canto_gloria(ca_gloria),
	FOREIGN KEY (mi_salmo) REFERENCES canto_salmo(ca_salmo),
	FOREIGN KEY (mi_aleluya) REFERENCES canto_aleluya(ca_aleluya),
	FOREIGN KEY (mi_ofertorio) REFERENCES canto_ofertorio(ca_ofertorio),
	FOREIGN KEY (mi_santo) REFERENCES canto_santo(ca_santo),
	FOREIGN KEY (mi_cordero) REFERENCES canto_cordero(ca_cordero),
	FOREIGN KEY (mi_comunion) REFERENCES canto_comunion(ca_comunion),
	FOREIGN KEY (mi_salida) REFERENCES canto_salida(ca_salida)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    );
    
CREATE TABLE IF NOT EXISTS asistencia (
	as_fecha DATE NOT NULL,
    as_evento VARCHAR (30) NOT NULL
	);


INSERT INTO canto_entrada (ca_entrada)
	VALUES ('Venimos hoy a tu altar'), ('Vienen con alegría'),('Den al señor sus alabanzas'),('Aquí estoy señor'), 
			('Al fin'),('Quince años'),('Que alegría cuando me dijeron'),('Tú eres fiel'), ('Que viva mi cristo'), 
			('En torno a tu altar'),( '*No hay*'), ('*No aplica*'); 
            
INSERT INTO canto_piedad (ca_piedad)
	VALUES ('Popular'), ('Triste'), ('Brandon'), ('Rocker'), ('*No hay*'), ('*No aplica*');
    
INSERT INTO canto_gloria (ca_gloria)
	VALUES ('90'), ('Mejía'), ('Rítmico'), ('Panamericano'), ('Popular'), ('*No hay*'), ('*No aplica*');
    
INSERT INTO canto_salmo (ca_salmo)
	VALUES ('Lento'),('Rapido'),('Otro ritmo'),('*No hay*'),('*No aplica*');

INSERT INTO canto_aleluya (ca_aleluya)
	VALUES ('Solemne'), ('Al salvador'), ('Popular'), ('Karla'), ('Javi'), ('Ángel'), ('Honor y gloria'), 
			('Honor y gloria alternativo'), ('*No hay*'), ('*No aplica*');
            
INSERT INTO canto_ofertorio (ca_ofertorio)
	VALUES ('Vino y pan'), ('Este pan y vino'), ('Esto que te doy'), ('Te ofrezco, señor, mi juventud'),
			('Tómalo, acéptalo'), ('Nuestro corazón'), ('Te presentamos'), ('En tus manos'), ('*No hay*'), ('*No aplica*');

INSERT INTO canto_santo (ca_santo)
	VALUES ('La-Mi-Do'), ('Edith'), ('Gabi'), ('Rondalla'), ('3 Hosanas'), ('Hosana'), ('Choco'), ('*No hay*'),('*No aplica*');
    
INSERT INTO canto_cordero (ca_cordero)
	VALUES ('Popular'), ('Juvenil'), ('Choco'), ('94'), ('Roy'), ('Marcha'), ('Doble'), ('*No hay*'), ('*No aplica*');
    
INSERT INTO canto_comunion (ca_comunion)
	VALUES ('El vino'), ('Llévame'), ('La promesa'), ('Abba padre'), ('Una espiga'), ('Andando de tu mano'), ('Dios está aqui'),
			('Las heridas de tu frente'), ('Un instrumento de tu amor'), ('Ven señor Jesus'), ('Un día caminaba'), ('Heroe'),
			('Dialogo con Cristo'), ('Envíame a mi'), ('*No hay*'), ('*No aplica*');
            
INSERT INTO canto_salida (ca_salida)
	VALUES ('Alma misionera'), ('Te doy gracias Jesus'), ('Dios es amor'), ('Cristo no defrauda'), ('Fragmento a Dios'),
			('Viva cristo rey'), ('*No hay*'), ('*No aplica*');
    
INSERT INTO misa (mi_fecha, mi_tipo, mi_entrada, mi_piedad, mi_gloria, mi_salmo, mi_aleluya ,
					mi_ofertorio, mi_santo, mi_cordero, mi_comunion , mi_salida, mi_comentario)
	VALUES ('2023-07-02', 'Ordinario', '*No aplica*', 'Rocker', 'Mejía', 'Lento', 'Al salvador',
			'Nuestro corazón', 'Edith', 'Juvenil', 'Un día caminaba', 'Dios es amor', 
            'Copia del canto de gloria y de santo, mala ejecución del canto de comunión, desde el intento de armonización hasta subir la nota al final'),
            ('2023-07-09','Ordinario', 'Venimos hoy a tu altar', 'Popular', '90', 'Rápido', 'Popular',
            'Tómalo, acéptalo', 'Gabi', 'Marcha', 'Envíame a mi', 'Cristo no defrauda','');


USE coro_db;

CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INT NOT NULL AUTO_INCREMENT,
    correo VARCHAR(255) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_usuario),
    UNIQUE KEY unique_correo (correo)
);

ALTER TABLE misa
ADD COLUMN id_usuario INT,
ADD FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
ON DELETE CASCADE
ON UPDATE CASCADE;


INSERT INTO usuario(correo,contrasena)
	VALUES('javier.matadamas@hotmail.com', 'Dbs32014');


DELETE FROM canto_entrada WHERE ca_entrada = 'Rápido';

ALTER TABLE usuario
	ADD COLUMN int_nombre VARCHAR (255);

ALTER TABLE usuario
	MODIFY int_nombre VARCHAR(255) NOT NULL;

ALTER TABLE canto_entrada MODIFY COLUMN ca_entrada VARCHAR (60);
ALTER TABLE misa MODIFY COLUMN mi_entrada VARCHAR (60);
