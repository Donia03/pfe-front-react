import React, { useState, useEffect, useContext } from "react";

import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import ReclamationList from "./pages/reclamationList/ReclamationList";
import Detail from "./pages/reclamationDetail/Detail";
import ClientList from "./pages/client/clientList/ClientList";
import Client from "./pages/client/singleClient/Client";
import NewClient from "./pages/client/newClient/NewClient"
import ProspectList from "./pages/prospect/prospectList/ProspectList";
import NewProspect from "./pages/prospect/newProspect/NewProspect";
import Prospect from "./pages/prospect/singleProspect/SingleProspect";
import EmployeList from "./pages/employe/employeList/EmployeList"
import SingleEmploye from "./pages/employe/singleEmploye/SingleEmploye"
import NewEmploye from "./pages/employe/newEmploye/NewEmploye.jsx"
import Note from "./pages/note/noteList/Note"
import EmailSender from "./pages/email/EmailSender"
import Login from "./pages/login/Login"
import ForgotPassword from "./pages/login/ForgotPassword"
import ResetPassword from "./pages/login/ResetPassword";
import {AuthContext} from "./context/AuthContext";
import ReclamationClient from "./pages/reclamationClient/ReclamationClient";
import DemandeClient from "./pages/demande/newDemande/DemandeClient.jsx"
import DemandeList from "./pages/demande/demandeList/DemandeList"
import Demande from "./pages/demande/singleDemande/Demande"
import HistoriqueList from "./pages/historique/HistoriqueList"
import Profil from "./pages/profil/Profil.jsx"
import Contact from "./pages/contactSociete/ContactSociete.jsx"
import Import from "./pages/import/Import.jsx"
function App() {
    // State to simulate authentication status (true if authenticated, false otherwise)
    		const { authenticated } = useContext(AuthContext);


  return (
    <Router>
      <Topbar />
      <div className="container">
        {authenticated && <Sidebar />}
        <Switch>
          <Route exact path="/">
            {/* If authenticated, redirect to home; otherwise, redirect to login */}
            {authenticated ? <Redirect to="/home" /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
             <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>

          <Route path="/compte/:userId">
            <Profil />
          </Route>
          <Route path="/contactSociete">
            <Contact />
          </Route>
          <Route path="/historiques">
                      <HistoriqueList />
                    </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
            </Route>

          <Route path="/clients">
            <ClientList />
          </Route>
          <Route path="/prospects">
                      <ProspectList />
                    </Route>
            <Route path="/newProspect">
                            <NewProspect />
                             </Route>
            <Route path="/employes">
              <EmployeList />
                  </Route>

             <Route path="/singleEmploye/:userId">
             <SingleEmploye/>
             </Route>
             <Route path="/newEmploye">
             <NewEmploye/>
             </Route>

                    
           <Route path="/prospect/:userId">
                       <Prospect />
                     </Route>
          <Route path="/client/:userId">
            <Client />
          </Route>
           <Route path="/newClient">
                  <NewClient />
                   </Route>

          <Route path="/reclamations">
             <ReclamationList />
          </Route>
           <Route path="/detail/:reclamationId">
                       <Detail />
                    </Route>
          <Route path="/reclamationClient">
               <ReclamationClient/>
          </Route>
          <Route path="/demandeList">
                         <DemandeList/>
                    </Route>
          <Route path="/demandeClient">
               <DemandeClient/>
          </Route>
          <Route path="/demande/:demandeId">
                      <Demande />
                    </Route>
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/newproduct">
            <NewProduct />
          </Route>
          <Route path="/email">
               <EmailSender />
           </Route>
           <Route path="/note">
                          <Note />
                      </Route>
           <Route path="/import">
               <Import />
           </Route>
           <Route path="/forgotPassword">
             <ForgotPassword />
           </Route>
           <Route
             path="/resetPassword/:token">
               <ResetPassword/>
           </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
