import Seat from "../models/rsmodel.js";

export const viewSeatMap = async (req, res) => {
  try {
    const view = await Seat.find();
    res.send(view);
    console.log(view);
  } catch (err) {
    console.error("Error viewing SeatMap:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const reserve = async (req, res) => {
  try {
    const { seat } = req.body;
    const seatDoc = await Seat.findOne({ seat });

    if (!seatDoc) {
      return res.status(404).json({ error: 'Seat not found' });
    }

    if (seatDoc.availability === 'reserved') {
      return res.status(400).json({ error: 'Seat is already reserved' });
    }

    seatDoc.availability = 'reserved';
    await seatDoc.save();

    res.json({ message: `Seat ${seat} reserved successfully` });
  } catch (err) {
    console.error("Error reserving seat:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const cancel = async (req, res) => {
  try {
    const { seat } = req.body;
    const seatDoc = await Seat.findOne({ seat });

    if (!seatDoc) {
      return res.status(404).json({ error: 'Seat not found' });
    }

    if (seatDoc.availability === 'available') {
      return res.status(400).json({ error: 'Seat is already available' });
    }

    seatDoc.availability = 'available';
    await seatDoc.save();

    res.json({ message: `Seat ${seat} reservation canceled successfully` });
  } catch (err) {
    console.error("Error canceling seat reservation:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// export const deleteToDo = (req, res) => {
//   const { id } = req.params;

//   Seat.findByIdAndDelete(id)
//     .then(() => {
//       res.send("Deleted Successfully....");
//     })
//     .catch((err) => {
//       console.error("Error deleting ToDo:", err);
//       res.status(500).json({ error: err, msg: "Something went wrong!" });
//     });
// };
