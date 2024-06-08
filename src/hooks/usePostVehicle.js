import Swal from "sweetalert2";
import apiPost from "../api/apiPost";

const usePostVehicle = ({ data, updateStateComponent }) => {
  const onSubmit =
    (onClose) =>
    async (values, { setSubmitting }) => {
      const {
        idVehicle,
        patente,
        anioVehiculo,
        tonelaje,
        idTipoVehiculo,
        idModelo,
        descripcionVehiculo,
        idTransportista, // aún no !!
        vencimientoSeguro,
        vencimientoRevision,
        idChoferAsignado,
        idPatenteAcoplado,
      } = values;
      try {
        if (idVehicle === null) {
          await apiPost({
            route: "vehiculos",
            object: {
              desc_vehiculo: descripcionVehiculo,
              cod_tipo_vehiculo: idTipoVehiculo,
              cod_modelo: idModelo,
              cod_estado_vehiculo: 1,
              anio: anioVehiculo,
              fecha_vigencia_seguro: vencimientoSeguro,
              fecha_vigencia_revision: vencimientoRevision,
              cantidad_kilos: tonelaje,
              patente: patente.slice(0, -2),
              patente_completa: patente,
              cod_chofer: idChoferAsignado,
              cod_acoplado: idPatenteAcoplado,
              cod_marca: idTransportista,
            },
          }).then((response) => {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Registro almacenado",
            }).then(() => {
              console.log("actualizar array de datos");
            });
          });
        } else {
          console.log(`editar id: ${idVehicle}`);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    };

  return { onSubmit };
};

export default usePostVehicle;
