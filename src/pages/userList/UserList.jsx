import React, { useEffect} from "react";
import axios from "axios"
import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function UserList() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');

  useEffect( () => {
    loadUsers();
  }, [])

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8082/api/users",{
    headers: {
           "Authorization": `Bearer ${token}`,
          }
    })
    setData(result.data)
  }

  console.log("on a setter data avec seData => ",data)

  const handleDelete = (id) => {
    //setData(data.filter((item) => item.id !== id));
    axios.delete("http://localhost:8082/api/user/" + id).then(r  => console.log("element deleted"));

    const posts = data.filter(item => item.id !== id);
    setData( posts );

  };


  const columns = [
    {
      field: "nom",
      headerName: "Nom",
      width: 140,
    },
    { field: "prenom", headerName: "Prenom", width: 140 },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
      { field: "cin", headerName: "Identity", width: 100 },

      { field: "telephone", headerName: "Tel", width: 100 },


        {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
      {

         field:

           <Link to="/newUser">
                                <button className="userAdButton">Create User</button>
                              </Link>,

          width: 250,
        },

  ];

  return (
    <div className="userList">
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
