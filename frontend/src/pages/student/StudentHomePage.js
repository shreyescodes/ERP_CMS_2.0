import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { getStudentAssignmentsCount } from '../../redux/studentRelated/studentHandle';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import { StyledPaper } from '../../components/styles';

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { assignmentsCount } = useSelector((state) => state.student);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser.sclassName._id

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
        dispatch(getStudentAssignmentsCount(currentUser._id));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];
    return (
        <StyledContainer maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <StyledPaper>
                                <StyledBox>
                                    <img src={Subject} alt="Subjects" style={{ width: '50px', height: '50px' }} />
                                    <StyledTypography variant="h6">
                                        Total Subjects
                                    </StyledTypography>
                                    <StyledCountUp start={0} end={numberOfSubjects} duration={2.5} />
                                </StyledBox>
                            </StyledPaper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <StyledPaper>
                                <StyledBox>
                                    <img src={Assignment} alt="Assignments" style={{ width: '50px', height: '50px' }} />
                                    <StyledTypography variant="h6">
                                        Total Assignments
                                    </StyledTypography>
                                    <StyledCountUp start={0} end={assignmentsCount} duration={4} />
                                </StyledBox>
                            </StyledPaper>
                        </Grid>
                        <Grid item xs={12}>
                            <StyledPaper>
                                <ChartContainer>
                                    {response ? (
                                        <Typography variant="h6">No Attendance Found</Typography>
                                    ) : (
                                        <>
                                            {loading ? (
                                                <Typography variant="h6">Loading...</Typography>
                                            ) : (
                                                <>
                                                    {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                                                        <>
                                                            <StyledTypography variant="h6" gutterBottom>
                                                                Attendance Overview
                                                            </StyledTypography>
                                                            <CustomPieChart data={chartData} />
                                                        </>
                                                    ) : (
                                                        <Typography variant="h6">No Attendance Found</Typography>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    )}
                                </ChartContainer>
                            </StyledPaper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <StyledPaper>
                        <StyledTypography variant="h6" gutterBottom>
                            Latest Notices
                        </StyledTypography>
                        <SeeNotice />
                    </StyledPaper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
}

const StyledContainer = styled(Container)`
    padding-top: 2rem;
    padding-bottom: 2rem;
`;

const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 1rem;
`;

const StyledTypography = styled(Typography)`
    color: #1a237e;
    font-weight: 600;
    text-align: center;
`;

const StyledCountUp = styled(CountUp)`
    font-size: 2.5rem;
    font-weight: 600;
    color: #2196f3;
`;

const ChartContainer = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 300px;
`;

export default StudentHomePage;