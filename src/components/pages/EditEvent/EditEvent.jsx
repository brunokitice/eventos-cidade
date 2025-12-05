import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../api/axios";
import EventForm from "../../EventForm/EventForm";
import styles from "./EditEvent.module.css";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [eventoData, setEventoData] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState({
    isLoading: true,
    isSubmitting: false,
    message: null,
  });

  useEffect(() => {
    async function fetchEvent() {
      setStatus({ isLoading: true, isSubmitting: false, message: null });
      try {
        const resp = await api.get(`/api/eventos/${id}`);
        setEventoData(resp.data);
        setStatus({ isLoading: false, isSubmitting: false, message: null });
      } catch (e) {
        console.error(e);
        setStatus({
          isLoading: false,
          isSubmitting: false,
          message: "Erro ao carregar os dados do evento.",
        });
      }
    }
    fetchEvent();
  }, [id]);

  async function updateEvent(data) {
    setStatus(prev => ({ ...prev, isSubmitting: true, message: null }));
    try {
      await api.put(`/api/eventos/${id}`, data);
      setStatus(prev => ({ ...prev, isSubmitting: false, message: "Evento atualizado com sucesso!" }));
      setTimeout(() => navigate("/"), 1500);
    } catch (e) {
      console.error(e);
      setStatus(prev => ({ ...prev, isSubmitting: false, message: "Erro ao atualizar evento." }));
    }
  }

  async function deleteEvent() {
    setShowConfirm(false);
    setStatus(prev => ({ ...prev, isSubmitting: true, message: null }));
    try {
      await api.delete(`/api/eventos/${id}`);
      setStatus(prev => ({ ...prev, isSubmitting: false, message: "Evento deletado com sucesso!" }));
      setTimeout(() => navigate("/"), 1500);
    } catch (e) {
      console.error(e);
      setStatus(prev => ({ ...prev, isSubmitting: false, message: "Erro ao excluir evento." }));
    }
  }

  if (status.isLoading) return <p className={styles.container}>Carregando evento...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Editar evento</h2>

      {status.message && <p className={styles.mensagem}>{status.message}</p>}

      {eventoData && (
        <EventForm
          onFormSubmit={updateEvent}
          initialData={eventoData}
          buttonText="Salvar Alterações"
          isSubmitting={status.isSubmitting}
        />
      )}

      <div className={styles.buttonRow}>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonCancel}`}
          onClick={() => navigate("/")}
          disabled={status.isSubmitting}
        >
          Cancelar
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonDelete}`}
          onClick={() => setShowConfirm(true)}
          disabled={status.isSubmitting}
        >
          Excluir evento
        </button>
      </div>

      {showConfirm && (
        <div className={styles.confirmDialog}>
          <div className={styles.confirmDialogContent}>
            <p>Tem certeza que deseja excluir este evento?</p>
            <div className={styles.buttonRow}>
              <button onClick={deleteEvent} className={styles.buttonDelete}>Sim, excluir</button>
              <button onClick={() => setShowConfirm(false)} className={styles.buttonCancel}>Não, cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
