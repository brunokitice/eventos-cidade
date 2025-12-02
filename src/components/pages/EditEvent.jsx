import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/axios";
import styles from "./EditEvent/EditEvent.module.scss";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [evento, setEvento] = useState({
    titulo: "",
    descricao: "",
    cidade: "",
    local: "",
  });

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarEvento() {
      try {
        setCarregando(true);
        setErro(null);

        const resp = await api.get(`/eventos/${id}`);
        setEvento(resp.data);
      } catch (e) {
        console.error(e);
        setErro("Erro ao carregar os dados do evento.");
      } finally {
        setCarregando(false);
      }
    }

    carregarEvento();
  }, [id]);

  function handleChange(e) {
    setEvento({ ...evento, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.put(`/eventos/${id}`, evento);
      alert("Evento atualizado com sucesso!");
      navigate("/");
    } catch (e) {
      console.error(e);
      alert("Erro ao atualizar evento.");
    }
  }

  async function handleDelete() {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita.");

    if (!confirmacao) return;

    try {
      await api.delete(`/eventos/${id}`);
      alert("Evento deletado com sucesso!");
      navigate("/");
    } catch (e) {
      console.error(e);
      alert("Erro ao excluir evento.");
    }
  }

  function handleCancel() {
    navigate("/");
  }

  if (carregando) {
    return <p className={styles.container}>Carregando evento...</p>;
  }

  if (erro) {
    return <p className={styles.container}>{erro}</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Editar evento</h2>

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

        <div className={styles.buttonRow}>
          <button className={`${styles.button} ${styles.buttonSave}`} type="submit">
            Salvar alterações
          </button>
          <button
            type="button"
            className={`${styles.button} ${styles.buttonCancel}`}
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button
            type="button"
            className={`${styles.button} ${styles.buttonDelete}`}
            onClick={handleDelete}
          >
            Excluir evento
          </button>
        </div>
      </form>
    </div>
  );
}
