import Header from "./components/Header";
import Saludo from "./components/Saludo";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Saludo nombre="soy Juan Basualdo" />
      <Saludo nombre="Profesores de la practica" />
      <Footer />
    </main>
  );
}
