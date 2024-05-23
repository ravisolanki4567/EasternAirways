import React, { Component } from "react";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import MailIcon from "@mui/icons-material/Mail";
import Booking from "../components/Booking";
import api from "../api";

export default class BookingReservation extends Component {
  state = {
    bookingsArr: [],
    showModal: false,
  };

  customFilter(arr, id) {
    let newArr = [];
    for (let i = 0; i < arr.length / 2; i++) {
      let j = Math.floor(i + arr.length / 2);
      newArr.push({
        PassengerFirstName: arr[i].PassengerFirstName,
        PassengerLastName: arr[i].PassengerLastName,
        PassengerPassportNumber: arr[i].PassengerPassportNumber,
        PassengerType: arr[i].PassengerType,
        PassengerType: arr[i].PassengerType,
        DepFlight: arr[i].FlightId,
        DepSeat: arr[i].ChosenSeat,
        DepCabin: arr[i].CabinClass,
        ArrFlight: arr[j].FlightId,
        ArrSeat: arr[j].ChosenSeat,
        ArrCabin: arr[j].CabinClass,
        id: id,
      });
    }

    return [newArr[1]];
  }
  render() {
    const { b } = this.props;
    return (
      <div>
        <div className="reservation-containor">
          {b.Reservation
            ? this.customFilter(b.Reservation, b._id).map((t) => (
                <Booking userId={b.UserId} reservation={t} />
              ))
            : ""}
        </div>
      </div>
    );
  }
}
