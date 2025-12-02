import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/axios";
import styles from "./Home/Home.module.scss";

export default function Home() {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [selecionado, setSelecionado] = useState(null);

  useEffect(() => {
    async function carregarEventos() {
      try {
        setCarregando(true);
        setErro(null);

        const response = await api.get("/eventos");
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

  if (carregando) return <p className={styles.container}>Carregando eventos...</p>;
  if (erro) return <p className={styles.container}>{erro}</p>;

  if (!eventos.length) {
    return <p className={styles.container}>Nenhum evento encontrado.</p>;
  }

  function handleCardClick(id) {
 
    setSelecionado((atual) => (atual === id ? null : id));
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Eventos disponíveis</h2>

      <div className={styles.grid}>
        {eventos.map((evento) => (
          <article
            key={evento.id}
            className={styles.card}
            onClick={() => handleCardClick(evento.id)}
            style={{ cursor: "pointer" }}
          >
            {evento.imagemUrl && (
              <img
                src={evento.imagemUrl}
                alt={evento.titulo}
                className={styles.cardImage}
              />
            )}

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

            {selecionado === evento.id && (
              <div style={{ marginTop: "0.75rem" }}>
                <Link
                  to={`/editar/${evento.id}`}
                  style={{
                    display: "inline-block",
                    padding: "0.5rem 0.75rem",
                    borderRadius: 6,
                    backgroundColor: "#198754",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: 14,
                  }}
                  onClick={(e) => e.stopPropagation()} 
                >
                  Editar evento
                </Link>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
