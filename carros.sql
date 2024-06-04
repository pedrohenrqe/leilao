create database leilao;

use leilao;

CREATE TABLE tbl_carros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    ano INT NOT NULL,
    cor VARCHAR(20) NOT NULL,
    quilometragem INT NOT NULL,
    preco_minimo FLOAT NOT NULL,
    data_inicio DATETIME NOT NULL,
    data_fim DATETIME NOT NULL
);

CREATE TABLE tbl_lances (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_carro INT NOT NULL,
    valor FLOAT NOT NULL,
    data_lance DATETIME NOT NULL,
    comprador VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_carro) REFERENCES tbl_carros(id)
);

INSERT INTO tbl_carros (marca, modelo, ano, cor, quilometragem, preco_minimo, data_inicio, data_fim) VALUES
('Toyota', 'Corolla', 2018, 'Prata', 50000, 30000.00, '2024-07-01 09:00:00', '2024-07-03 17:00:00'),
('Honda', 'Civic', 2017, 'Preto', 60000, 28000.00, '2024-07-05 10:00:00', '2024-07-07 18:00:00');

INSERT INTO tbl_lances (id_carro, valor, data_lance, comprador) VALUES
(1, 32000.00, '2024-07-02 10:30:00', 'João'),
(1, 34000.00, '2024-07-02 15:45:00', 'Maria'),
(2, 30000.00, '2024-07-06 11:20:00', 'Ana'),
(2, 32000.00, '2024-07-06 15:00:00', 'Pedro');