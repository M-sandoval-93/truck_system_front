import useAuth from "../../hooks/useAuth";
import useAuthentication from "../../hooks/useAuthentication";

import loginValidation from "../../validations/loginValidation";

import { Formik } from "formik";
import { Button, Input } from "@nextui-org/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const FormLogin = () => {
  const { login } = useAuth();
  const { onSubmit } = useAuthentication({ login });

  const loginValidationSchema = loginValidation();

  return (
    <article className="relative flex flex-col items-center justify-center h-[70%] w-full gap-6 z-10">
      <h2 className="font-bold text-3xl text-primary-color text-center tracking-wider">
        INICIO DE SESIÓN
      </h2>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={loginValidationSchema}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          errors,
          touched,
          handleBlur,
          isSubmitting,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col w-full justify-center items-center gap-6"
          >
            <div className="relative flex flex-col w-[70%] md:w-[80%] lg:w-[55%] max-w-[35rem] gap-8 my-10 transition-all duration-300">
              <Input
                color={
                  values.email !== "" && errors.email ? "danger" : "success"
                }
                variant="bordered"
                type="email"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                size="lg"
                label="Cuenta de usuario"
                labelPlacement="outside"
                placeholder="Ingresar Email"
                isInvalid={errors.email && values.email !== ""}
                errorMessage={
                  values.email !== "" && !isSubmitting && errors.email
                }
                startContent={
                  <FaUserAlt
                    size={25}
                    className={
                      values.email !== "" && errors.email
                        ? "text-red-500"
                        : "text-gray-400"
                    }
                  />
                }
                classNames={{
                  label: ["text-lg", "pl-4", "text-primary-color"],
                  input: [],
                  innerWrapper: ["gap-2", "px-2"],
                  inputWrapper: [],
                }}
              />

              <Input
                color={
                  values.password !== "" && errors.password
                    ? "danger"
                    : "success"
                }
                variant="bordered"
                type="password"
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                size="lg"
                label="Contraseña"
                labelPlacement="outside"
                placeholder="Ingresar password"
                isInvalid={errors.password && values.password !== ""}
                errorMessage={
                  values.password !== "" && !isSubmitting && errors.password
                }
                startContent={
                  <FaLock
                    size={25}
                    className={
                      values.password !== "" && errors.password
                        ? "text-red-500"
                        : "text-gray-400"
                    }
                  />
                }
                classNames={{
                  label: ["text-lg", "pl-4", "text-primary-color"],
                  input: [],
                  innerWrapper: ["gap-2", "px-2"],
                  inputWrapper: [],
                }}
              />
            </div>

            <Button
              size="lg"
              className="relative w-[55%] max-w-[35rem]
              text-white font-bold text-xl
                bg-gradient-to-r from-[#00597B] to-[#00A3E1]
                hover:shadow-md hover:shadow-[#00597B]"
              type="submit"
              disabled={isSubmitting}
            >
              Ingresar
            </Button>
          </form>
        )}
      </Formik>
    </article>
  );
};

export default FormLogin;
