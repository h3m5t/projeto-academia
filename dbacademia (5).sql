-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 11/12/2025 às 23:18
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `dbacademia`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbcargo`
--

CREATE TABLE `tbcargo` (
  `id_cargo` smallint(6) NOT NULL,
  `nome_cargo` varchar(50) NOT NULL,
  `carga_horaria` smallint(6) NOT NULL,
  `salario_cargo` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbcargo`
--

INSERT INTO `tbcargo` (`id_cargo`, `nome_cargo`, `carga_horaria`, `salario_cargo`) VALUES
(1, 'personal', 8, 3200),
(2, 'recepcionista', 12, 2200),
(3, 'Gerente', 9, 5000),
(4, 'Faxineiro', 4, 1500),
(5, 'Assistente Administrativo', 4, 2500);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbcliente`
--

CREATE TABLE `tbcliente` (
  `id_cliente` smallint(6) NOT NULL,
  `nome_cliente` varchar(50) NOT NULL,
  `tel_cliente` varchar(20) DEFAULT NULL,
  `dt_nascimento` date NOT NULL,
  `cpf_cliente` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbcliente`
--

INSERT INTO `tbcliente` (`id_cliente`, `nome_cliente`, `tel_cliente`, `dt_nascimento`, `cpf_cliente`) VALUES
(1, 'Evelyn Samara', '84959678988', '2006-04-29', '15623467890'),
(2, 'Luiz Fellype', '84998973647', '2007-06-29', '15634514678'),
(8, 'Jose Silva', '84994567456', '2009-05-01', '12343213541'),
(9, 'Jose Antonio', '84994567762', '2009-04-26', '92343213544'),
(11, 'Paola Silva', '84994567487', '2009-05-05', '23343213541'),
(32, 'Wesley Safadão', '84994612638', '2003-01-06', '14344'),
(34, 'João', '5599568486', '1598-02-25', '254268259'),
(39, 'Gabison', '84994612638', '2027-12-13', '23478523478');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbfuncionario`
--

CREATE TABLE `tbfuncionario` (
  `mat_funcionario` smallint(6) NOT NULL,
  `nome_func` varchar(50) NOT NULL,
  `tel_func` varchar(20) DEFAULT NULL,
  `dt_nascimento` date NOT NULL,
  `cpf_func` varchar(11) NOT NULL,
  `id_cargo` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbfuncionario`
--

