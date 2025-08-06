import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotices } from '../redux/noticeRelated/noticeHandle';
import { Paper, Typography, CircularProgress, Box } from '@mui/material';
import TableViewTemplate from './TableViewTemplate';
import { StyledPaper } from './styles';

const SeeNotice = () => {
    const dispatch = useDispatch();

    const { currentUser, currentRole } = useSelector(state => state.user);
    const { noticesList, loading, error } = useSelector((state) => state.notice);

    useEffect(() => {
        // Get school ID based on user role
        const schoolId = currentRole === "Admin" ? 
            currentUser._id : // Admin's ID is the school ID
            currentUser.school._id; // For students and teachers, get school ID from their school object
        
        dispatch(getAllNotices(schoolId, "Notice"));
    }, [dispatch, currentUser, currentRole]);

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = Array.isArray(noticesList) ? noticesList.map((notice) => {
        const date = new Date(notice.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
            title: notice.title,
            details: notice.details,
            date: dateString,
            id: notice._id,
        };
    }) : [];

    if (error) {
        return (
            <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography color="error" variant="h6">
                    Error loading notices: {error}
                </Typography>
            </Box>
        );
    }

    return (
        <div style={{ marginTop: '20px' }}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                        Latest Notices
                    </Typography>
                    <StyledPaper>
                        {noticeRows.length > 0 ? (
                            <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
                        ) : (
                            <Box sx={{ 
                                textAlign: 'center', 
                                p: 3,
                                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                borderRadius: 1
                            }}>
                                <Typography variant="body1" color="textSecondary">
                                    No notices available at the moment
                                </Typography>
                            </Box>
                        )}
                    </StyledPaper>
                </>
            )}
        </div>
    );
};

export default SeeNotice;