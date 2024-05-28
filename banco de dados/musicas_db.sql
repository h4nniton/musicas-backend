create schema musicas_db;

use musicas_db;

create table tbl_musica (
	id int not null auto_increment primary key,
    titulo varchar(100) not null,
    artista varchar(100) not null,
    album varchar(100),
    data_lancamento date not null,
    foto_capa text
);

insert into tbl_musica (titulo, artista, album, data_lancamento, foto_capa) values (
"She's an Actress", "Wallows", "Model", "2024-05-24", "https://wmg.jp/packages/29199/images/model.jpg"),
("Don't You Think It's Strange?", "Wallows", "Model", "2024-05-24", "https://wmg.jp/packages/29199/images/model.jpg"),
("Bills", "Enhypen", "Dark Blood", "2023-05-22", "https://akamai.sscdn.co/uploadfile/letras/albuns/3/0/5/5/1791871684776516.jpg"),
("I Don't Think I'm Okay", "JAKE", "", "2024-03-05", "https://i1.sndcdn.com/artworks-QekKKR7nP6RGVMXA-LHwFgQ-t500x500.jpg");