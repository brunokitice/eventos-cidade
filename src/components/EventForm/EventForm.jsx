import { useState, useEffect } from 'react';
import styles from './EventForm.module.css';

export default function EventForm({ onFormSubmit, initialData, buttonText, isSubmitting }) {
  const [evento, setEvento] = useState({
    titulo: '',
    descricao: '',
    cidade: '',
    local: '',
    dataHoraInicio: '',
    dataHoraFim: '',
    imagemUrl: ''
  });

  useEffect(() => {
    if (initialData) {
      setEvento({
        titulo: initialData.titulo || '',
        descricao: initialData.descricao || '',
        cidade: initialData.cidade || '',
        local: initialData.local || '',
        dataHoraInicio: initialData.dataHoraInicio ? new Date(initialData.dataHoraInicio).toISOString().slice(0, 16) : '',
        dataHoraFim: initialData.dataHoraFim ? new Date(initialData.dataHoraFim).toISOString().slice(0, 16) : '',
        imagemUrl: initialData.imagemUrl || ''
      });
    }
  }, [initialData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setEvento(prevEvento => ({
      ...prevEvento,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onFormSubmit(evento);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        name="titulo"
        placeholder="Título do evento"
        value={evento.titulo}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <textarea
        className={styles.input}
        name="descricao"
        placeholder="Descrição"
        value={evento.descricao}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <input
        className={styles.input}
        name="cidade"
        placeholder="Cidade"
        value={evento.cidade}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <input
        className={styles.input}
        name="local"
        placeholder="Local"
        value={evento.local}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <input
        className={styles.input}
        type="datetime-local"
        name="dataHoraInicio"
        value={evento.dataHoraInicio}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <input
        className={styles.input}
        type="datetime-local"
        name="dataHoraFim"
        value={evento.dataHoraFim}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <input
        className={styles.input}
        name="imagemUrl"
        placeholder="URL da imagem (opcional)"
        value={evento.imagemUrl}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <button className={styles.button} type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : buttonText}
      </button>
    </form>
  );
}
