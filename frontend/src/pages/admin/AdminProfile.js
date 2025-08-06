import React, { useState } from 'react';
import styled from 'styled-components';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
    Avatar,
    Container,
    TextField,
    IconButton,
    Snackbar,
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/userRelated/userHandle';
import { StyledPaper } from '../../components/styles';

const AdminProfile = () => {
    const dispatch = useDispatch();
    const { currentUser, response, error } = useSelector((state) => state.user);
    const [isEditing, setIsEditing] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [formData, setFormData] = useState({
        name: currentUser.name,
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        schoolName: currentUser.schoolName || '',
        address: currentUser.address || '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        dispatch(updateProfile(currentUser._id, formData, "Admin"));
        setIsEditing(false);
        setShowSnackbar(true);
    };

    const handleCancel = () => {
        setFormData({
            name: currentUser.name,
            email: currentUser.email || '',
            phone: currentUser.phone || '',
            schoolName: currentUser.schoolName || '',
            address: currentUser.address || '',
        });
        setIsEditing(false);
    };

    return (
        <>
            <Container maxWidth="md">
                <StyledPaper elevation={3}>
                    <Box display="flex" justifyContent="flex-end">
                        {!isEditing ? (
                            <IconButton onClick={() => setIsEditing(true)} color="primary">
                                <EditIcon />
                            </IconButton>
                        ) : (
                            <Box>
                                <IconButton onClick={handleSubmit} color="primary">
                                    <SaveIcon />
                                </IconButton>
                                <IconButton onClick={handleCancel} color="error">
                                    <CancelIcon />
                                </IconButton>
                            </Box>
                        )}
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="center">
                                <Avatar alt="Admin Avatar" sx={{ width: 150, height: 150 }}>
                                    {String(currentUser.name).charAt(0)}
                                </Avatar>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="center">
                                {isEditing ? (
                                    <TextField
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        size="small"
                                    />
                                ) : (
                                    <Typography variant="h5" component="h2" textAlign="center">
                                        {currentUser.name}
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="center">
                                {isEditing ? (
                                    <TextField
                                        name="schoolName"
                                        value={formData.schoolName}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        size="small"
                                        label="School Name"
                                    />
                                ) : (
                                    <Typography variant="subtitle1" component="p" textAlign="center">
            School: {currentUser.schoolName}
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </StyledPaper>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Contact Information
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                {isEditing ? (
                                    <TextField
                                        fullWidth
                                        name="email"
                                        label="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <Typography variant="subtitle1" component="p">
                                        <strong>Email:</strong> {formData.email || 'Not provided'}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {isEditing ? (
                                    <TextField
                                        fullWidth
                                        name="phone"
                                        label="Phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <Typography variant="subtitle1" component="p">
                                        <strong>Phone:</strong> {formData.phone || 'Not provided'}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                {isEditing ? (
                                    <TextField
                                        fullWidth
                                        name="address"
                                        label="Address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        multiline
                                        rows={2}
                                    />
                                ) : (
                                    <Typography variant="subtitle1" component="p">
                                        <strong>Address:</strong> {formData.address || 'Not provided'}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={() => setShowSnackbar(false)}
                message={error || response}
                severity={error ? "error" : "success"}
            />
        </>
    );
};

export default AdminProfile;