INSERT INTO `tbfuncionario` (`mat_funcionario`, `nome_func`, `tel_func`, `dt_nascimento`, `cpf_func`, `id_cargo`) VALUES
(1, 'Henrique Trajan', '84994612638', '2007-05-03', '15514360431', 1),
(2, 'Erick Judson', '98976431', '2000-12-30', '14350690860', 1),
(3, 'Carlos Roberto', '1234-5678', '1985-03-15', '123.456.789', 3),
(4, 'Maria Oliveira', '9876-5431', '1990-07-01', '987.654.322', 3),
(10, 'Ana Souza', '7777-4321', '1995-09-10', '445.667.789', 4),
(11, 'Ricardo Costa', '8888-8765', '1988-12-30', '998.877.665', 4),
(14, 'Howard Wolowitz', '542542', '2024-11-26', '54543', 2),
(42, 'Lucas Moura', '84987868584', '1999-01-05', '65498745368', 2),
(43, 'Samuel Xavier', '84989764536', '2001-01-01', '76854637892', 5),
(44, 'Cristiano Ronaldo', '84998746374', '2001-01-30', '78649364782', 5),
(48, 'Luka Modric', '84983475832', '2025-02-23', '32413243', 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbhorariofuncionario`
--

CREATE TABLE `tbhorariofuncionario` (
  `id_horario` smallint(6) NOT NULL,
  `horario_inicio` time DEFAULT NULL,
  `horario_fim` time DEFAULT NULL,
  `dia_semana` varchar(20) DEFAULT NULL,
  `mat_funcionario` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbhorariofuncionario`
--

INSERT INTO `tbhorariofuncionario` (`id_horario`, `horario_inicio`, `horario_fim`, `dia_semana`, `mat_funcionario`) VALUES
(1, '07:00:00', '19:00:00', 'segunda-feira', 2),
(2, '07:00:00', '15:00:00', 'segunda-feira', 1),
(5, '05:00:00', '08:00:00', 'segunda', 14),
(6, '05:00:00', '08:00:00', 'segunda', 2),
(7, '05:00:00', '08:00:00', 'segunda', 3),
(8, '05:00:00', '08:00:00', 'segunda', 42),
(9, '05:00:00', '08:00:00', 'terca', 44),
(13, '05:00:00', '08:00:00', 'quinta', 1),
(14, '05:00:00', '08:00:00', 'quinta', 2),
(15, '17:00:00', '20:00:00', 'terca', 4),
(16, '17:00:00', '20:00:00', 'sabado', 44),
(17, '08:00:00', '11:00:00', 'quinta', 48),
(18, '17:24:00', '22:23:00', 'Quinta-feira', 1),
(19, '20:39:00', '23:39:00', 'Sábado', 1),
(20, '19:05:00', '19:09:00', 'Quinta-feira', 3),
(21, '03:03:00', '03:33:00', 'Terça-feira', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbplanopagamento`
--

CREATE TABLE `tbplanopagamento` (
  `id_pagamento` smallint(6) NOT NULL,
  `valor_pagamento` smallint(6) NOT NULL,
  `status_pagamento` varchar(20) DEFAULT NULL,
  `tipo_pagamento` varchar(30) DEFAULT NULL,
  `id_cliente` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbplanopagamento`
--

INSERT INTO `tbplanopagamento` (`id_pagamento`, `valor_pagamento`, `status_pagamento`, `tipo_pagamento`, `id_cliente`) VALUES
(1, 95, 'pago', 'mensal', 1),
(2, 6, 'pago', 'diaria', 2),
(3, 6, 'pago', NULL, NULL),
(4, 95, 'pago', 'Mensal', 1),
(5, 95, 'pago', 'Mensal', 1),
(6, 6, 'pago', 'diaria', 8),
(7, 32767, 'pago', 'anual', 2),
(8, 32767, 'pago', 'anual', 1),
(9, 95, 'pago', 'mensal', 9),
(10, 6, 'pago', 'diaria', 11),
(11, 6, 'pago', 'diaria', 32),
(12, 10, 'Anual', 'Dinheiro', 1),
(13, 100, 'Anual', 'Dinheiro', 34),
(14, 10, 'Mensal', 'Dinheiro', 1),
(15, 1122, 'Anual', 'Dinheiro', 1),
(16, 10, 'Anual', 'Dinheiro', 1),
(17, 32767, 'Anual', 'Pix', 39);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbplanotreino`
--

CREATE TABLE `tbplanotreino` (
  `id_PlanoT` smallint(6) NOT NULL,
  `nome_plano` varchar(50) NOT NULL,
  `objetivo` varchar(50) NOT NULL,
  `duração` varchar(30) NOT NULL,
  `id_cliente` smallint(6) DEFAULT NULL,
  `mat_funcionario` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbplanotreino`
--

INSERT INTO `tbplanotreino` (`id_PlanoT`, `nome_plano`, `objetivo`, `duração`, `id_cliente`, `mat_funcionario`) VALUES
(1, 'mata gordura', 'perda de peso', '5 meses', 1, 2),
(2, 'igual o hulk', 'ganho de masssa muscular', '11 meses', 2, 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbregistropagamento`
--

CREATE TABLE `tbregistropagamento` (
  `id_RegistroP` smallint(6) NOT NULL,
  `dt_pagamento` date NOT NULL,
  `id_cliente` smallint(6) DEFAULT NULL,
  `id_pagamento` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbregistropagamento`
--

INSERT INTO `tbregistropagamento` (`id_RegistroP`, `dt_pagamento`, `id_cliente`, `id_pagamento`) VALUES
(1, '2022-08-01', 1, 1),
(2, '2022-09-01', 2, 2),
(3, '2025-01-26', 1, 4),
(4, '2025-02-26', 1, 5),
(5, '2025-02-26', 8, 6),
(6, '2025-02-27', 2, 7),
(7, '2025-02-26', 1, 8),
(8, '2025-03-06', 9, 9),
(9, '2025-02-24', 11, 10),
(10, '2025-03-06', 32, 11),
(11, '2025-12-03', 1, 12),
(12, '2025-12-01', 34, 13),
(13, '2025-12-11', 1, 14),
(14, '0000-00-00', 1, 15),
(15, '2025-12-04', 1, 16),
(16, '0000-00-00', 39, 17);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbregistrotreino`
--

CREATE TABLE `tbregistrotreino` (
  `id_RegistroT` smallint(6) NOT NULL,
  `dt_registro` date NOT NULL,
  `id_PlanoT` smallint(6) DEFAULT NULL,
  `id_cliente` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbregistrotreino`
--

INSERT INTO `tbregistrotreino` (`id_RegistroT`, `dt_registro`, `id_PlanoT`, `id_cliente`) VALUES
(1, '2023-05-21', 1, 1),
(2, '2023-04-12', 2, 2);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `tbcargo`
--
ALTER TABLE `tbcargo`
  ADD PRIMARY KEY (`id_cargo`);

--
-- Índices de tabela `tbcliente`
--
ALTER TABLE `tbcliente`
  ADD PRIMARY KEY (`id_cliente`),
  ADD UNIQUE KEY `cpf_cliente` (`cpf_cliente`);

--
-- Índices de tabela `tbfuncionario`
--
ALTER TABLE `tbfuncionario`
  ADD PRIMARY KEY (`mat_funcionario`),
  ADD UNIQUE KEY `cpf_func` (`cpf_func`),
  ADD KEY `fk_funcionario` (`id_cargo`);

--
-- Índices de tabela `tbhorariofuncionario`
--
ALTER TABLE `tbhorariofuncionario`
  ADD PRIMARY KEY (`id_horario`),
  ADD KEY `fk_mat_funcionario` (`mat_funcionario`);

--
-- Índices de tabela `tbplanopagamento`
--
ALTER TABLE `tbplanopagamento`
  ADD PRIMARY KEY (`id_pagamento`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Índices de tabela `tbplanotreino`
--
ALTER TABLE `tbplanotreino`
  ADD PRIMARY KEY (`id_PlanoT`),
  ADD KEY `fk_cliente_treino` (`id_cliente`),
  ADD KEY `fk_func_treino` (`mat_funcionario`);

--
-- Índices de tabela `tbregistropagamento`
--
ALTER TABLE `tbregistropagamento`
  ADD PRIMARY KEY (`id_RegistroP`),
  ADD KEY `fk_cliente_pagamento` (`id_cliente`),
  ADD KEY `fk_pagamento` (`id_pagamento`);

--
-- Índices de tabela `tbregistrotreino`
--
ALTER TABLE `tbregistrotreino`
  ADD PRIMARY KEY (`id_RegistroT`),
  ADD KEY `fk_cliente_registro_treino` (`id_cliente`),
  ADD KEY `fk_plano_registro_treino` (`id_PlanoT`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tbcargo`
--
ALTER TABLE `tbcargo`
  MODIFY `id_cargo` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `tbcliente`
--
ALTER TABLE `tbcliente`
  MODIFY `id_cliente` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de tabela `tbfuncionario`
--
ALTER TABLE `tbfuncionario`
  MODIFY `mat_funcionario` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT de tabela `tbhorariofuncionario`
--
ALTER TABLE `tbhorariofuncionario`
  MODIFY `id_horario` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de tabela `tbplanopagamento`
--
ALTER TABLE `tbplanopagamento`
  MODIFY `id_pagamento` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de tabela `tbplanotreino`
--
ALTER TABLE `tbplanotreino`
  MODIFY `id_PlanoT` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tbregistropagamento`
--
ALTER TABLE `tbregistropagamento`
  MODIFY `id_RegistroP` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `tbregistrotreino`
--
ALTER TABLE `tbregistrotreino`
  MODIFY `id_RegistroT` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `tbfuncionario`
--
ALTER TABLE `tbfuncionario`
  ADD CONSTRAINT `fk_funcionario` FOREIGN KEY (`id_cargo`) REFERENCES `tbcargo` (`id_cargo`);

--
-- Restrições para tabelas `tbhorariofuncionario`
--
ALTER TABLE `tbhorariofuncionario`
  ADD CONSTRAINT `fk_mat_funcionario` FOREIGN KEY (`mat_funcionario`) REFERENCES `tbfuncionario` (`mat_funcionario`);

--
-- Restrições para tabelas `tbplanopagamento`
--
ALTER TABLE `tbplanopagamento`
  ADD CONSTRAINT `id_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `tbcliente` (`id_cliente`);

--
-- Restrições para tabelas `tbplanotreino`
--
ALTER TABLE `tbplanotreino`
  ADD CONSTRAINT `fk_cliente_treino` FOREIGN KEY (`id_cliente`) REFERENCES `tbcliente` (`id_cliente`),
  ADD CONSTRAINT `fk_func_treino` FOREIGN KEY (`mat_funcionario`) REFERENCES `tbfuncionario` (`mat_funcionario`);

--
-- Restrições para tabelas `tbregistropagamento`
--
ALTER TABLE `tbregistropagamento`
  ADD CONSTRAINT `fk_cliente_pagamento` FOREIGN KEY (`id_cliente`) REFERENCES `tbcliente` (`id_cliente`),
  ADD CONSTRAINT `fk_pagamento` FOREIGN KEY (`id_pagamento`) REFERENCES `tbplanopagamento` (`id_pagamento`);

--
-- Restrições para tabelas `tbregistrotreino`
--
ALTER TABLE `tbregistrotreino`
  ADD CONSTRAINT `fk_cliente_registro_treino` FOREIGN KEY (`id_cliente`) REFERENCES `tbcliente` (`id_cliente`),
  ADD CONSTRAINT `fk_plano_registro_treino` FOREIGN KEY (`id_PlanoT`) REFERENCES `tbplanotreino` (`id_PlanoT`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
