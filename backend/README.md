# API de Eventos

Esta é a API backend para o projeto "Eventos Cidade", desenvolvida com Node.js, Express e Mongoose.

## Execução (Apenas Backend)

Para rodar apenas o servidor da API em modo de desenvolvimento, execute o seguinte comando dentro desta pasta (`/backend`):

```bash
npm run dev
```

O servidor será iniciado na porta 5000 (`http://localhost:5000`).

## Endpoints da API

A URL base para todos os endpoints é `/api/eventos`.

---

### 1. Listar todos os eventos

-   **Endpoint:** `GET /`
-   **Descrição:** Retorna uma lista de todos os eventos cadastrados, ordenados por data de início.
-   **Exemplo de Resposta:**
    ```json
    [
      {
        "_id": "60d...e1",
        "titulo": "Show de Rock",
        "descricao": "Show com bandas locais.",
        "cidade": "São Paulo",
        "local": "Estádio Principal",
        "dataHoraInicio": "2025-12-25T22:00:00.000Z",
        "dataHoraFim": "2025-12-26T02:00:00.000Z",
        "imagemUrl": "https://exemplo.com/imagem.jpg",
        "createdAt": "...",
        "updatedAt": "..."
      }
    ]
    ```

---

### 2. Buscar um evento por ID

-   **Endpoint:** `GET /:id`
-   **Descrição:** Retorna um evento específico com base no seu `_id`.

---

### 3. Criar um novo evento

-   **Endpoint:** `POST /`
-   **Descrição:** Cria um novo evento.
-   **Exemplo de Corpo da Requisição (JSON):**
    ```json
    {
      "titulo": "Festival de Jazz",
      "descricao": "Apresentações de artistas renomados.",
      "cidade": "Rio de Janeiro",
      "local": "Praia de Copacabana",
      "dataHoraInicio": "2026-01-15T18:00:00",
      "dataHoraFim": "2026-01-15T23:00:00",
      "imagemUrl": "https://exemplo.com/imagem_jazz.jpg"
    }
    ```

---

### 4. Atualizar um evento

-   **Endpoint:** `PUT /:id`
-   **Descrição:** Atualiza os dados de um evento existente.
-   **Exemplo de Corpo da Requisição (JSON):**
    ```json
    {
      "titulo": "Festival de Jazz e Blues",
      "local": "Marina da Glória"
    }
    ```

---

### 5. Deletar um evento

-   **Endpoint:** `DELETE /:id`
-   **Descrição:** Deleta um evento com base no seu `_id`. Retorna status `204 No Content` em caso de sucesso.
