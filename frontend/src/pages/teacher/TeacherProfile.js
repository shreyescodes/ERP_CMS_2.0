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

const TeacherProfile = () => {
    const dispatch = useDispatch();
  const { currentUser, response, error } = useSelector((state) => state.user);
    const [isEditing, setIsEditing] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [formData, setFormData] = useState({
        name: currentUser.name,
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.address || '',
        dateOfBirth: currentUser.dateOfBirth || '',
        gender: currentUser.gender || '',
        qualification: currentUser.qualification || '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        dispatch(updateProfile(currentUser._id, formData, "Teacher"));
        setIsEditing(false);
        setShowSnackbar(true);
    };

    const handleCancel = () => {
        setFormData({
            name: currentUser.name,
            email: currentUser.email || '',
            phone: currentUser.phone || '',
            address: currentUser.address || '',
            dateOfBirth: currentUser.dateOfBirth || '',
            gender: currentUser.gender || '',
            qualification: currentUser.qualification || '',
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
                                <Avatar alt="Teacher Avatar" sx={{ width: 150, height: 150 }}>
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
                                <Typography variant="subtitle1" component="p" textAlign="center">
                                    Class: {currentUser.teachSclass.sclassName}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="center">
                                <Typography variant="subtitle1" component="p" textAlign="center">
                                    Subject: {currentUser.teachSubject.subName}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="center">
                                <Typography variant="subtitle1" component="p" textAlign="center">
                                    School: {currentUser.school.schoolName}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </StyledPaper>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Personal Information
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                {isEditing ? (
                                    <TextField
                                        fullWidth
                                        name="dateOfBirth"
                                        label="Date of Birth"
                                        type="date"
                                        value={formData.dateOfBirth}
                                        onChange={handleInputChange}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                ) : (
                                    <Typography variant="subtitle1" component="p">
                                        <strong>Date of Birth:</strong> {formData.dateOfBirth || 'Not provided'}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {isEditing ? (
                                    <TextField
                                        fullWidth
                                        name="gender"
                                        label="Gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        select
                                        SelectProps={{ native: true }}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </TextField>
                                ) : (
                                    <Typography variant="subtitle1" component="p">
                                        <strong>Gender:</strong> {formData.gender || 'Not provided'}
                                    </Typography>
                                )}
                            </Grid>
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
                            <Grid item xs={12}>
                                {isEditing ? (
                                    <TextField
                                        fullWidth
                                        name="qualification"
                                        label="Qualification"
                                        value={formData.qualification}
                                        onChange={handleInputChange}
                                        multiline
                                        rows={2}
                                    />
                                ) : (
                                    <Typography variant="subtitle1" component="p">
                                        <strong>Qualification:</strong> {formData.qualification || 'Not provided'}
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

export default TeacherProfile;