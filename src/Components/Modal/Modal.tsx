import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {initialStateType, openModalAC} from "../../redux/reducers/items-reducer";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const TransitionsModal= React.memo( () =>{
    const state = useSelector<AppRootStateType, initialStateType>(state => state.data)
    const {modalOpen, rowToModal} = state

    const dispatch = useDispatch()
    const handleClose = () => dispatch(openModalAC(false))

    return (
        <div>
            {rowToModal &&
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={modalOpen}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={modalOpen}>
                        <Box sx={style}
                             bgcolor={rowToModal.color}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                               Id: {rowToModal.id}
                            </Typography>
                            <Typography id="transition-modal-description" sx={{mt: 2}}>
                               Name: {rowToModal.name}.Year: {rowToModal.year}
                            </Typography>
                        </Box>
                    </Fade>
                </Modal>}
        </div>
    );
})