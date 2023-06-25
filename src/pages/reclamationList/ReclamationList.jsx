import "./reclamationList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ReclamationList() {
  const [data, setData] = useState(productRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "objet",
      headerName: "Objet de reclamation",
      width: 200,
    },
    { field: "quantite", headerName: "Quantite", width: 140 },
    {
      field: "referance",
      headerName: "referance",
      width: 140,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
    },
    {
       field: "Date",
          headerName: "Date d'achat",
          width: 160,
      },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/detail/" + params.row.id}>
              <button className="productListEdit">Details</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
