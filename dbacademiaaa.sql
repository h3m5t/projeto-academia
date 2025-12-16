-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 16-Dez-2025 às 13:53
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `dbacademiaaa`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbcargo`
--

CREATE TABLE `tbcargo` (
  `id_cargo` smallint(6) NOT NULL,
  `nome_cargo` varchar(50) NOT NULL,
  `carga_horaria` smallint(6) NOT NULL,
  `salario_cargo` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `tbcargo`
--

INSERT INTO `tbcargo` (`id_cargo`, `nome_cargo`, `carga_horaria`, `salario_cargo`) VALUES
(1, 'personal', 8, 3200),
(2, 'recepcionista', 12, 2200),
(3, 'Gerente', 9, 5000),
(4, 'Faxineiro', 4, 1500),
(5, 'Assistente Administrativo', 4, 2500);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbcliente`
--

CREATE TABLE `tbcliente` (
  `id_cliente` smallint(6) NOT NULL,
  `nome_cliente` varchar(50) NOT NULL,
  `tel_cliente` varchar(20) DEFAULT NULL,
  `dt_nascimento` date NOT NULL,
  `cpf_cliente` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `tbcliente`
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
-- Estrutura da tabela `tbfuncionario`
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
-- Extraindo dados da tabela `tbfuncionario`
--

INSERT INTO `tbfuncionario` (`mat_funcionario`, `nome_func`, `tel_func`, `dt_nascimento`, `cpf_func`, `id_cargo`) VALUES
(2, 'Erick Judson', '98976431', '2000-12-30', '14350690860', 1),
(11, 'Ricardo Costa', '8888-8765', '1988-12-30', '998.877.665', 4),
(14, 'Howard Wolowitz', '542542', '2024-11-26', '54543', 2),
(42, 'Lucas Moura', '84987868584', '1999-01-05', '65498745368', 2),
(43, 'Samuel Xavier', '84989764536', '2001-01-01', '76854637892', 5),
(44, 'Cristiano Ronaldo', '84998746374', '2001-01-30', '78649364782', 5),
(48, 'Luka Modric', '84983475832', '2025-02-23', '32413243', 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbhorariofuncionario`
--

CREATE TABLE `tbhorariofuncionario` (
  `id_horario_funcionario` int(11) NOT NULL,
  `mat_funcionario` smallint(6) NOT NULL,
  `dia_semana` varchar(50) DEFAULT NULL,
  `horario_inicio` time DEFAULT NULL,
  `horario_fim` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `tbhorariofuncionario`
--

INSERT INTO `tbhorariofuncionario` (`id_horario_funcionario`, `mat_funcionario`, `dia_semana`, `horario_inicio`, `horario_fim`) VALUES
(3, 2, 'Terça-feira', '13:00:00', '22:00:00'),
(4, 2, 'Quarta-feira', '11:11:00', '15:09:00');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbmatricula`
--

CREATE TABLE `tbmatricula` (
  `id_matricula` int(11) NOT NULL,
  `id_cliente` smallint(6) NOT NULL,
  `data_inicio` date DEFAULT NULL,
  `data_fim` date DEFAULT NULL,
  `status_matricula` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbplanopagamento`
--

CREATE TABLE `tbplanopagamento` (
  `id_pagamento` smallint(6) NOT NULL,
  `valor_pagamento` smallint(6) NOT NULL,
  `status_pagamento` varchar(20) DEFAULT NULL,
  `tipo_pagamento` varchar(30) DEFAULT NULL,
  `id_cliente` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `tbplanopagamento`
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
(17, 32767, 'Anual', 'Pix', 39),
(18, 120, 'Mensal', 'Cartão', 11),
(19, 100, 'Mensal', 'Cartão', 11),
(20, 100, 'Mensal', 'Pix', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbplanotreino`
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
-- Extraindo dados da tabela `tbplanotreino`
--

INSERT INTO `tbplanotreino` (`id_PlanoT`, `nome_plano`, `objetivo`, `duração`, `id_cliente`, `mat_funcionario`) VALUES
(1, 'mata gordura', 'perda de peso', '5 meses', 1, 2),
(2, 'igual o hulk', 'ganho de masssa muscular', '11 meses', 2, 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbregistropagamento`
--

CREATE TABLE `tbregistropagamento` (
  `id_pagamento` int(11) NOT NULL,
  `id_cliente` smallint(6) NOT NULL,
  `valor_pagamento` decimal(10,2) DEFAULT NULL,
  `tipo_plano` varchar(50) DEFAULT NULL,
  `dt_pagamento` date DEFAULT NULL,
  `forma_pagamento` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbregistrotreino`
--

CREATE TABLE `tbregistrotreino` (
  `id_treino` int(11) NOT NULL,
  `id_cliente` smallint(6) NOT NULL,
  `tipo_treino` varchar(50) DEFAULT NULL,
  `descricao_treino` text DEFAULT NULL,
  `data_inicio` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tbcargo`
--
ALTER TABLE `tbcargo`
  ADD PRIMARY KEY (`id_cargo`);

--
-- Índices para tabela `tbcliente`
--
ALTER TABLE `tbcliente`
  ADD PRIMARY KEY (`id_cliente`),
  ADD UNIQUE KEY `cpf_cliente` (`cpf_cliente`);

--
-- Índices para tabela `tbfuncionario`
--
ALTER TABLE `tbfuncionario`
  ADD PRIMARY KEY (`mat_funcionario`),
  ADD UNIQUE KEY `cpf_func` (`cpf_func`),
  ADD KEY `fk_funcionario` (`id_cargo`);

--
-- Índices para tabela `tbhorariofuncionario`
--
ALTER TABLE `tbhorariofuncionario`
  ADD PRIMARY KEY (`id_horario_funcionario`),
  ADD KEY `fk_horario_func` (`mat_funcionario`);

--
-- Índices para tabela `tbmatricula`
--
ALTER TABLE `tbmatricula`
  ADD PRIMARY KEY (`id_matricula`),
  ADD KEY `fk_matricula_cliente` (`id_cliente`);

--
-- Índices para tabela `tbplanopagamento`
--
ALTER TABLE `tbplanopagamento`
  ADD PRIMARY KEY (`id_pagamento`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Índices para tabela `tbplanotreino`
--
ALTER TABLE `tbplanotreino`
  ADD PRIMARY KEY (`id_PlanoT`),
  ADD KEY `fk_cliente_treino` (`id_cliente`),
  ADD KEY `fk_func_treino` (`mat_funcionario`);

--
-- Índices para tabela `tbregistropagamento`
--
ALTER TABLE `tbregistropagamento`
  ADD PRIMARY KEY (`id_pagamento`),
  ADD KEY `fk_pagamento_cliente` (`id_cliente`);

--
-- Índices para tabela `tbregistrotreino`
--
ALTER TABLE `tbregistrotreino`
  ADD PRIMARY KEY (`id_treino`),
  ADD KEY `fk_treino_cliente` (`id_cliente`);

--
-- AUTO_INCREMENT de tabelas despejadas
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
  MODIFY `id_cliente` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de tabela `tbfuncionario`
--
ALTER TABLE `tbfuncionario`
  MODIFY `mat_funcionario` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de tabela `tbhorariofuncionario`
--
ALTER TABLE `tbhorariofuncionario`
  MODIFY `id_horario_funcionario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `tbmatricula`
--
ALTER TABLE `tbmatricula`
  MODIFY `id_matricula` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbplanopagamento`
--
ALTER TABLE `tbplanopagamento`
  MODIFY `id_pagamento` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `tbplanotreino`
--
ALTER TABLE `tbplanotreino`
  MODIFY `id_PlanoT` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tbregistropagamento`
--
ALTER TABLE `tbregistropagamento`
  MODIFY `id_pagamento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbregistrotreino`
--
ALTER TABLE `tbregistrotreino`
  MODIFY `id_treino` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `tbfuncionario`
--
ALTER TABLE `tbfuncionario`
  ADD CONSTRAINT `fk_funcionario` FOREIGN KEY (`id_cargo`) REFERENCES `tbcargo` (`id_cargo`);

--
-- Limitadores para a tabela `tbhorariofuncionario`
--
ALTER TABLE `tbhorariofuncionario`
  ADD CONSTRAINT `fk_horario_func` FOREIGN KEY (`mat_funcionario`) REFERENCES `tbfuncionario` (`mat_funcionario`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `tbmatricula`
--
ALTER TABLE `tbmatricula`
  ADD CONSTRAINT `fk_matricula_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `tbcliente` (`id_cliente`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `tbplanopagamento`
--
ALTER TABLE `tbplanopagamento`
  ADD CONSTRAINT `id_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `tbcliente` (`id_cliente`);

--
-- Limitadores para a tabela `tbplanotreino`
--
ALTER TABLE `tbplanotreino`
  ADD CONSTRAINT `fk_cliente_treino` FOREIGN KEY (`id_cliente`) REFERENCES `tbcliente` (`id_cliente`),
  ADD CONSTRAINT `fk_func_treino` FOREIGN KEY (`mat_funcionario`) REFERENCES `tbfuncionario` (`mat_funcionario`);

--
-- Limitadores para a tabela `tbregistropagamento`
--
ALTER TABLE `tbregistropagamento`
  ADD CONSTRAINT `fk_pagamento_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `tbcliente` (`id_cliente`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `tbregistrotreino`
--
ALTER TABLE `tbregistrotreino`
  ADD CONSTRAINT `fk_treino_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `tbcliente` (`id_cliente`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
