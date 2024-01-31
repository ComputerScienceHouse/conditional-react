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
      <NavLink to={to} className="nav-link" style={{ color: "black"}}>
        {label}
      </NavLink>
    </NavItem>
  </DropdownItem>
);

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
              <DropdownMenu right>
                <DropdownNavItem to="/intro_evals" label="Introductory Evaluations" />
                <DropdownNavItem to="/spring_evals" label="Membership Evaluations" />
                <DropdownNavItem to="/conditionals" label="Current Conditionals" />
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <FontAwesomeIcon icon={icon({ name: "table-list" })} />
                &nbsp;Forms
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownNavItem to="/major_project" label="Major Project" />
                <DropdownNavItem to="/co_op" label="Co-op Submission" />
                <DropdownNavItem to="intro_evals_form" label="Introductory Evals Form" />
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <FontAwesomeIcon icon={icon({ name: "check" })} />
                &nbsp;Attendance
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownNavItem to="attendance_directorship" label="Directorship Meeting" />
                <DropdownNavItem to="attendance_seminar" label="Technical Seminar" />
                <DropdownNavItem to="/attendance/history" label="Attendance History" />
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Admin
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownNavItem to="/admin/member_management" label="Member Management" />
                <DropdownNavItem to="/admin/co_op_management" label="Co-op Management" />
                <DropdownNavItem to="/admin/intro_evals_presentation" label="Introductory Evaluations Presentation" />
                <DropdownNavItem to="/admin/spring_evals_presentation" label="Membership Evaluations Presentation" />
                <DropdownNavItem to="/admin/logs" label="User Logs" />
                <DropdownNavItem to="/admin/clear_cache" label="Clear Cache" />
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
