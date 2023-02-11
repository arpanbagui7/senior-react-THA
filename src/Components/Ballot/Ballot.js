import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Modal from "@mui/material/Modal";
import "./Ballot.css";
import api from "../../Api/Api";

const Ballot = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [data, setData] = useState([]);
  const [selectedNominee, setSelectedNominee] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    if (!openModal) {
      fetchData();
    }
  }, [openModal]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { items } = await api.getBallotData();
      const itemList = {};
      items.map((item) => {
        const { id } = item;
        itemList[id] = {
          selected: false,
          selectedMovie: "",
        };
      });
      setSelectedNominee(itemList);
      setData(items);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const handleNomineeSelection = (itemId, movieId) => {
    setSelectedNominee({
      ...selectedNominee,
      [itemId]: { selected: true, selectedMovie: movieId },
    });
  };

  const handleNomineeSubmission = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  if (loading)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}>
        <CircularProgress color='inherit' />
      </Backdrop>
    );
  return (
    <Box sx={{ flexGrow: 1 }}>
      {data.map((item) => (
        <Grid key={item.id} sx={{ marginBlock: "1rem" }} container spacing={2}>
          <Grid
            sx={{ backgroundColor: "gray", color: "white" }}
            md={12}
            xs={12}>
            <Typography variant='h5'>{item.title}</Typography>
          </Grid>
          {item.items.map((i) => (
            <Grid key={i.id} xs={6} md={4}>
              <Card
                sx={{ height: "350px!important" }}
                className={
                  selectedNominee[item.id]["selectedMovie"] === i.id
                    ? "ballot-card-selected"
                    : "ballot-card"
                }>
                <CardHeader title={i.title} />
                <CardContent>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}>
                    <CardMedia
                      sx={{ borderRadius: "50%", width: "150px" }}
                      component='img'
                      height='150'
                      image={i.photoUrL}
                      alt={i.title}
                    />
                  </div>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  {selectedNominee[item.id]["selectedMovie"] !== i.id && (
                    <Button
                      className='ballot-button'
                      variant='contained'
                      onClick={() => handleNomineeSelection(item.id, i.id)}>
                      Submit Button
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ))}
      <Button variant='contained' onClick={handleNomineeSubmission}>
        Submit Ballot Button
      </Button>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-describedby='modal-modal-description'>
        <Box className='success-modal'>
          <Typography variant='h4' id='modal-modal-description' sx={{ mt: 2 }}>
            Success
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default Ballot;
