import { Container, Grid, Typography, Box } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';
import { StyledPaper } from '../../components/styles';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector(state => state.user);

    const adminID = currentUser._id;

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const statsData = [
        {
            icon: Students,
            title: "Total Students",
            value: studentsList?.length || 0,
            color: "#2196f3"
        },
        {
            icon: Classes,
            title: "Total Classes",
            value: sclassesList?.length || 0,
            color: "#ff9800"
        },
        {
            icon: Teachers,
            title: "Total Teachers",
            value: teachersList?.length || 0,
            color: "#4caf50"
        }
    ];

    return (
        <StyledContainer>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Grid container spacing={3}>
                        {statsData.map((stat, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <StyledPaper>
                                    <StyledBox>
                                        <img src={stat.icon} alt={stat.title} style={{ width: '50px', height: '50px' }} />
                                        <StyledTypography variant="h6">
                                            {stat.title}
                                        </StyledTypography>
                                        <StyledCountUp 
                                            start={0} 
                                            end={stat.value} 
                                            duration={2.5} 
                                            style={{ color: stat.color }}
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
};

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
`;

export default AdminHomePage;