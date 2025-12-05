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

  const [errors, setErrors] = useState({});

  const toLocalISOString = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return localDate.toISOString().slice(0, 16);
  };

  useEffect(() => {
    if (initialData) {
      setEvento({
        titulo: initialData.titulo || '',
        descricao: initialData.descricao || '',
        cidade: initialData.cidade || '',
        local: initialData.local || '',
        dataHoraInicio: toLocalISOString(initialData.dataHoraInicio),
        dataHoraFim: toLocalISOString(initialData.dataHoraFim),
        imagemUrl: initialData.imagemUrl || ''
      });
    }
  }, [initialData]);

  function validate() {
    const newErrors = {};
    if (!evento.titulo) newErrors.titulo = true;
    if (!evento.descricao) newErrors.descricao = true;
    if (!evento.cidade) newErrors.cidade = true;
    if (!evento.local) newErrors.local = true;
    if (!evento.dataHoraInicio) newErrors.dataHoraInicio = true;
    if (!evento.dataHoraFim) newErrors.dataHoraFim = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setEvento(prevEvento => ({
      ...prevEvento,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      onFormSubmit(evento);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={`${styles.input} ${errors.titulo ? styles.inputError : ''}`}
        name="titulo"
        placeholder="Título do evento"
        value={evento.titulo}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <textarea
        className={`${styles.input} ${errors.descricao ? styles.inputError : ''}`}
        name="descricao"
        placeholder="Descrição"
        value={evento.descricao}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <input
        className={`${styles.input} ${errors.cidade ? styles.inputError : ''}`}
        name="cidade"
        placeholder="Cidade"
        value={evento.cidade}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <input
        className={`${styles.input} ${errors.local ? styles.inputError : ''}`}
        name="local"
        placeholder="Local"
        value={evento.local}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <input
        className={`${styles.input} ${errors.dataHoraInicio ? styles.inputError : ''}`}
        type="datetime-local"
        name="dataHoraInicio"
        value={evento.dataHoraInicio}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <input
        className={`${styles.input} ${errors.dataHoraFim ? styles.inputError : ''}`}
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