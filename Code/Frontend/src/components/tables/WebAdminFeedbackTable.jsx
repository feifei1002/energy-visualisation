// Import React library
import React from 'react';
import { useTable } from 'react-table';
import { Table, Button, Modal, Form} from 'react-bootstrap';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Define table component
export default function WebAdminFeedbackTable({ columns, data, authToken, fetchAllFeedback}) {
    // Use the useTable hook to create an instance of the table
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data });

    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
      if (feedback) {
        deleteFeedback();
      }
    }, [feedback]);

    const openDeleteButton = (selectedFeedback) => {
      setFeedback(selectedFeedback);
    };
    
    const deleteFeedback = async () => {
      // Make an API call to delete the feedback
      try{
        const response = await axios.post(`/api/deletefeedback/${feedback._id}`,
        null,  // Pass null as the request body since it's a DELETE request
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

        //Refetch the feedback data
        fetchAllFeedback();

        // Alert user of deleted feedback
        toast.success('Deleted feedback!');
      } catch(e){
        // Alert user of deleting feedback error
        console.log(e)
        toast.error('Error deleting feedback!');
      }
    };
  
  
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
              <th>Delete Feedback</th>
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
                  <Button variant="primary"  data-testid="DeleteFeedbackButton" 
                    style={{
                    backgroundColor: 'cadetblue',
                    color: 'black',
                    padding: '1vw'}}  
                    onClick={() => openDeleteButton(row.original)}>
                    Delete Feedback
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
    );
}