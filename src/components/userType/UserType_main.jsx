import { FaUserTag } from "react-icons/fa";
import DataTableComponent from "../DataTable_Component";
import HeaderComponent from "../Header_Component";
import { UserType_structure } from "./UserType_structure";

const UserType_main = ({ userType_data }) => {
  const eventClickNewData = () => alert("nuevo elemento");
  const eventClickDownloadData = () => alert("Descargar informacion");

  return (
    <>
      <HeaderComponent
        maintainer={"Tipos de usuarios"}
        iconCard={<FaUserTag size={35} />}
      />
      <DataTableComponent
        data={userType_data}
        structureData={UserType_structure()}
        newData={eventClickNewData}
        downloadData={eventClickDownloadData}
      />
    </>
  );
};

export default UserType_main;
