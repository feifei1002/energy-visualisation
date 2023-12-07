// Import React library
import React from 'react';
import { useTable } from 'react-table';
import { Table, Button, Modal, Form} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Define table component
export default function WebAdminUsersTable({ columns, data, authToken, fetchAllUsers}) {
    //Variables for resetting passwords
    const [showModal, setShowModal] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    const openModal = (user) => {
      setSelectedUser(user);
      setShowModal(true); //Open modal to reset password for selected user
    };
  
    const closeModal = () => {
      setShowModal(false);
      setNewPassword(''); // Clear password field when closing the modal
    };
  
    const applyPasswordReset = async () => {
      // Make an API call to reset the password
      try{
          const response = await axios.post('/api/resetpassword',
            {
              username: selectedUser.username,
              newPassword: newPassword,
            },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
        );

        // Alert user of reset password success
        toast.success('Reset password successful!');
      } catch(e){
        // Alert use of reset password error
        toast.error('Error resetting password');
      }
     
      closeModal();
    };

    //Apply user delete
    const deleteUser = async (selectedUser) => {
      // Make an API call to delete the user
      try{
        if (window.confirm('Are you sure you wish to delete this item?')){
          const response = await axios.post(`/api/deleteuser/${selectedUser._id}`,
          null,  // Pass null as the request body since it's a DELETE request
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          //Refetch the user data
          fetchAllUsers();

          // Alert user of deleted user
          toast.success('Deleted user!');
       } else {
          // Alert user that user is not deleted
          toast.info('User not deleted');
       }
      } catch(e){
        // Alert user of deleting user error
        console.log(e)
        toast.error('Error deleting user!');
      }
    };

    // Use the useTable hook to create an instance of the table
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
              <th>Reset Password</th>
              <th>Delete User</th>
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
                  <Button variant="primary"  data-testid="ResetPasswordButton" 
                    style={{
                    backgroundColor: 'cadetblue',
                    color: 'black',
                    padding: '1vw'}}  
                    onClick={() => openModal(row.original)}>
                    Reset Password
                  </Button>
                </td>
                <td>
                <Button variant="primary"  data-testid="DeleteUserButton" 
                    style={{
                    backgroundColor: 'cadetblue',
                    color: 'black',
                    padding: '1vw'}}  
                    onClick={() => deleteUser(row.original)}>
                    Delete User
                </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      
      {/* Reset Password Modal */}
     {selectedUser && ( <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password For {selectedUser.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
     )}
    </>
    );
}