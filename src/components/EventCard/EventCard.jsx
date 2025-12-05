import { Link } from 'react-router-dom';
import styles from './EventCard.module.css';

export default function EventCard({ evento, onDeleteRequest }) {
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
          {new Date(evento.dataHoraInicio).toLocaleString("pt-BR")}
          <br />
          <strong>Fim:</strong>{" "}
          {new Date(evento.dataHoraFim).toLocaleString("pt-BR")}
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
