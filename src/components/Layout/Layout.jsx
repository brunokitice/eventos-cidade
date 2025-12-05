import { Link, useLocation } from "react-router-dom";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  const { pathname } = useLocation();

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <h1 className={styles.title}>Agenda de Eventos por Cidade</h1>
        </div>
        <nav className={styles.nav}>
          <Link className={pathname === "/" ? styles.active : ""} to="/">Home</Link>
          <Link className={pathname === "/novo" ? styles.active : ""} to="/novo">Novo Evento</Link>
        </nav>
      </header>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
