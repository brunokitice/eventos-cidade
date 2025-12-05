import { Link } from 'react-router-dom';
import styles from './EventCard.module.css';

export default function EventCard({ evento, onDeleteRequest }) {
  function formatarDataLocal(dataString) {
    if (!dataString) return 'Data inválida';
    const data = new Date(dataString);
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
    const ano = data.getUTCFullYear();
    const horas = String(data.getUTCHours()).padStart(2, '0');
    const minutos = String(data.getUTCMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
  }

  return (
    <article className={styles.card}>
      {evento.imagemUrl && (
        <img
          src={evento.imagemUrl}
          alt={evento.titulo}
          className={styles.cardImage}
        />
      )}

      <div className={styles.cardContent}>
        <h3>{evento.titulo}</h3>
        <p className={styles.info}>{evento.descricao}</p>
        <p className={styles.info}>
          <strong>Cidade:</strong> {evento.cidade}
        </p>
        <p className={styles.info}>
          <strong>Local:</strong> {evento.local}
        </p>
        <p className={styles.info}>
          <strong>Início:</strong>{" "}
          {formatarDataLocal(evento.dataHoraInicio)}
          <br />
          <strong>Fim:</strong>{" "}
          {formatarDataLocal(evento.dataHoraFim)}
        </p>

        <div className={styles.cardActions}>
          <Link to={`/editar/${evento._id}`} className={styles.actionButton}>
            Editar
          </Link>
          <button onClick={() => onDeleteRequest(evento._id)} className={`${styles.actionButton} ${styles.deleteButton}`}>
            Excluir
          </button>
        </div>
      </div>
    </article>
  );
}
