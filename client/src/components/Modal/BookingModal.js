import React from "react";
import { Modal, Fade, Tooltip, Backdrop } from "@material-ui/core";
import MoreIcon from "@material-ui/icons/More";
import { Button } from "../../allComponentsFiles";
import useStyles from "./styles";

const BookingModal = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { session, orderedBy } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip
        id="instagram-tooltip"
        title="More Information"
        placement={window.innerWidth > 959 ? "top" : "left"}
        classes={{ tooltip: classes.tooltip }}
      >
        <Button
          color="success"
          size="sm"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleOpen}
        >
          <MoreIcon />
        </Button>
      </Tooltip>
      <Modal
        aria-labelledby="Payment Information"
        aria-describedby="Payment Information"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Payment Information</h2>
            <p id="transition-modal-description">Booking Information</p>
            <p>Payment ID: {session.payment_intent}</p>
            <p>Payment Status: {session.payment_status}</p>
            <p>
              Payment Total: {session.currency.toUpperCase()}{" "}
              {session.amount_total / 100}
            </p>
            <p>Paymnet Method: {session.payment_method_types[0]}</p>
            <p>Stripe Customer ID: {session.customer}</p>
            <p>Customer Email: {session.customer_details.email}</p>
            <p>Customer First Name: {orderedBy.firstName}</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default BookingModal;
