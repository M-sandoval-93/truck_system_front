import imgOfTruck from "../assets/truck.png";
import FormLogin from "../components/login/FormLogin";
import ImageTruck from "../components/login/ImageTruck";

import SocialNetworks from "../components/login/SocialNetworks";
import TitleSystem from "../components/login/TitleSystem";

const Login = () => {
  return (
    <main className="relative min-h-screen flex  bg-gradient-to-b from-[#124C60] to-[#324745]">
      {/* sección titulo */}
      <section className="w-[45%]">
        <TitleSystem />
      </section>

      {/* sección formulario / social */}
      <section className="relative min-h-screen bg-white flex flex-col w-[55%] rounded-l-2xl">
        {/* formulario */}
        <FormLogin />

        {/* redes sociales */}z
        <SocialNetworks />
      </section>

      {/* imagen del sistema */}
      <ImageTruck img={imgOfTruck} />
    </main>
  );
};

export default Login;
