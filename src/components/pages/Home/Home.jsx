import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/axios";
import EventCard from "../../EventCard/EventCard";
import styles from "./Home.module.css";

export default function Home() {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [confirmingDelete, setConfirmingDelete] = useState(null); // ID do evento para excluir
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarEventos() {
      try {
        setCarregando(true);
        setErro(null);

        const response = await api.get("/api/eventos");
        setEventos(response.data);
      } catch (e) {
        console.error(e);
        setErro("Erro ao carregar eventos.");
      } finally {
        setCarregando(false);
      }
    }

    carregarEventos();
  }, []);

  async function executeDelete() {
    if (!confirmingDelete) return;

    try {
      await api.delete(`/api/eventos/${confirmingDelete}`);
      setEventos(eventos.filter((evento) => evento._id !== confirmingDelete));
      setConfirmingDelete(null); // Fecha o diálogo
    } catch (e) {
      console.error(e);
      setErro("Erro ao excluir evento.");
      setConfirmingDelete(null); // Fecha o diálogo mesmo com erro
    }
  }

  function handleDeleteRequest(id) {
    setConfirmingDelete(id);
  }

  if (carregando)
    return <p className={styles.container}>Carregando eventos...</p>;
  if (erro && !confirmingDelete) return <p className={styles.container}>{erro}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Eventos disponíveis</h2>
        <button
          className={styles.buttonNovo}
          onClick={() => navigate("/novo")}
        >
          Novo Evento
        </button>
      </div>

      {erro && <p className={styles.erro}>{erro}</p>}

      {!eventos.length && !carregando && (
        <p>Nenhum evento encontrado.</p>
      )}

      <div className={styles.grid}>
        {eventos.map((evento) => (
          <EventCard
            key={evento._id}
            evento={evento}
            onDeleteRequest={handleDeleteRequest}
          />
        ))}
      </div>

      {confirmingDelete && (
        <div className={styles.confirmDialog}>
          <div className={styles.confirmDialogContent}>
            <p>Tem certeza que deseja excluir este evento?</p>
            <div className={styles.buttonRow}>
              <button onClick={executeDelete} className={`${styles.dialogButton} ${styles.deleteButton}`}>
                Sim, excluir
              </button>
              <button onClick={() => setConfirmingDelete(null)} className={`${styles.dialogButton} ${styles.cancelButton}`}>
                Não, cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
