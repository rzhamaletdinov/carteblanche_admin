import {
  Box, Button, Input, Label,
} from '@adminjs/design-system';
import { ActionProps } from 'adminjs';
import React from 'react';

function NewMatchAction(props: ActionProps) {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    const userId1InputValue = event.target.elements.userId1Input.value;
    const userId2InputValue = event.target.elements.userId2Input.value;
    // console.log('process.env.API_HOST', process.env.API_HOST);
    // fetch(`${process.env.API_HOST}/chat/sendbird/chat/add`, {

    fetch('https://dev-api.thecarteblanche.club/chat/sendbird/chat/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer YOUR_AUTH_TOKEN'
      },
      body: JSON.stringify({
        userId1: +userId1InputValue,
        userId2: +userId2InputValue,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // or response.text() for non-JSON responses
      })
      .then((data) => {
        console.log('Success:', data);
        // Process the data in your admin panel
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle errors in your admin panel
      });
  };

  return (
    <Box variant="grey">
      {/* <H1>My Custom Admin Page</H1> */}
      <form onSubmit={handleSubmit}>
        <Box mb="lg">
          <Label>User Id 1:</Label>
          <Input id="userId1Input" name="userId1Input" placeholder="Enter user id" type="number" />
        </Box>
        <Box mb="lg">
          <Label>User Id 2:</Label>
          <Input id="userId2Input" name="userId2Input" placeholder="Enter user id" type="number" />
        </Box>
        <Button variant="contained" type="submit">Submit</Button>
      </form>
    </Box>
  );
}

export default NewMatchAction;
