// Import React library
import React from 'react';
import { useTable } from 'react-table';
import { Table, Button, Modal, Form} from 'react-bootstrap';
import { useState, useEffect } from 'react';

// Define table component
export default function WebAdminUsersTable({ columns, data}) {
    //Variables for resetting passwords
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    const openModal = (user) => {
      setSelectedUser(user);
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
      setPassword(''); // Clear password field when closing the modal
    };
  
    const applyPasswordReset = () => {
      // Implement your password reset logic using selectedUser and password
      console.log('Resetting password for:', selectedUser.username, 'with password:', password);
      closeModal();
    };

    // Use the useTable hook to create an instance of your table
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data });
  
    // Render the table
    return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
                 <td>
                  <Button variant="primary" 
                    style={{
                    backgroundColor: 'cadetblue',
                    color: 'black',
                    padding: '1vw'}}  
                    onClick={() => openModal(row.original)}>
                    Reset Password
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      
      {/* Reset Password Modal */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password For {selectedUser.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={applyPasswordReset}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}