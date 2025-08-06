import {
    TableCell,
    TableRow,
    styled,
    tableCellClasses,
    Drawer as MuiDrawer,
    AppBar as MuiAppBar,
    Paper as MuiPaper,
} from "@mui/material";

const drawerWidth = 240;

// Modern color palette
export const colors = {
    primary: "#2196f3",
    secondary: "#1565c0",
    success: "#4caf50",
    error: "#f44336",
    warning: "#ff9800",
    info: "#00bcd4",
    background: "#f5f5f5",
    paper: "#ffffff",
    text: "#333333",
    lightText: "#666666",
    border: "#e0e0e0",
    hover: "#f0f7ff"
};

// Enhanced table styles
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: colors.primary,
        color: colors.paper,
        fontWeight: 600,
        fontSize: 15,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: colors.text,
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: colors.background,
    },
    '&:hover': {
        backgroundColor: colors.hover,
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// Modern AppBar with gradient and shadow
export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    background: `linear-gradient(45deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

// Enhanced Drawer with modern styling
export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            backgroundColor: colors.paper,
            boxShadow: '2px 0 20px 0 rgba(0,0,0,0.05)',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

// Modern styled Paper component for cards and containers
export const StyledPaper = styled(MuiPaper)(({ theme }) => ({
    backgroundColor: colors.paper,
    padding: theme.spacing(3),
    borderRadius: 12,
    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 25px 0 rgba(0,0,0,0.1)',
    },
}));