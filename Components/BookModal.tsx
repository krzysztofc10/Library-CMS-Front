import React from 'react';
import PropTypes, { any, arrayOf, bool, func, number } from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'grid',
  gridTemplateColumns: 'auto auto'
};

export const BookModal = ({
  modalVisible,
  setModalVisible,
  data: {
    authors,
    description,
    details,
    genre,
    id,
    isbn,
    issueDate,
    language,
    pages,
    title,
    type,
    publisher
  }
}) => {
  const newPhoto = String(id).length === 1 ? `0${id}` : String(id);

  return (
    <Modal
      disablePortal
      open={modalVisible}
      onClose={setModalVisible}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
          style={{
            position: 'absolute',
            left: '97%',
            top: '-3%',
            backgroundColor: 'lightgray',
            color: 'gray'
          }}
          onClick={setModalVisible}
        >
          <CloseIcon />
        </IconButton>
        <Box width={300} height={400}>
          <img
            src={`https://raw.githubusercontent.com/anqxyr/racovimge/master/examples/ex${newPhoto}.png`}
            alt="Live from space album cover"
            height={400}
            width={270}
          />
        </Box>
        <Box>
          <Typography id="modal-modal-title" variant="h3" component="h3">
            {title}
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="subtitle1"
            component="p"
            style={{ fontSize: 12 }}
          >
            ISBN: {isbn}
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h5">
            Autorzy:
            {authors.map((el) => (
              <div key={el.id} style={{ marginLeft: 20 }}>
                {el.firstName} {el.lastName}
              </div>
            ))}
          </Typography>
          {description !== null && (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {description}
            </Typography>
          )}
          <Typography id="modal-modal-title" variant="h5" component="h5">
            Gatunek: {genre.value}
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h5">
            Liczba stron: {pages}
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h5">
            Język: {language.value}
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h5">
            Data wydania: {issueDate}
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h5">
            Wydawca: {publisher.name}
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h5">
            Typ: {type}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

BookModal.propTypes = {
  modalVisible: bool.isRequired,
  setModalVisible: func.isRequired,
  data: PropTypes.shape({
    authors: arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired
      })
    ).isRequired,
    description: any,
    details: any,
    id: number.isRequired,
    genre: PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired
    }).isRequired,
    language: PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired
    }).isRequired,
    publisher: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    pages: PropTypes.number.isRequired,
    isbn: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    issueDate: PropTypes.string.isRequired
  }).isRequired
};
