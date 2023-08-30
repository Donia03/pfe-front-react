import React from "react";
import { PermIdentity, LineStyle, Timeline, TrendingUp, Storefront, AttachMoney, BarChart, MailOutline, DynamicFeed, ChatBubbleOutline, WorkOutline, Report } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./sidebar.css"; // Import the CSS file

export default function Sidebar() {
  const role = localStorage.getItem("role");

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        {role === "Client" ? (
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Quick Menu</h3>
            <ul className="sidebarList">
              <Link to="/reclamations" className="link">
                <li className="sidebarListItem">
                  <PermIdentity className="sidebarIcon" />
                  Reclamations
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
                    Home
                  </li>
                </Link>
                <li className="sidebarListItem">
                  <Timeline className="sidebarIcon" />
                  Analytics
                </li>
                <li className="sidebarListItem">
                  <TrendingUp className="sidebarIcon" />
                  Sales
                </li>
              </ul>
            </div>
            <div className="sidebarMenu">
              <h3 className="sidebarTitle">Quick Menu</h3>
              <ul className="sidebarList">
                <Link to="/users" className="link">
                  <li className="sidebarListItem">
                    <PermIdentity className="sidebarIcon" />
                    Users
                  </li>
                </Link>
                <Link to="/clients" className="link">
                  <li className="sidebarListItem">
                    <PermIdentity className="sidebarIcon" />
                    Clients
                  </li>
                </Link>
                <Link to="/prospects" className="link">
                  <li className="sidebarListItem">
                    <PermIdentity className="sidebarIcon" />
                    Prospect
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
                                   demandes
                                  </li>
                                </Link>

                <Link to="/products" className="link">
                  <li className="sidebarListItem">
                    <Storefront className="sidebarIcon" />
                    Products
                  </li>
                </Link>
                <Link to="/note" className="link">
                                  <li className="sidebarListItem">
                                    <Storefront className="sidebarIcon" />
                                    Notes
                                  </li>
                                </Link>
                <li className="sidebarListItem">
                  <AttachMoney className="sidebarIcon" />
                  Transactions
                </li>
                <li className="sidebarListItem">
                  <BarChart className="sidebarIcon" />
                  Reports
                </li>
              </ul>
            </div>
            <div className="sidebarMenu">
              <h3 className="sidebarTitle">Notifications</h3>
              <ul className="sidebarList">
                <Link to="/email" className="link">
                  <li className="sidebarListItem">
                    <MailOutline className="sidebarIcon" />
                    Mail
                  </li>
                </Link>
                <li className="sidebarListItem">
                  <DynamicFeed className="sidebarIcon" />
                  Feedback
                </li>
                <li className="sidebarListItem">
                  <ChatBubbleOutline className="sidebarIcon" />
                  Messages
                </li>
              </ul>
            </div>
            <div className="sidebarMenu">
              <h3 className="sidebarTitle">Staff</h3>
              <ul className="sidebarList">
                <li className="sidebarListItem">
                  <WorkOutline className="sidebarIcon" />
                  Manage
                </li>
                <li className="sidebarListItem">
                  <Timeline className="sidebarIcon" />
                  Analytics
                </li>
                <li className="sidebarListItem">
                  <Report className="sidebarIcon" />
                  Reports
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
