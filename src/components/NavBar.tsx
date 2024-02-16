import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarToggler,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavItem,
} from "reactstrap";
import Profile from "./Profile";
import { NavLink } from "react-router-dom";
import "../css/dashboard.css";

const DropdownNavItem: React.FC<{ to: string; label: string }> = ({ to, label }) => (
  <DropdownItem>
    <NavItem>
      <NavLink to={to} className="nav-link" style={{ color: "black" }}>
        {label}
      </NavLink>
    </NavItem>
  </DropdownItem>
);

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Toggles whether the navbar is expanded or not
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar color="primary" dark expand="lg" fixed="top">
      <Container>
        <NavLink
          to="/"
          className={"navbar-brand"}
          aria-hidden="true"
        />
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <FontAwesomeIcon icon={icon({ name: "chart-simple" })} />
                &nbsp;Evals
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownNavItem to="/evals/intro" label="Introductory Evaluations" />
                <DropdownNavItem to="/evals/spring" label="Membership Evaluations" />
                <DropdownNavItem to="/evals/conditionals" label="Current Conditionals" />
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <FontAwesomeIcon icon={icon({ name: "table-list" })} />
                &nbsp;Forms
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownNavItem to="/forms/major-project" label="Major Project" />
                <DropdownNavItem to="/forms/coop" label="Co-op Submission" />
                <DropdownNavItem to="/forms/intro-evals" label="Introductory Evals Form" />
              </DropdownMenu>
            </UncontrolledDropdown>

            <NavItem>
              <NavLink to="/housing" className="nav-link">
                <FontAwesomeIcon icon={icon({ name: "house" })} />
                &nbsp;Housing
              </NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <FontAwesomeIcon icon={icon({ name: "check" })} />
                &nbsp;Attendance
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownNavItem to="/attendance/directorship" label="Directorship Meeting" />
                <DropdownNavItem to="/attendance/seminar" label="Technical Seminar" />
                <DropdownNavItem to="/attendance/history" label="Attendance History" />
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Admin
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownNavItem to="/admin/member-management" label="Member Management" />
                <DropdownNavItem to="/admin/coop-management" label="Co-op Management" />
                <DropdownNavItem to="/admin/slideshow/intro" label="Introductory Evaluations Presentation" />
                <DropdownNavItem to="/admin/slideshow/spring" label="Membership Evaluations Presentation" />
                <DropdownNavItem to="/admin/logs" label="User Logs" />
                <DropdownNavItem to="/admin/clear-cache" label="Clear Cache" />
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar className="ml-auto">
            <Profile />
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
