import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "harsh@Abi14#",
  database: "deliverydetails",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("this the backend");
});

app.get("/users", (req, res) => {
  const q = "SELECT * FROM user";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/pickup", (req, res) => {
  const q = "SELECT * FROM pickup";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/delivery", (req, res) => {
  const q = "SELECT * FROM delivery";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/delivery", (req, res) => {
  const q =
    "INSERT INTO delivery (`name`,`phone_no`,`email`,`address`,`pincode`) VALUES (?)";

  const values = [
    req.body.name,
    req.body.phone,
    req.body.email,
    req.body.address,
    req.body.pincode,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("delivery data");
  });
});

app.post("/pickup", (req, res) => {
  const q =
    "INSERT INTO pickup (`name`,`phone_no`,`email`,`pincode`,`pickuplocation`,`preferred_time`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.phone,
    req.body.email,
    req.body.pincode,
    req.body.pickUpLocation,
    req.body.preferredTime,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("send data");
  });
});

app.post("/check-email", (req, res) => {
  const { email } = req.body;
  console.log("Received email:", email);
  db.query(
    "SELECT * FROM user WHERE email_address = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, message: "An error occurred" });
      }

      console.log("Query results:", results);

      if (results.length === 0) {
        res.json({
          success: false,
          message: "Email not found in the database",
        });
      } else {
        res.json({ success: true, message: "Email found in the database" });
      }
    }
  );
});

app.post("/check-phone", (req, res) => {
  const { phone } = req.body;
  console.log("Received phone:", phone);
  db.query("SELECT * FROM user WHERE phone_no = ?", [phone], (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "An error occurred" });
    }

    console.log("Query results:", results);

    if (results.length === 0) {
      res.json({
        success: false,
        message: "phone not found in the database",
      });
    } else {
      res.json({ success: true, message: "phone found in the database" });
    }
  });
});

app.post("/check-pincode", (req, res) => {
  const { pincode } = req.body;
  console.log("Received pincode:", pincode);
  db.query(
    "SELECT * FROM user WHERE pincode = ?",
    [pincode],
    (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, message: "An error occurred" });
      }

      console.log("Query results:", results);

      if (results.length === 0) {
        res.json({
          success: false,
          message: "pincode not found in the database",
        });
      } else {
        res.json({ success: true, message: "pincode found in the database" });
      }
    }
  );
});

//  Delete

app.delete("/delete/:email", (req, res) => {
  const email = req.params.email;
  const q = "DELETE FROM user WHERE email_address = ?";

  db.query(q, [email], (err, data) => {
    if (err) return res.json(err);

    return res.json("User Deleted successfully");
  });
});

// Put

app.put("/delete/:id", (req, res) => {
  const id = req.params.id;
  const q =
    "UPDATE user SET `phone_no` = ?, `pincode`=?, `email_address`=? WHERE id =?";

  const values = [req.body.phone, req.body.pincode, req.body.email];

  db.query(q, [...values, id], (err, data) => {
    if (err) return res.json(err);

    return res.json("User Updated successfully");
  });
});

app.listen(8800, () => {
  console.log("App is listening on port 8800");
});
