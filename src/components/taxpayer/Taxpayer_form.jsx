import { Button, Checkbox, Input, Textarea } from "@nextui-org/react";
import useTaxpayer from "../../hooks/useTaxpayer";
import SelectComponent from "../SelectComponent";
import { formatRut } from "../../utils/functions";
import { FaUserTie } from "react-icons/fa";
import Taxpayer_georeferencesTable from "./Taxpayer_georeferencesTable";
import { useEffect, useState } from "react";
import ModalBaseTable from "../../templates/ModalBaseTable";

const Taxpayer_form = ({
  values,
  setFieldValue,
  handleBlur,
  handleChange,
  touched,
  errors,
  inputRef,
}) => {
  const { commune } = useTaxpayer();
  const [open, setOpen] = useState(false);
  const [listGeoreferences, setListGeoreferences] = useState(new Set([]));

  // Asignación de los codigos de vinculación de las georeferencias
  useEffect(() => {
    setFieldValue("georeferencias", [...listGeoreferences]);
  }, [listGeoreferences]);

  return (
    <>
      {/* rut del controbuyente */}
      <div className="flex gap-x-4 justify-between">
        {/* rut */}
        <Input
          className="w-1/3"
          color={
            touched.run_contribuyente && errors.run_contribuyente
              ? "danger"
              : "primary"
          }
          name="run_contribuyente"
          type="text"
          label="Rut contribuyente"
          labelPlacement="outside"
          variant="faded"
          value={
            values.run_contribuyente
              ? values.run_contribuyente.toUpperCase()
              : ""
          }
          ref={inputRef}
          isRequired={true}
          onChange={(e) =>
            formatRut(e.target.value, setFieldValue, "run_contribuyente")
          }
          onBlur={handleBlur}
          isInvalid={touched.run_contribuyente && errors.run_contribuyente}
          errorMessage={touched.run_contribuyente && errors.run_contribuyente}
        />

        <div className="flex justify-center items-center pr-10">
          <FaUserTie size={80} />
        </div>
      </div>

      {/* nombres y apellidos */}
      <div className="flex gap-x-4">
        {/* nombre */}
        <Input
          className="grow min-w-[10rem]"
          color={
            touched.nombre_contribuyente && errors.nombre_contribuyente
              ? "danger"
              : "primary"
          }
          name="nombre_contribuyente"
          type="text"
          label="Nombres contribuyente"
          labelPlacement="outside"
          variant="faded"
          value={
            values.nombre_contribuyente
              ? values.nombre_contribuyente.toUpperCase()
              : ""
          }
          isRequired={true}
          onChange={(e) =>
            setFieldValue("nombre_contribuyente", e.target.value.toUpperCase())
          }
          onBlur={handleBlur}
          isInvalid={
            touched.nombre_contribuyente && errors.nombre_contribuyente
          }
          errorMessage={
            touched.nombre_contribuyente && errors.nombre_contribuyente
          }
        />

        {/* apellido paterno */}
        <Input
          className="w-[20rem]"
          color={
            touched.apellido_paterno_contribuyente &&
            errors.apellido_paterno_contribuyente
              ? "danger"
              : "primary"
          }
          name="apellido_paterno_contribuyente"
          type="text"
          label="Apellido paterno"
          labelPlacement="outside"
          variant="faded"
          value={
            values.apellido_paterno_contribuyente
              ? values.apellido_paterno_contribuyente.toUpperCase()
              : ""
          }
          isRequired={true}
          onChange={(e) =>
            setFieldValue(
              "apellido_paterno_contribuyente",
              e.target.value.toUpperCase()
            )
          }
          onBlur={handleBlur}
          isInvalid={
            touched.apellido_paterno_contribuyente &&
            errors.apellido_paterno_contribuyente
          }
          errorMessage={
            touched.apellido_paterno_contribuyente &&
            errors.apellido_paterno_contribuyente
          }
        />

        {/* apellido paterno */}
        <Input
          className="w-[20rem]"
          color={
            touched.apellido_materno_contribuyente &&
            errors.apellido_materno_contribuyente
              ? "danger"
              : "primary"
          }
          name="apellido_materno_contribuyente"
          type="text"
          label="Apellido materno"
          labelPlacement="outside"
          variant="faded"
          value={
            values.apellido_materno_contribuyente
              ? values.apellido_materno_contribuyente.toUpperCase()
              : ""
          }
          isRequired={true}
          onChange={(e) =>
            setFieldValue(
              "apellido_materno_contribuyente",
              e.target.value.toUpperCase()
            )
          }
          onBlur={handleBlur}
          isInvalid={
            touched.apellido_materno_contribuyente &&
            errors.apellido_materno_contribuyente
          }
          errorMessage={
            touched.apellido_materno_contribuyente &&
            errors.apellido_materno_contribuyente
          }
        />
      </div>

      {/* correo y numeros telefónicos */}
      <div className="flex gap-x-4">
        {/* correo */}
        <Input
          className="grow min-w-[10rem]"
          color={touched.email && errors.email ? "danger" : "primary"}
          name="email"
          type="text"
          label="E-mail contribuyente"
          labelPlacement="outside"
          variant="faded"
          value={values.email ? values.email.toLowerCase() : ""}
          isRequired={true}
          onChange={(e) => setFieldValue("email", e.target.value.toLowerCase())}
          onBlur={handleBlur}
          isInvalid={touched.email && errors.email}
          errorMessage={touched.email && errors.email}
        />

        {/* teléfono 1 */}
        <Input
          className="w-[20rem]"
          color={
            touched.telefono1_contribuyente && errors.telefono1_contribuyente
              ? "danger"
              : "primary"
          }
          name="telefono1_contribuyente"
          type="text"
          label="Teléfono 1"
          labelPlacement="outside"
          variant="faded"
          value={
            values.telefono1_contribuyente
              ? values.telefono1_contribuyente.toUpperCase()
              : ""
          }
          isRequired={true}
          onChange={(e) =>
            setFieldValue(
              "telefono1_contribuyente",
              e.target.value.toUpperCase()
            )
          }
          onBlur={handleBlur}
          isInvalid={
            touched.telefono1_contribuyente && errors.telefono1_contribuyente
          }
          errorMessage={
            touched.telefono1_contribuyente && errors.telefono1_contribuyente
          }
        />

        {/* teléfono 2 */}
        <Input
          className="w-[20rem]"
          color={
            touched.telefono2_contribuyente && errors.telefono2_contribuyente
              ? "danger"
              : "primary"
          }
          name="telefono2_contribuyente"
          type="text"
          label="Teléfono 2"
          labelPlacement="outside"
          variant="faded"
          value={
            values.telefono2_contribuyente
              ? values.telefono2_contribuyente.toUpperCase()
              : ""
          }
          isRequired={false}
          onChange={(e) =>
            setFieldValue(
              "telefono2_contribuyente",
              e.target.value.toUpperCase()
            )
          }
          onBlur={handleBlur}
          isInvalid={
            touched.telefono2_contribuyente && errors.telefono2_contribuyente
          }
          errorMessage={
            touched.telefono2_contribuyente && errors.telefono2_contribuyente
          }
        />
      </div>

      {/* dirección, número y comuna */}
      <div className="flex gap-x-4">
        {/* dirección */}
        <Input
          className="grow min-w-[10rem]"
          color={
            touched.direccion_contribuyente && errors.direccion_contribuyente
              ? "danger"
              : "primary"
          }
          name="direccion_contribuyente"
          type="text"
          label="Dirección contribuyente"
          labelPlacement="outside"
          variant="faded"
          value={
            values.direccion_contribuyente
              ? values.direccion_contribuyente.toUpperCase()
              : ""
          }
          isRequired={true}
          onChange={(e) =>
            setFieldValue(
              "direccion_contribuyente",
              e.target.value.toUpperCase()
            )
          }
          onBlur={handleBlur}
          isInvalid={
            touched.direccion_contribuyente && errors.direccion_contribuyente
          }
          errorMessage={
            touched.direccion_contribuyente && errors.direccion_contribuyente
          }
        />

        {/* número de la dirección */}
        <Input
          className="w-[10rem]"
          color={
            touched.direccion_numero && errors.direccion_numero
              ? "danger"
              : "primary"
          }
          name="direccion_numero"
          type="text"
          label="Número"
          labelPlacement="outside"
          variant="faded"
          value={
            values.direccion_numero ? values.direccion_numero.toUpperCase() : ""
          }
          isRequired={false}
          onChange={(e) =>
            setFieldValue("direccion_numero", e.target.value.toUpperCase())
          }
          onBlur={handleBlur}
          isInvalid={touched.direccion_numero && errors.direccion_numero}
          errorMessage={touched.direccion_numero && errors.direccion_numero}
        />

        {/* comuna */}
        <div className="w-[20rem]">
          <SelectComponent
            arrayDataForSelect={commune}
            nameCodDataInArray={"cod_comuna"}
            nameDescDataInArray={"desc_comuna"}
            nameCodDataInContext={"cod_comuna"}
            name={"cod_comuna"}
            setFieldValue={setFieldValue}
            label={"Comuna"}
            isRequired={true}
            isInvalid={touched.cod_comuna && errors.cod_comuna ? true : false}
            errorMessage={touched.cod_comuna && errors.cod_comuna}
            loadForCod={values.cod_comuna}
          />
        </div>
      </div>

      {/* georeferencias y selección de transportista */}
      <div className="flex gap-x-4 justify-between">
        <Checkbox
          name="transportista"
          isSelected={values.transportista}
          onChange={() => setFieldValue("transportista", !values.transportista)}
        >
          El contribuyente es transportista?
        </Checkbox>

        <Button
          className="w-[17rem] text-lg"
          color="warning"
          variant="flat"
          isDisabled={values.cod_contribuyente !== null ? true : false}
          onPress={() => setOpen(true)}
        >
          Asociar georeferencias
        </Button>

        <ModalBaseTable
          title={"Georeferencias"}
          size={"2xl"}
          isOpen={open}
          onOpenChange={() => setOpen(false)}
          table={() =>
            Taxpayer_georeferencesTable({
              dataTaxpayerTable: {},
              setListGeoreferences: setListGeoreferences,
              listGeoreferences: listGeoreferences,
            })
          }
        />
      </div>

      <div className="flex w-full">
        <Textarea
          color="primary"
          variant="faded"
          name="desc_contribuyente"
          label="Descripción del contribuyente"
          labelPlacement="outside"
          value={
            values.desc_contribuyente
              ? values.desc_contribuyente.toUpperCase()
              : ""
          }
          onChange={(e) =>
            setFieldValue("desc_contribuyente", e.target.value.toUpperCase())
          }
          onBlur={handleBlur}
          isInvalid={touched.desc_contribuyente && errors.desc_contribuyente}
          errorMessage={touched.desc_contribuyente && errors.desc_contribuyente}
        />
      </div>
    </>
  );
};

export default Taxpayer_form;
