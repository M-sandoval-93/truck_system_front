import { useDisclosure } from "@nextui-org/react";
import { useCallback, useState } from "react";
import HeaderComponent from "../Header_Component";
import HeaderCardComponent from "../HeaderCard_Component";
import { IoLogoModelS } from "react-icons/io";
import DataTableComponent from "../DataTable_Component";
import Structure_Component from "../structure/Structure_Component";
import VehicleModel_structure from "./VehicleModel_structure";

const VehicleModel_main = ({ vehicleModel_data }) => {
  // estados generales del componente
  const [stateComponent, setStateComponent] = useState({
    data: vehicleModel_data,
    edit: false,
    idEdit: null,
    descriptionEdit: null,
    error: null,
  });

  // constante con los string utilizados como parámetros
  const varString = {
    title: "Modelos de vehículos",
    titleModal: "Modelo de Vehículo",
    route: "modelos",
    propertyId: "cod_modelo",
    propertyName: "desc_modelo",
    cards: [
      {
        titleCard: "Modelos de vehículos",
        iconCard: <IoLogoModelS size={35} />,
        countCard: stateComponent?.data?.length,
      },
    ],
  };

  // actualizador de los estados del componente
  const updateStateComponent = useCallback((newState) => {
    setStateComponent((prev) => ({ ...prev, ...newState }));
  }, []);

  // estados para el manejo del modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const eventClickDownloadData = () => alert("Descargar informacion");

  return (
    <>
      {/* cabecera del mantenedor */}
      <HeaderComponent maintainer={varString.title}>
        {/* tarjeta del mantenedor */}
        {varString.cards.map((card, index) => (
          <HeaderCardComponent
            key={index}
            title={card.titleCard}
            icon={card.iconCard}
            count={card.countCard}
          />
        ))}
      </HeaderComponent>

      {/* modal del mantenedor */}
      {/* <ModalNewData
        stateComponent={stateComponent}
        updateStateComponent={updateStateComponent}
        title={varString.titleModal}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        route={varString.route}
        propertyId={varString.propertyId}
        propertyName={varString.propertyName}
      /> */}

      {/* tabla de datos del mantenedor */}
      <DataTableComponent
        data={stateComponent.data} // datos de la tabla
        structureData={VehicleModel_structure({
          data: stateComponent.data, // Array con los datos del mantenedorl
          onOpen, // función para abrir el modal
          route: varString.route, // ruta para trabajar con las peticiones axios
          propertyId: varString.propertyId, // propiedad del id
          propertyName: varString.propertyName, // propiedad de la descripción
          updateStateComponent, // actualizador del objeto state del componente
        })}
        onOpen={onOpen}
        downloadData={eventClickDownloadData}
      />
    </>
  );
};

export default VehicleModel_main;
