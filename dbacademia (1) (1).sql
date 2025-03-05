-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 24/01/2025 às 19:17
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
(2, 'recepcionista', 12, 2200);

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
(1, 'evelyn', '8495967898', '2006-04-29', '15623467891'),
(2, 'fellype', '84998973647', '2007-06-29', '15634514678');

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
(1, 'Henrique', '84994612638', '2007-05-03', '15514360431', 2),
(2, 'erick', '98976432', '2000-12-30', '14350690867', 1);

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
(2, '07:00:00', '15:00:00', 'segunda-feira', 1);

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
(2, 6, 'pago', 'diaria', 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbplanotreino`
--

CREATE TABLE `tbplanotreino` (
  `id_PlanoT` smallint(6) NOT NULL,
  `nome_plano` varchar(50) NOT NULL,
  `objetivo` varchar(50) NOT NULL,
  `duração` varchar(30) NOT NULL,
  `descrição` varchar(50) NOT NULL,
  `id_cliente` smallint(6) DEFAULT NULL,
  `mat_funcionario` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbregistrotreino`
--

CREATE TABLE `tbregistrotreino` (
  `id_RegistroT` smallint(6) NOT NULL,
  `dt_registro` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  ADD PRIMARY KEY (`id_RegistroT`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tbcargo`
--
ALTER TABLE `tbcargo`
  MODIFY `id_cargo` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tbcliente`
--
ALTER TABLE `tbcliente`
  MODIFY `id_cliente` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `tbfuncionario`
--
ALTER TABLE `tbfuncionario`
  MODIFY `mat_funcionario` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tbhorariofuncionario`
--
ALTER TABLE `tbhorariofuncionario`
  MODIFY `id_horario` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tbplanopagamento`
--
ALTER TABLE `tbplanopagamento`
  MODIFY `id_pagamento` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tbplanotreino`
--
ALTER TABLE `tbplanotreino`
  MODIFY `id_PlanoT` smallint(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbregistropagamento`
--
ALTER TABLE `tbregistropagamento`
  MODIFY `id_RegistroP` smallint(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbregistrotreino`
--
ALTER TABLE `tbregistrotreino`
  MODIFY `id_RegistroT` smallint(6) NOT NULL AUTO_INCREMENT;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
