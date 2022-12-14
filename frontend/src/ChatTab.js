import { Box, Container, Stack, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import * as React from 'react';

export default function ChatTab() {
  return(
    <>
      {/* Users */}
      <Stack spacing={1} sx={{width: 160, m: 1}}>
        <Container sx={{bgcolor: 'gray', p: 2, borderRadius: 2}}>
          User 1
        </Container>
        <Container sx={{bgcolor: 'black', p: 2, borderRadius: 2, color: 'white'}}>
          User 2
        </Container>
        <Container sx={{bgcolor: 'gray', p: 2, borderRadius: 2}}>
          User 3
        </Container>
        <Container sx={{bgcolor: 'gray', p: 2, borderRadius: 2}}>
          User 4
        </Container>
      </Stack>
      {/* Messages */}
      <Stack sx={{width: .8, p: 1}}>
        <Stack spacing={1} sx={{height: 1, p: 1, mx: 10}}>
          <div style={{textAlign: 'right', backgroundColor: 'red', width: 'auto', marginLeft: 'auto', borderRadius: 20, padding: 5, paddingLeft: 10, paddingRight: 10}}>message 1 from current user</div>
          <div style={{textAlign: 'left', backgroundColor: 'gray', width: 'auto', marginRight: 'auto', borderRadius: 20, padding: 5, paddingLeft: 10, paddingRight: 10}}>message 1 from another user</div>
          <div style={{textAlign: 'right', backgroundColor: 'red', width: 'auto', marginLeft: 'auto', borderRadius: 20, padding: 5, paddingLeft: 10, paddingRight: 10}}>2 from current</div>
          <div style={{textAlign: 'left', backgroundColor: 'gray', width: 'auto', marginRight: 'auto', borderRadius: 20, padding: 5, paddingLeft: 10, paddingRight: 10}}>2 from another user</div>
          <div style={{textAlign: 'right', backgroundColor: 'red', width: 'auto', marginLeft: 'auto', borderRadius: 20, padding: 5, paddingLeft: 10, paddingRight: 10}}>3 from current</div>
        </Stack>
        <Box sx={{width: 1, height: 100, display: 'flex', px: 10, m: 'auto'}}>
          <TextField fullWidth sx={{pl: 5}}>
            Message
          </TextField>
          <div style={{margin: 'auto', padding: 10, paddingBottom: 30, cursor: 'pointer'}}>  
            <SendIcon fontSize='large'/>
          </div>
        </Box>
      </Stack>
    </>
  );
}