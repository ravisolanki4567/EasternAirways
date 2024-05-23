import React, { Component } from "react";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import Button from "@mui/material/Button";
import "../style/booking.css";
import "../style/trip.css";
import Modal from "react-bootstrap/Modal";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import api from "../api";
import { withRouter } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import SingleSeats from "./SingleSeats";

class Booking extends Component {
  state = {
    showModal: false,
    deptFlight: "",
    arrFlight: "",
  };

  async componentDidMount() {
    const { confirmationNum, userId, reservation } = this.props;
    const { DepFlight, ArrFlight } = reservation;
    await api.getFlightById(DepFlight._id).then((Flight) => {
      this.setState(
        {
          deptFlight: Flight.data.data,
        },
        () => console.log("")
      );
      //, () => console.log("")
    });
    await api.getFlightById(ArrFlight._id).then((Flight) => {
      this.setState(
        {
          arrFlight: Flight.data.data,
        },
        () => console.log("")
      );
      //, () => console.log(Flight.data.data)
    });
  }

  render() {
    const { confirmationNum, userId, reservation } = this.props;
    const {
      PassengerFirstName,
      PassengerLastName,
      PassengerType,
      ArrFlight,
      DepFlight,
      DepCabin,
      ArrCabin,
      DepSeat,
      ArrSeat,
    } = reservation;

    const { showModal, deptFlight, arrFlight } = this.state;

    let dep =
      DepCabin === "Economy"
        ? "EconomySeats"
        : DepCabin === "Business"
        ? "BusinessSeats"
        : DepCabin === "FirstClass"
        ? "FirstClassSeats"
        : "";
    let arr =
      DepCabin === "Economy"
        ? "EconomySeats"
        : DepCabin === "Business"
        ? "BusinessSeats"
        : DepCabin === "FirstClass"
        ? "FirstClassSeats"
        : "";
    let depType = PassengerType === "Adult" ? "PriceAdult" : "PriceChild";
    let arrType = PassengerType === "Adult" ? "PriceAdult" : "PriceChild";
    let totalPrice =
      deptFlight && arrFlight
        ? deptFlight[dep][depType] + arrFlight[arr][arrType]
        : 0;
    // let totalPrice = 0;

    return (
      <>
        <div className="booking-card">
          <div style={{ width: "70%", marginTop: "5px" }}>
            <div
              style={{
                marginLeft: "2rem",
                marginBottom: "7px",
                marginTop: "0px",
              }}
            >
              <strong>
                {/* <h5>Confirmation Number : {confirmationNum.toUpperCase()}</h5> */}
                <h5 className="emphasis">
                  {PassengerFirstName.toUpperCase() +
                    " " +
                    PassengerLastName.toUpperCase()}
                </h5>
              </strong>
            </div>

            <div className="booking-flight" style={{ marginTop: "0px" }}>
              <div className="trip-flex-col">
                <p className="emphasis">
                  {deptFlight.DepartureDate}
                  {">"} {deptFlight.ArrivalDate}{" "}
                </p>
                <p>
                  {deptFlight.DepartureTime} {">"} {deptFlight.ArrivalTime}
                </p>
              </div>

              <div className="trip-flex-col">
                <div className="flex-row">
                  <div className="emphasis">
                    <AirlineSeatReclineNormalIcon />
                    {DepSeat}
                  </div>
                </div>
                <p style={{ width: "120px", textAlign: "center" }}>
                  {reservation.DepCabin}
                </p>
              </div>

              <div className="trip-flex-col">
                <p className="emphasis">{deptFlight.TripDuration} </p>
                <p>
                  {deptFlight.DepartureAirport}-{deptFlight.ArrivalAirport}
                </p>
              </div>

              {/* <Link to='/editDep'> */}

              {/* </Link> */}
            </div>

            <div className="booking-flight">
              <div className="trip-flex-col">
                <p className="emphasis">
                  {arrFlight.DepartureDate}
                  {">"} {arrFlight.ArrivalDate}{" "}
                </p>
                <p>
                  {arrFlight.DepartureTime} {">"} {arrFlight.ArrivalTime}
                </p>
              </div>

              <div className="trip-flex-col">
                <div className="flex-row">
                  <div className="emphasis">
                    <AirlineSeatReclineNormalIcon />
                    {ArrSeat}
                  </div>
                </div>

                <p style={{ width: "120px", textAlign: "center" }}>
                  {reservation.ArrCabin}
                </p>
              </div>

              <div className="trip-flex-col">
                <p className="emphasis">{arrFlight.TripDuration} </p>
                <p>
                  {arrFlight.DepartureAirport}-{arrFlight.ArrivalAirport}
                </p>
              </div>
            </div>
          </div>
          <div className="vl"></div>
          <div className="trip-flex-col" style={{ width: "30%" }}>
            <h3>{totalPrice}$</h3>
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(Booking);
