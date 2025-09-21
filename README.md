
# Projeto n8n Random Node 🎲

Esse é um projeto que eu fiz para treinar a criação de um **conector customizado** no n8n.  
Ele gera números aleatórios usando duas opções:

- Local (usando `Math.random()`)
- API do Random.org (verdadeiro random)

---

## ⚙️ Requisitos

- Node.js 22 LTS
- Docker e Docker Compose
- Conta grátis no [Random.org](https://api.random.org) para gerar a API Key

---

## 📂 Estrutura do Projeto

```
n8n-random-node/
 ├─ docker-compose.yml
 ├─ package.json
 ├─ tsconfig.json
 ├─ nodes/
 │   └─ Random/
 │       ├─ Random.node.ts
 │       ├─ Random.node.json
 │       └─ icon.svg
 └─ dist/   (gerado depois do build)
```

---

## 🔑 Login no n8n

Para acessar o painel do n8n depois de subir o docker, usar:

- **Email:** `nathan-cesar@hotmail.com`  
- **Senha:** `@Nathan13`

---

## 🚀 Como rodar

1. Clonar o repositório ou baixar os arquivos.
2. Instalar dependências:
   ```bash
   npm install
   ```
3. Compilar:
   ```bash
   npm run build
   ```
4. Subir o docker:
   ```bash
   docker compose up -d
   ```
5. Abrir o n8n em [http://localhost:5678](http://localhost:5678)

---

## 📦 Configuração do Docker Compose

O `docker-compose.yml` já está configurado com:

- Banco Postgres
- n8n self hosted
- Autenticação básica
- Volume montado para `.n8n/custom`
- Variável de ambiente para **Random.org API Key**

Se precisar, edite o arquivo e coloque sua API Key aqui:

```yaml
RANDOM_ORG_API_KEY: "SUA-API-KEY"
```

---

## 🎲 Como usar o Node Random

1. No n8n, clique em **Add Node**.
2. Procure por **Random** (vai aparecer com o ícone de dado).
3. Configure os parâmetros:
   - **Mínimo**
   - **Máximo**
   - **Fonte**: Local ou Random.org
4. Execute o workflow → o node vai devolver um número no output.

Exemplo de output:

```json
{
  "random": 69,
  "source": "randomorg"
}
```

---

## ✅ Critérios atendidos

- Configuração infra do n8n com Docker e Postgres ✔️
- Custom nodes em `.n8n/custom` ✔️
- Organização de arquivos ✔️
- Código limpo em TypeScript ✔️
- Integração com Random.org ✔️
- Atenção aos detalhes (ícone, propriedades, etc) ✔️
- README explicando como rodar ✔️
- Boas práticas baseadas na doc oficial ✔️

---

## Observação

Esse projeto foi feito estilo **junior dev**, então pode ter coisas simples que dava pra melhorar, mas a ideia é mostrar o funcionamento do conector e que ele roda no n8n certinho. 🚀
