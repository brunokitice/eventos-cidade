import { useState } from "react";
import { api } from "../../api/axios";
import styles from "./CreateEvent/CreateEvent.module.scss";

export default function CreateEvent() {
  const [evento, setEvento] = useState({
    titulo: "",
    descricao: "",
    cidade: "",
    local: ""
  });

  function handleChange(e) {
    setEvento({ ...evento, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/eventos", evento);
      alert("Evento criado com sucesso!");
    } catch (err) {
      alert("Erro ao criar evento!");
      console.error(err);
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Criar novo evento</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          name="titulo"
          placeholder="Título do evento"
          value={evento.titulo}
          onChange={handleChange}
        />

        <textarea
          className={styles.input}
          name="descricao"
          placeholder="Descrição"
          value={evento.descricao}
          onChange={handleChange}
        />

        <input
          className={styles.input}
          name="cidade"
          placeholder="Cidade"
          value={evento.cidade}
          onChange={handleChange}
        />

        <input
          className={styles.input}
          name="local"
          placeholder="Local"
          value={evento.local}
          onChange={handleChange}
        />

        <button className={styles.button} type="submit">
          Salvar evento
        </button>
      </form>
    </div>
  );
}
