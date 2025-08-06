// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Grid,
//   Paper,
//   Box,
//   Container,
//   CircularProgress,
//   Backdrop,
// } from '@mui/material';
// import { AccountCircle, School, Group } from '@mui/icons-material';
// import styled from 'styled-components';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../redux/userRelated/userHandle';
// import Popup from '../components/Popup';
//
// const ChooseUser = ({ visitor }) => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const password = "zxc"
//
//   const { status, currentUser, currentRole } = useSelector(state => state.user);;
//
//   const [loader, setLoader] = useState(false)
//   const [showPopup, setShowPopup] = useState(false);
//   const [message, setMessage] = useState("");
//
//   const navigateHandler = (user) => {
//     if (user === "Admin") {
//       if (visitor === "guest") {
//         const email = "yogendra@12"
//         const fields = { email, password }
//         setLoader(true)
//         dispatch(loginUser(fields, user))
//       }
//       else {
//         navigate('/Adminlogin');
//       }
//     }
//
//     else if (user === "Student") {
//       if (visitor === "guest") {
//         const rollNum = "1"
//         const studentName = "Dipesh Awasthi"
//         const fields = { rollNum, studentName, password }
//         setLoader(true)
//         dispatch(loginUser(fields, user))
//       }
//       else {
//         navigate('/Studentlogin');
//       }
//     }
//
//     else if (user === "Teacher") {
//       if (visitor === "guest") {
//         const email = "tony@12"
//         const fields = { email, password }
//         setLoader(true)
//         dispatch(loginUser(fields, user))
//       }
//       else {
//         navigate('/Teacherlogin');
//       }
//     }
//   }
//
//   useEffect(() => {
//     if (status === 'success' || currentUser !== null) {
//       if (currentRole === 'Admin') {
//         navigate('/Admin/dashboard');
//       }
//       else if (currentRole === 'Student') {
//         navigate('/Student/dashboard');
//       } else if (currentRole === 'Teacher') {
//         navigate('/Teacher/dashboard');
//       }
//     }
//     else if (status === 'error') {
//       setLoader(false)
//       setMessage("Network Error")
//       setShowPopup(true)
//     }
//   }, [status, currentRole, navigate, currentUser]);
//
//   return (
//     <StyledContainer>
//       <Container>
//         <Grid container spacing={2} justifyContent="center">
//           <Grid item xs={12} sm={6} md={4}>
//             <div onClick={() => navigateHandler("Admin")}>
//               <StyledPaper elevation={3}>
//                 <Box mb={2}>
//                   <AccountCircle fontSize="large" />
//                 </Box>
//                 <StyledTypography>
//                   Admin
//                 </StyledTypography>
//                 Login as an administrator to access the dashboard to manage app data.
//               </StyledPaper>
//             </div>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             <StyledPaper elevation={3}>
//               <div onClick={() => navigateHandler("Student")}>
//                 <Box mb={2}>
//                   <School fontSize="large" />
//                 </Box>
//                 <StyledTypography>
//                   Student
//                 </StyledTypography>
//                 Login as a student to explore course materials and assignments.
//               </div>
//             </StyledPaper>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             <StyledPaper elevation={3}>
//               <div onClick={() => navigateHandler("Teacher")}>
//                 <Box mb={2}>
//                   <Group fontSize="large" />
//                 </Box>
//                 <StyledTypography>
//                   Teacher
//                 </StyledTypography>
//                 Login as a teacher to create courses, assignments, and track student progress.
//               </div>
//             </StyledPaper>
//           </Grid>
//         </Grid>
//       </Container>
//       <Backdrop
//         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         open={loader}
//       >
//         <CircularProgress color="inherit" />
//         Please Wait
//       </Backdrop>
//       <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//     </StyledContainer>
//   );
// };
//
// export default ChooseUser;
//
// const StyledContainer = styled.div`
//   background: linear-gradient(to bottom, #411d70, #19118b);
//   height: 120vh;
//   display: flex;
//   justify-content: center;
//   padding: 2rem;
// `;
//
// const StyledPaper = styled(Paper)`
//   padding: 20px;
//   text-align: center;
//   background-color: #1f1f38;
//   color:rgba(255, 255, 255, 0.6);
//   cursor:pointer;
//
//   &:hover {
//     background-color: #2c2c6c;
//     color:white;
//   }
// `;
//
// const StyledTypography = styled.h2`
//   margin-bottom: 10px;
// `;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Adminlogin');
      }
    } else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1";
        const studentName = "Dipesh Awasthi";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Studentlogin');
      }
    } else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Teacherlogin');
      }
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      } else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
      <StyledContainer>
        <Container maxWidth="lg">
          <Title>Select Your Role</Title>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card onClick={() => navigateHandler("Admin")}>
                <IconWrapper><AccountCircle fontSize="inherit" /></IconWrapper>
                <CardTitle>Admin</CardTitle>
                <CardDesc>Login as an administrator to manage system data.</CardDesc>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card onClick={() => navigateHandler("Student")}>
                <IconWrapper><School fontSize="inherit" /></IconWrapper>
                <CardTitle>Student</CardTitle>
                <CardDesc>Access your learning materials and assignments.</CardDesc>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card onClick={() => navigateHandler("Teacher")}>
                <IconWrapper><Group fontSize="inherit" /></IconWrapper>
                <CardTitle>Teacher</CardTitle>
                <CardDesc>Create courses and track student progress.</CardDesc>
              </Card>
            </Grid>
          </Grid>
        </Container>

        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}>
          <CircularProgress color="inherit" />
          &nbsp;&nbsp;Please Wait...
        </Backdrop>

        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </StyledContainer>
  );
};

export default ChooseUser;

// Styled Components
const StyledContainer = styled.div`
  //background: linear-gradient(135deg, #2c2c54, #3c1053);
  //background: linear-gradient(135deg, #1e1e2f, #3a0ca3);
  background: linear-gradient(135deg, #b2afbf, #8981fb, #d680e3);

  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 3rem 1rem;
  color: white;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.6);
`;

const Card = styled(Paper)`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  text-align: center;
  color: #fff;
  backdrop-filter: blur(10px);
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
  transition: transform 0.3s ease, background 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.12);
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #ffd369;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const CardDesc = styled.p`
  font-size: 1rem;
  color: #ccc;
`;
