import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import useSubmitNewData from "../hooks/useSubmitNewData";
import { Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useRef } from "react";
import { REGEX_numberString } from "../utils/regularExpressions";

const ModalNewData = ({
  stateComponent,
  updateStateComponent,
  title,
  isOpen,
  onOpenChange,
  route,
  propertyId,
  propertyName,
}) => {
  // desestructuración de estados del componente principal
  const { data, edit, idEdit, descriptionEdit } = stateComponent;
  const inputRef = useRef();

  // desestructuración del hook personalizado para el registro de datos
  const { onSubmit } = useSubmitNewData({
    data,
    updateStateComponent,
    route,
    propertyId,
    propertyName,
  });

  // texto personalizado para btn del modal
  const textBtnSubmit = edit ? "Actualizar" : "Registrar";
  const textBtnSubmitting = edit ? "Actualizando..." : "Registrando...";

  // esquema de validaciones
  const validationSchema = Yup.object().shape({
    newData: Yup.string()
      .trim()
      .required("Campo requerido..!")
      .matches(REGEX_numberString, "Solo se permiten letras, tildes y números"),
  });

  // reestablecer la acción del modal y el id (add or update)
  useEffect(() => {
    if (!isOpen) updateStateComponent({ edit: false, idEdit: null });
    if (isOpen) inputRef.current.focus();
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      isDismissable={false}
      backdrop="blur"
      size="md"
    >
      <ModalContent className="relative p-2 bg-gray-100">
        {(onClose) => (
          <>
            {/* header del modal */}
            <ModalHeader className="text-2xl px-4 py-3">{title}</ModalHeader>

            <Formik
              initialValues={{
                newData: edit ? descriptionEdit : "",
                idData: edit ? idEdit : null,
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit(onClose)}
            >
              {({
                values,
                handleSubmit,
                setFieldValue,
                touched,
                errors,
                handleBlur,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <ModalBody>
                    <Input
                      color={
                        touched.newData && errors.newData ? "danger" : "primary"
                      }
                      name="newData"
                      type="text"
                      label="Nuevo registro"
                      labelPlacement="outside"
                      variant="faded"
                      value={values.newData}
                      ref={inputRef}
                      isRequired={true}
                      onChange={(e) =>
                        setFieldValue("newData", e.target.value.toUpperCase())
                      }
                      onBlur={handleBlur}
                      isInvalid={touched.newData && errors.newData}
                      errorMessage={touched.newData && errors.newData}
                    />
                  </ModalBody>

                  <ModalFooter className="w-full px-2">
                    <Button
                      className="w-[8rem] text-lg"
                      color="danger"
                      variant="flat"
                      onPress={onClose}
                    >
                      Cancelar
                    </Button>

                    <Button
                      className="w-[8rem] text-lg"
                      color="primary"
                      variant="flat"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? textBtnSubmitting : textBtnSubmit}
                    </Button>
                  </ModalFooter>
                </form>
              )}
            </Formik>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalNewData;
