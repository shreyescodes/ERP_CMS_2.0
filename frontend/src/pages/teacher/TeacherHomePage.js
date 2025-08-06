import { Container, Grid, Typography, Box } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import styled from 'styled-components';
import Students from "../../assets/img1.png";
import Lessons from "../../assets/subjects.svg";
import Tests from "../../assets/assignment.svg";
import Time from "../../assets/time.svg";
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import { fetchTeacherStats } from '../../redux/teacherRelated/teacherHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { StyledPaper } from '../../components/styles';

const TeacherHomePage = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);
    const { testsCount, totalHours } = useSelector((state) => state.teacher);

    const classID = currentUser.teachSclass?._id
    const subjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
        dispatch(fetchTeacherStats(currentUser._id));
    }, [dispatch, subjectID, classID, currentUser._id]);

    const numberOfStudents = sclassStudents && sclassStudents.length;
    const numberOfSessions = subjectDetails && subjectDetails.sessions;

    const statsData = [
        { icon: Students, title: "Class Students", value: numberOfStudents },
        { icon: Lessons, title: "Total Lessons", value: numberOfSessions },
        { icon: Tests, title: "Tests Taken", value: testsCount },
        { icon: Time, title: "Total Hours", value: totalHours, suffix: "hrs" }
    ];

    return (
        <StyledContainer>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Grid container spacing={3}>
                        {statsData.map((stat, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <StyledPaper>
                                    <StyledBox>
                                        <img src={stat.icon} alt={stat.title} style={{ width: '50px', height: '50px' }} />
                                        <StyledTypography variant="h6">
                                            {stat.title}
                                        </StyledTypography>
                                        <StyledCountUp 
                                            start={0} 
                                            end={stat.value || 0} 
                                            duration={2.5} 
                                            suffix={stat.suffix || ''}
                                        />
                                    </StyledBox>
                                </StyledPaper>
                            </Grid>
                        ))}
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

export default TeacherHomePage;