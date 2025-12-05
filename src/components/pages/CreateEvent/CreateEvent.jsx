import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/axios";
import EventForm from "../../EventForm/EventForm";
import styles from "./CreateEvent.module.css";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    isSubmitting: false,
    message: ''
  });

  async function addEvent(eventoData) {
    if (
      !eventoData.titulo ||
      !eventoData.descricao ||
      !eventoData.cidade ||
      !eventoData.local ||
      !eventoData.dataHoraInicio ||
      !eventoData.dataHoraFim
    ) {
      setStatus({ isSubmitting: false, message: "Preencha todos os campos obrigatórios!" });
      return;
    }

    setStatus({ isSubmitting: true, message: '' });

    try {
      await api.post("/api/eventos", eventoData);
      setStatus({ isSubmitting: false, message: "Evento criado com sucesso!" });
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setStatus({ 
        isSubmitting: false, 
        message: "Erro ao criar evento. Tente novamente." 
      });
      console.error(err);
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Criar novo evento</h2>

      {status.message && <p className={styles.mensagem}>{status.message}</p>}

      <EventForm
        onFormSubmit={addEvent}
        buttonText="Salvar Evento"
        isSubmitting={status.isSubmitting}
      />
    </div>
  );
}
