// import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react'
import Login from './Login';
import Signup from './Signup';
import { Paper, Typography } from '@mui/material';

export default function ParentComponent() {
    const [value, setValue] = useState('1');

    const handleChange = (_event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '400px', margin: '30px auto', height: '400px' }}>
            <Paper sx={{ width: '460px', margin: '0 0', paddingTop: '5px' }} elevation={6}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                            <Tab label={<Typography variant='h6' sx={{ fontSize: '19px', fontWeight: 'bold' }}>Login</Typography>} value="1" />
                            <Tab label={<Typography variant='h6' sx={{ fontSize: '19px', fontWeight: 'bold' }}>Signup</Typography>} value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Login handleTabChange={handleChange} />
                    </TabPanel>
                    <TabPanel value="2">
                        <Signup handleTabChange={handleChange} />
                    </TabPanel>
                </TabContext>
            </Paper>
        </Box>
    );
}