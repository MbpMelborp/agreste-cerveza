import Head from "next/head";

//REACT
import { useEffect, useRef, useState } from "react";

//ASSETS

//liberias
import { gsap } from "gsap";
import axios from "axios";
import { useForm } from "react-hook-form";

const isValidEmail = (email) =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

function Home({ props }) {
  /** Render load  */
  const campaign_logo = useRef();
  useEffect(() => {
    console.log("INIT P");
    gsap.from(campaign_logo.current, { opacity: 0, y: "80", duration: 1 });
  }, []);

  const [resultado, setResultado] = useState(false);
  const [serror, setSerror] = useState("");

  /**
   * Formulario
   */
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleEmailValidation = (email) => {
    console.log("ValidateEmail was called with", email);

    const isValid = isValidEmail(email);

    const validityChanged =
      (errors.email && isValid) || (!errors.email && !isValid);
    if (validityChanged) {
      console.log("Fire tracker with", isValid ? "Valid" : "Invalid");
    }

    return isValid;
  };

  const onSubmit = async (formData) => {
    console.log(formData);
    const qs = require("qs");
    axios
      .post(
        "https://agreste.com.co/cerveza/op.php?save1",
        qs.stringify(formData)
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data.ok != false) {
          reset(register);
          setResultado(true);
        } else {
          setSerror(response.data.status);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  /** HTML */

  return (
    <div>
      <Head>
        <title>AGRESTE</title>
        <link rel="icon" href="./favicon.ico" />
      </Head>

      <main className="wrapper">
        <div className="campaign">
          <div className="campaign_wrapper">
            <img ref={campaign_logo} src="/cerveza/images/campaign.png" />
            <p>
              llena datos, muestraselos al mesero y uno de nuestros asesores te
              contactará para agendar tu cita de alineación
            </p>
          </div>
        </div>
        <div className="form">
          <div className="form_wrapper">
            <div className="form_top">
              <img src="/cerveza/images/logo_agreste.png" />
            </div>
            <div className="form_inter">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={resultado == false ? "flex" : "hidden"}
              >
                <div
                  className={"error_msg " + (serror == "" ? "hidden" : "block")}
                >
                  {serror}
                </div>
                <div className="form_element">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    {...register("nombre", { required: true })}
                  />
                  {errors.nombre && (
                    <div className="error">
                      {errors.nombre?.type === "required" && (
                        <p>Por favor ingresa tu nombre completo</p>
                      )}
                    </div>
                  )}
                </div>
                <div className="form_element">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    {...register("email", {
                      required: true,
                      validate: handleEmailValidation,
                    })}
                  />
                  {errors.email && (
                    <div className="error">
                      <p>El email no es correcto</p>
                    </div>
                  )}
                </div>
                <div className="form_element">
                  <label htmlFor="celular">Celular</label>
                  <input
                    id="celular"
                    name="celular"
                    type="text"
                    {...register("celular", { required: true })}
                  />
                  {errors.celular && (
                    <div className="error">
                      <p>Por favor ingresa tu celular</p>
                    </div>
                  )}
                </div>

                <button type="submit">Quiero mi alineacion</button>
                <p className="terminos_condiciones">
                  Activando el botón aceptas nuestros{" "}
                  <a href="https://agreste.com.co/politica-de-autorizacion-y-a-de-datos/" target="_blank">términos y condiciones</a>
                </p>
              </form>
              <div className={"mensaje " + (resultado ? "block" : "hidden")}>
                <p>¡Tus datos fueron registrados con éxito!</p>
                <a href="#" onClick={() => setResultado(false)}>
                  Escríbenos
                </a>
              </div>
              <div className="redes">
                <a href="https://www.instagram.com/agreste.garage/" target="_blank">
                  @agreste.garage
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// PROPS

// Home.getInitialProps = async (ctx) => {
  
// };

export default Home;
