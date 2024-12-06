-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 03-Dez-2024 às 17:32
-- Versão do servidor: 10.4.10-MariaDB
-- versão do PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `selectjob`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `estados`
--

-- CREATE TABLE `estados` (
--   `id` int(10) UNSIGNED NOT NULL,
--   `nome` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
--   `sigla` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
--   `pais` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
--   `created_at` timestamp NULL DEFAULT NULL,
--   `updated_at` timestamp NULL DEFAULT NULL,
--   `deleted_at` timestamp NULL DEFAULT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --
-- -- Extraindo dados da tabela `estados`
-- --

INSERT INTO `estados` (`id`, `nome`, `sigla`, `pais`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Acre', 'AC', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(2, 'Alagoas', 'AL', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(3, 'Amazonas', 'AM', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(4, 'Amapá', 'AP', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(5, 'Bahia', 'BA', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(6, 'Ceará', 'CE', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(7, 'Distrito Federal', 'DF', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(8, 'Espírito Santo', 'ES', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(9, 'Goiás', 'GO', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(10, 'Maranhão', 'MA', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(11, 'Minas Gerais', 'MG', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(12, 'Mato Grosso do Sul', 'MS', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(13, 'Mato Grosso', 'MT', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(14, 'Pará', 'PA', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(15, 'Paraíba', 'PB', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(16, 'Pernambuco', 'PE', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(17, 'Piauí', 'PI', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(18, 'Paraná', 'PR', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(19, 'Rio de Janeiro', 'RJ', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(20, 'Rio Grande do Norte', 'RN', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(21, 'Rondônia', 'RO', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(22, 'Roraima', 'RR', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(23, 'Rio Grande do Sul', 'RS', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(24, 'Santa Catarina', 'SC', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(25, 'Sergipe', 'SE', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(26, 'São Paulo', 'SP', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL),
(27, 'Tocantins', 'TO', 'Brasil', '2019-05-15 13:15:26', '2019-05-15 13:15:26', NULL);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `estados`
--
-- ALTER TABLE `estados`
--   ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `estados`
--
-- ALTER TABLE `estados`
--   MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
-- COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
