import Swal from 'sweetalert2';
import useStyles from "@jumbo/vendors/sweetalert2/style";
import withReactContent from "sweetalert2-react-content";
import styled from "@emotion/styled";
import {TableCell, TableRow} from "@mui/material";

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '& .MuiTableCell-root': {
        borderBottom: "none",
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },

    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },

    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    }
}));

export const StyledTableCell = styled(TableCell)(({theme}) => ({
    borderBottom: "none",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
})); 

const useSwalWrapper = () => {
    const sweetAlertStyles = useStyles();
    const FinalSwal = Swal.mixin({
        customClass: {
            container: `${sweetAlertStyles.container}`,
            popup: `${sweetAlertStyles.popup}`,
            title: `${sweetAlertStyles.title}`,
            closeButton: `${sweetAlertStyles.closeButton}`,
            image: `${sweetAlertStyles.image}`,
            htmlContainer: `${sweetAlertStyles.htmlContainer}`,
            confirmButton: `${sweetAlertStyles.confirmButton}`,
            cancelButton: `${sweetAlertStyles.cancelButton}`,
            footer: `${sweetAlertStyles.footer}`,
        },
        buttonsStyling: false,
    });

    return withReactContent(FinalSwal);
};

export default useSwalWrapper;