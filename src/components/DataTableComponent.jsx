import { useState } from "react";
import DataTable from "react-data-table-component";
import {
  providerFilter,
  providerPaginationDataTable,
  styleDataTable,
} from "../utils/providerDataTable";
import InfoDataTable from "./InfoDataTable";
import HeaderDataTableComponent from "./HeaderDataTableComponent";

const DataTableComponent = ({ data, structureData }) => {
  // estados generales de los datos
  const [stateData, setStateData] = useState({
    filterData: "",
    loadingData: false,
    errorData: null,
  });

  //actualizador de los estados
  const updateStateData = (newState) => {
    setStateData((prev) => ({ ...prev, ...newState }));
  };

  return (
    <section className="relative flex flex-colp-2">
      <DataTable
        customStyles={styleDataTable}
        fixedHeader
        subHeader
        subHeaderComponent={HeaderDataTableComponent({
          filter: stateData.filterData,
          updateStateData,
        })}
        columns={structureData}
        data={providerFilter({ data: data, filter: stateData.filterData })}
        highlightOnHover
        responsive
        persistTableHead
        noDataComponent={InfoDataTable()}
        pagination
        paginationComponentOptions={providerPaginationDataTable}
        progressPending={stateData.loadingData}
      />
    </section>
  );
};
