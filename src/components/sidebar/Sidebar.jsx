import React from "react";
import { PermIdentity, LineStyle, Timeline, TrendingUp, Storefront, AttachMoney, BarChart, MailOutline, DynamicFeed, ChatBubbleOutline, WorkOutline, Report } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./sidebar.css"; // Import the CSS file

export default function Sidebar() {
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("id");

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        {role === "Client" ? (
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Quick Menu</h3>
            <ul className="sidebarList">
            <Link to={`/compte/${userId}`}  className="link">
                                            <li className="sidebarListItem">
                                              <PermIdentity className="sidebarIcon" />
                                              Mon Profil
                                            </li>
                                          </Link>
            <Link to="/historiques" className="link">
               <li className="sidebarListItem">
               <Timeline className="sidebarIcon" />
                Historiques
            </li>
            </Link> 
              <Link to="/reclamationClient" className="link">
                            <li className="sidebarListItem">
                              <Report className="sidebarIcon" />
                             Crée Reclamation
                            </li>
                          </Link>
                            <Link to="/demandeClient" className="link">
                                          <li className="sidebarListItem">
                                            <Report className="sidebarIcon" />
                                            Crée Demande
                                          </li>
                                        </Link>
              <Link to="/reclamations" className="link">
                <li className="sidebarListItem">
                  <Report className="sidebarIcon" />
               Liste Des Reclamations
                </li>
              </Link>
              <Link to="/demandeList" className="link">
                                                <li className="sidebarListItem">
                                                  <Report className="sidebarIcon" />
                                               Liste Des demandes
                                                </li>
                                              </Link>

            </ul>
          </div>
        ) : (
          <>
            <div className="sidebarMenu">
              <h3 className="sidebarTitle">Dashboard</h3>
              <ul className="sidebarList">
                <Link to="/" className="link">
                  <li className="sidebarListItem active">
                    <LineStyle className="sidebarIcon" />
                    Dashboard
                  </li>
                </Link>
              </ul>
            </div>
            <div className="sidebarMenu">
              <h3 className="sidebarTitle"> Menu</h3>
              <ul className="sidebarList">
          
            <Link to={`/compte/${userId}`} className="link">
                                            <li className="sidebarListItem">
                                              <PermIdentity className="sidebarIcon" />
                                              Mon Profil
                                            </li>
                                            </Link>
              <Link to="/historiques" className="link">
                                <li className="sidebarListItem">
                                  <Timeline className="sidebarIcon" />
                                  Historiques
                                </li>

                              </Link>



                {role === "Admin" && (

                <Link to="/employes" className="link">
                  <li className="sidebarListItem">
                    <PermIdentity className="sidebarIcon" />
                   Liste des employés
                  </li>
                </Link>
                )}
                <Link to="/clients" className="link">
                  <li className="sidebarListItem">
                    <PermIdentity className="sidebarIcon" />
                   Liste des clients
                  </li>
                </Link>
                <Link to="/prospects" className="link">
                  <li className="sidebarListItem">
                    <PermIdentity className="sidebarIcon" />
                   Liste des Prospects
                  </li>
                </Link>
                <Link to="/reclamations" className="link">
                  <li className="sidebarListItem">
                    <Report className="sidebarIcon" />
                   Reclamations
                  </li>
                </Link>

                <Link to="/demandeList" className="link">
                                  <li className="sidebarListItem">
                                    <Report className="sidebarIcon" />
                                   Demandes
                                  </li>
                                </Link>

              
                <Link to="/note" className="link">
                                  <li className="sidebarListItem">
                                    <Storefront className="sidebarIcon" />
                                   Mes tâches
                                  </li>
                                </Link>
                <Link to="/import" className="link">
                    <li className="sidebarListItem">
                        <BarChart className="sidebarIcon" />
                          Importer
                           </li>
                </Link>
                 <Link to="/email" className="link">
                                  <li className="sidebarListItem">
                                    <MailOutline className="sidebarIcon" />
                                    Envoyer Email
                                  </li>
                                </Link>
                              
              </ul>
            </div>

          
          </>
        )}
      </div>
    </div>
  );
}
