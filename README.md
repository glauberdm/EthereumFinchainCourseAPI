# Ethereum Finchain Course - ERC-20 Token Standard API

É a API para o token do projeto [EthereumFinchainCourseToken](https://gitlab.com/finchain-courses/ethereum-course/EthereumFinchainCourseToken)

## Projeto NodeJS e Truffle

### Start DApp
No console, no diretório do projeto:

#### Instalando dependências
`../EthereumFinchainCourseAPI$ npm install`

#### Rodando Wallet web app
`../EthereumFinchainCourseAPI$ npm run start`

http://localhost:10010/api/v1/doc/

A DApp utiliza o [resources/contracts/EthereumFinchainCourse.json](https://gitlab.com/finchain-courses/ethereum-course/EthereumFinchainCourseToken/blob/master/build/contracts/EthereumFinchainCourse.json) que é o artefato gerado pelo truffle ao realizar o migrate.
Para atualizar o contrato da API, apenas alterar o endereço da variável TOKEN_ADDRESS em [.env](https://gitlab.com/finchain-courses/ethereum-course/EthereumFinchainCourseAPI/blob/master/.env) com o novo endereço do contrato.

ENJOY!