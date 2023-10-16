import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
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
} from 'reactstrap';
import Profile from './Profile';
import { NavLink } from 'react-router-dom';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const dropdownItemStyle: React.CSSProperties = {
    color: 'black',
  };

  return (
    <div>
      <Navbar color='primary' dark expand='lg' fixed='top'>
        <Container>
          <NavLink to='/' className={'navbar-brand'} aria-hidden='true'>
            Conditional
          </NavLink>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <FontAwesomeIcon icon={icon({name: 'chart-simple'})} />
                  &nbsp;Evals
                </DropdownToggle>
                <DropdownMenu right>

                <DropdownItem>
                    <NavItem>
                      <NavLink
                        to='../pages/Evals/Introductory-Evaluations.tsx'
                        style={dropdownItemStyle}
                        className='nav-link'
                      >
                        Introductory Evaluations
                      </NavLink>
                    </NavItem>
                  </DropdownItem>

                  <DropdownItem>
                    <NavItem>
                      <NavLink
                        to='../pages/Evals/Membership-Evaluations.tsx'
                        style={dropdownItemStyle}
                        className='nav-link'
                      >
                        Membership Evaluations
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink
                        to='../pages/Evals/Current-Conditionals.tsx'
                        style={dropdownItemStyle}
                        className='nav-link'
                      >
                        Current Conditionals
                      </NavLink>
                    </NavItem>
                  </DropdownItem>

                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <FontAwesomeIcon icon={icon({name: 'table-list'})} />
                  &nbsp;Forms
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavItem>
                      <NavLink
                        to='../pages/Forms/Major-Project-Form.tsx'
                        style={dropdownItemStyle}
                        className='nav-link'
                      >
                        Major Project
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink
                        to='../pages/Forms/Co-Op-Submission.tsx'
                        style={dropdownItemStyle}
                        className='nav-link'
                      >
                        Co-op Submission
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink
                        to='../pages/Forms/Introductory-Evals-Form.tsx'
                        style={dropdownItemStyle}
                        className='nav-link'
                      >
                        Introductory Evals Form
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                <FontAwesomeIcon icon={icon({name: 'check'}) }/>
                  &nbsp;Attendance
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavItem>
                      <NavLink
                        to='../pages/Attendance/Directorship-Meeting.tsx'
                        style={dropdownItemStyle}
                        className='nav-link'
                      >
                        Directorship Meeting
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink
                        to='../pages/Attendance/Technical-Seminar.tsx'
                        style={dropdownItemStyle}
                        className='nav-link'
                      >
                        Technical Seminar
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink
                        to='../pages/Attendance/Attendance-History.tsx'
                        style={dropdownItemStyle}
                        className='nav-link'
                      >
                        Attendance History
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Admin
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavItem>
                      <NavLink
                        to='../pages/Admin/Member-Management.tsx'
                        style={dropdownItemStyle}
                        className='nav-link'
                      >
                        Member Management
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink
                        to='../pages/Admin/Co-Op-Management.tsx'
                        style={dropdownItemStyle}
                        className='nav-link'
                      >
                        Co-op Management
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink
                        to='../pages/Admin/Introductory-Evaluations-Presentation.tsx'
                        style={dropdownItemStyle}
                        className='nav-link'
                      >
                        Introductory Evaluations Presentation
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink
                        to='../pages/Admin/Member-Evaluations-Presentation.tsx'
                        style={dropdownItemStyle}
                        className='nav-link'
                      >
                        Membership Evaluations Presentation
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink
                        to='../pages/Admin/User-Logs.tsx'
                        style={dropdownItemStyle}
                        className='nav-link'
                      >
                        User Logs
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink
                        to='../pages/Admin/Clear-Cashe.tsx'
                        style={dropdownItemStyle}
                        className='nav-link'
                      >
                        Clear Cache
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <Nav navbar className="ml-auto">
              <Profile />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
