import { Select, SelectItem } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import apiPut from "../api/apiPut";
import useVehicle from "../hooks/useVehicle";

const Select_Component = ({
  codPrimary, // codigo del valor principal a modificar
  rowData, // valor del dato
  listData, // lista de datos para el select
  codData, // codigo del dato
  descData, // descripcion del datos
  row,
}) => {
  const { data, typeVehicle, modelVehicle, stateVehicle, updateVehicleData } =
    useVehicle();

  // variables de state
  const [varState, setVarState] = useState({
    loading: true,
    selectedValue: new Set([]),
  });

  // actualizador de los estados del componente
  const updateVarState = useCallback((newValue) => {
    setVarState((preValue) => ({ ...preValue, ...newValue }));
  });

  // manejador de los datos iniciales y cargas
  useEffect(() => {
    if (listData && listData.length > 0) {
      // se busca el cod_para precargar el select
      const selectedState = listData.find((item) => item[descData] === rowData);

      // actualización de los estados
      updateVarState({
        loading: false,
        selectedValue: selectedState
          ? new Set([selectedState[codData].toString()])
          : new Set([]),
      });
    }
    // console.log(row);
  }, [listData]);

  const handleSelectedValue = (newValue) => {
    // controlar si la selección es la misma que el valor acutual
    if (!newValue) return;

    // Creación de las alertas personalizadas ============>
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-blue-500 rounded-lg px-3 py-2 text-white mx-2",
        cancelButton: "bg-red-500 rounded-lg px-3 py-2 text-white mx-2",
      },
      buttonsStyling: false,
    });

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    swalWithBootstrapButtons
      .fire({
        title: "Confirmación de modificación",
        text: "Esta seguro de realizar la modificación ?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // array de datos para actualizar estado !!
          const payload = {
            ...row,
            cod_tipo_vehiculo: typeVehicle.find(
              (item) => item.desc_tipo_vehiculo === row.desc_tipo_vehiculo
            ).cod_tipo_vehiculo,
            cod_modelo: modelVehicle.find(
              (item) => item.desc_modelo === row.desc_modelo
            ).cod_modelo,
            cod_marca: modelVehicle.find(
              (item) => item.desc_modelo === row.desc_modelo
            ).cod_marca,
            cod_estado_vehiculo: newValue,
          };

          apiPut({
            route: `vehiculos/${codPrimary}`,
            object: payload,
          }).then((response) => {
            // actualización del state del select
            updateVarState({ selectedValue: new Set([newValue]) });

            updateVehicleData({
              data: data.map((item) =>
                item.cod_vehiculo === codPrimary
                  ? {
                      ...item,
                      desc_estado_vehiculo: stateVehicle.find(
                        (item) => item.cod_estado_vehiculo === Number(newValue)
                      ).desc_estado_vehiculo,
                    }
                  : item
              ),
            });

            Toast.fire({
              icon: "success",
              title: "Modificación de datos exitosa!!",
            });
          });
        }
      });
  };

  return (
    <Select
      aria-label="Estado vehiculo"
      placeholder={varState.loading ? "Cargando..." : "Seleccionar"}
      size="md"
      variant="faded"
      color="success"
      isLoading={varState.loading}
      selectedKeys={varState.selectedValue}
      onSelectionChange={(key) => handleSelectedValue(key.currentKey)}
    >
      {listData.map((item) => (
        <SelectItem key={item[codData]}>{item[descData]}</SelectItem>
      ))}
    </Select>
  );
};

export default Select_Component;
