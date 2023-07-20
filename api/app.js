const express = require("express");
const collection = require("./mongo");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const crypto = require("crypto");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require("path");

const AdminLogin = require("./Admin");
const Addproduct = require("./Product");
const AddDealer = require("./Dealers");
const Model = require("./Modal");
// import jwt from "jsonwebtoken";
// import session from "express-session";
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const session = require("express-session");

// const bcrypt=require('bcrypt')

// const proxy = httpProxy.createProxyMiddleware({
//   target: "http://localhost:3001",
//   changeOrigin: true,
//   cookieDomainRewrite: {
//     "localhost:3001": "localhost:3000",
//   },
// });

//S3 Bucket

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  region: "ap-south-1",
});
const bucketName = process.env.BUCKET_NAME;

const storage = multer.memoryStorage({
  bucket: process.env.BUCKET_NAME,
  Key: function (req, file, cb) {
    cb(null, "AssetWarranty/" + file.originalname); // use AssetWarranty folder + original filename as the key
  },
});
const upload = multer({ storage: storage }).array("warrantyFile");

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(
  session({
    secret: "secret@123",

    resave: true,
    saveUninitialized: false,
  })
);
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
// app.use(cors({ origin: ["*"], credentials: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Credentials", true);

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  res.header(
    "Access-Control-Allow-Methods",

    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  next();
});

app.use((req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.manu_sessionId;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, "secret@123");
      req.manufacturerEmail = decodedToken.email;
    } catch (error) {
      console.error(error);
    }
  }

  next();
});

app.get("/", cors(), (req, res) => {});

app.get("/", (req, res) => {
  res.send("hi");
});

//File Upload
app.post("/upload", upload, async (req, res) => {
  try {
    const file = req.files[0]; // assuming you are uploading only one file
    const fileName = file.originalname;
    const contentType = file.mimetype;
    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Prefix: "AssetWarranty/",
      Key: "AssetWarranty/" + fileName,
      Body: file.buffer,
      ContentType: contentType,
    });

    const uploadResponse = await client.send(putCommand);
    if (uploadResponse.$metadata.httpStatusCode !== 200) {
      return res.status(500).json({ success: false, message: "Upload failed" });
    }

    const fileContents = file.buffer;
    const hash = crypto.createHash("sha256").update(fileContents).digest("hex");

    res.send({
      fileName: fileName,
      fileHash: hash,
      message: "Upload successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

app.post("/warranty/:id", async (req, res) => {
  try {
    const model = await Model.findById(req.params.id);
    if (!model) {
      res.status(404).send("Model not found");
      return;
    }

    const hash = model.warranty;
    // console.log(hash);
    const fileName = hash.substring(65);
    // console.log(fileName);
    const params = {
      Bucket: bucketName,
      Prefix: "AssetWarranty/",
    };

    const data = await client.send(new ListObjectsCommand(params));
    // console.log(data);
    const matchingObject = data.Contents.find((object) => {
      const objectKey = object.Key;
      const objectFileName = objectKey.substring(
        objectKey.lastIndexOf("/") + 1
      );
      return objectFileName === fileName;
    });

    if (!matchingObject) {
      res.status(404).send("Warranty not found");
      return;
    }
    // console.log(matchingObject);
    // Fetch the file buffer from S3
    const objectParams = {
      Bucket: bucketName,
      Key: matchingObject.Key,
    };
    const url = await getSignedUrl(client, new GetObjectCommand(objectParams), {
      expiresIn: 3600,
    });
    // console.log(url);
    res.set("Content-Type", "application/pdf");
    // res.set("Content-Disposition", "inline");
    // Send the file buffer as the response body
    res.send(url);
  } catch (error) {
    res.send(error.toString());
  }
});

app.post("/warrantyView/:warranty", async (req, res) => {
  try {
    const hash = req.params.warranty;
    const fileName = hash.substring(65);
    const fileHash = hash.substring(0, 64);
    console.log(fileHash);
    console.log(fileName);

    const params = {
      Bucket: bucketName,
      Prefix: "AssetWarranty/",
    };
    const data = await client.send(new ListObjectsCommand(params));
    // console.log(data);

    const matchingObject = data.Contents.find((object) => {
      const objectKey = object.Key;
      const objectFileName = objectKey.substring(
        objectKey.lastIndexOf("/") + 1
      );
      return objectFileName === fileName;
    });
    // console.log("matchingobject", matchingObject);

    if (!matchingObject) {
      res.status(404).send("Warranty not found");
      return;
    }

    const warrantyParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: matchingObject.Key,
    };

    const fileContents = await client.send(
      new GetObjectCommand(warrantyParams)
    );
    const fileContentsBuffer = await new Promise((resolve, reject) => {
      const chunks = [];
      fileContents.Body.on("data", (chunk) => {
        chunks.push(chunk);
      });
      fileContents.Body.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
      fileContents.Body.on("error", reject);
    });

    const secondHash = crypto
      .createHash("sha256")
      .update(fileContentsBuffer)
      .digest("hex");

    // console.log(secondHash);

    if (secondHash === fileHash) {
      const url = await getSignedUrl(
        client,
        new GetObjectCommand(warrantyParams),
        { expiresIn: 3600 }
      );

      // console.log(url);

      res.set("Content-Type", "application/pdf");

      res.send(url);
    } else {
      res.status(403).send("File has been changed!!!!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

// file

// admin process start

app.post("/admin", async (req, res) => {
  const { name, email, password, address } = req.body;
  const newManufacturer = new collection({
    name,
    email,
    password,
    address,
  });
  try {
    await newManufacturer.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.DMAIL,

        pass: process.env.DPASS,
      },
    });

    const mailOptions = {
      from: "assetwarratyweb3@gmail.com",

      to: email,

      subject: "Your Asset warranty password",

      text: `Your Login password is
      Wallet Address: ${address}
      Password: ${password}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.json({ status: 200, message: "success" });
  } catch (e) {
    console.error(e);
    res.status(500).json("Failed to add product");
  }
});

app.get("/admin", (req, res) => {
  collection.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/AdminLogin", async (req, res) => {
  const { adminWallet, adminPassword } = req.body;
  try {
    const check = await AdminLogin.findOne({
      adminWallet: adminWallet,
      adminPassword: adminPassword,
    });
    if (check) {
      const token = jwt.sign(
        {
          adminName: check.adminName,
          adminWallet: check.adminWallet,
        },
        "secret@123"
      );
      res.setHeader("Set-Cookie", `admin_sessionId=${token}`);

      res.cookie("admin_sessionId", token, {
        expires: new Date(Date.now() + 600000),
        httponly: false,
        maxAge: 24 * 60 * 60 * 365,
      });

      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("notexist");
  }
});

//admin process end

//login start

app.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const check = await collection.findOne({
      email: email,
      password: password,
    });
    if (check) {
      const token = jwt.sign(
        {
          email: check.email,
          name: name, // adding name to the JWT token
        },
        "secret@123"
      );
      res.setHeader("Set-Cookie", `manu_sessionId=${token}`);

      res.cookie("manu_sessionId", token, {
        expires: new Date(Date.now() + 600000),
        httponly: false,
        maxAge: 24 * 60 * 60 * 365,
      });

      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("notexist");
  }
});

app.post("/Loginpage", async (req, res) => {
  const { demail, dpassword } = req.body;

  try {
    const check = await AddDealer.findOne({
      demail: demail,
      dpassword: dpassword,
      status: true, // add this check for the dealer's status
    });
    if (check) {
      const token = jwt.sign(
        {
          demail: check.demail,
          name: check.name,
          branch: check.branch,
          location: check.location,
          phone: check.phone,
          waddress: check.waddress,
        },
        "secret@123"
      );
      res.setHeader("Set-Cookie", `deal_sessionId=${token}`);

      res.cookie("deal_sessionId", token, {
        httponly: true,

        maxAge: 24 * 60 * 60 * 365,
      });
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("notexist");
  }
});
app.use(cookieParser());

// products code backend
app.post("/ManufactureLand/Product/Addproduct", async (req, res) => {
  const { productName, productDes } = req.body;

  const token = req.cookies.manu_sessionId;

  try {
    if (!token) {
      throw new Error("Token is missing");
    }

    const decodedToken = jwt.verify(token, "secret@123");
    const manufacturerEmail = decodedToken.email;

    const manufacturer = await collection.findOne({ email: manufacturerEmail });

    const newProduct = new Addproduct({
      productName,
      productDes,
      Manufacture: manufacturer._id,
    });

    await newProduct.save();
    res.json({ status: 200, message: "success" });
  } catch (e) {
    console.error(e);
    res.status(500).json("Failed to add product");
  }
});

app.get("/add", (req, res) => {
  Addproduct.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/editproduct", (req, res) => {
  const token = req.cookies.manu_sessionId;

  try {
    if (!token) {
      throw new Error("Token is missing");
    }

    const decodedToken = jwt.verify(token, "secret@123");
    const manufacturerEmail = decodedToken.email;

    collection.findOne({ email: manufacturerEmail }, (err, manufacturer) => {
      if (err) {
        console.error(err);
        res.status(500).json("Failed to get products");
      } else {
        Addproduct.find({ Manufacture: manufacturer._id }, (err, products) => {
          if (err) {
            console.error(err);
            res.status(500).json("Failed to get products");
          } else {
            res.json({ status: 200, data: products });
          }
        });
      }
    });
  } catch (e) {
    console.error(e);
    res.status(500).json("Failed to get products");
  }
});

app.put("/editProduct/:id", async (req, res) => {
  const { productName, productDes, status } = req.body;
  const productId = req.params.id;

  try {
    const updatedProduct = await Addproduct.findByIdAndUpdate(
      productId,
      {
        productName,
        productDes,
        status,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      // .status(200)
      .json({ status: 200, message: "Product updated successfully" });
  } catch (e) {
    // console.error(e);
    res.status(500).json("Failed to update product");
  }
});
//end of products

// dealers code backend

app.post("/AddDealer", async (req, res) => {
  const { name, demail, branch, dpassword, phone, location, waddress } =
    req.body;
  const token = req.cookies.manu_sessionId;
  try {
    if (!token) {
      throw new Error("Token is missing");
    }

    const decodedToken = jwt.verify(token, "secret@123");
    const manufacturerEmail = decodedToken.email;

    const manufacturer = await collection.findOne({ email: manufacturerEmail });

    const newDealer = new AddDealer({
      name,
      demail,
      branch,
      dpassword,
      phone,
      location,
      waddress,
      Manufacture: manufacturer._id,
    });
    await newDealer.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.DMAIL,

        pass: process.env.DPASS,
      },
    });

    const mailOptions = {
      from: "assetwarratyweb3@gmail.com",

      to: demail,

      subject: "Your Asset warranty password",

      text: `Your Login password is
      Email: ${demail}
      Password: ${dpassword}
      Wallet Address: ${waddress}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.json({ status: 200, message: "success" });
  } catch (e) {
    console.error(e);
    res.status(500).json("Failed to add product");
  }
});

app.get("/dealers", async (req, res) => {
  try {
    const token = req.cookies.manu_sessionId;
    if (!token) {
      throw new Error("Token is missing");
    }
    const decodedToken = jwt.verify(token, "secret@123");
    const manufacturerEmail = decodedToken.email;
    // console.log(manufacturerEmail);
    const manufacturer = await collection.findOne({ email: manufacturerEmail });
    if (!manufacturer) {
      throw new Error("Manufacturer not found");
    }
    const dealers = await AddDealer.find({ Manufacture: manufacturer._id });
    if (!dealers) {
      throw new Error("No dealers found for the manufacturer");
    }
    res.json(dealers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.put("/dealers/:id", async (req, res) => {
  const { name, branch, status } = req.body;
  const dealerId = req.params.id;

  try {
    const updatedDealer = await AddDealer.findByIdAndUpdate(
      dealerId,
      {
        name,
        branch,
        status,
      },
      { new: true }
    );

    if (!updatedDealer) {
      return res.status(404).json({ message: "Dealer not found" });
    }

    res
      .status(200)
      .json({ status: 200, message: "Dealer updated successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to update Dealer" });
  }
});

//end of dealers

//modal starting
app.patch("/AddModal/:productName", async (req, res) => {
  const { productName } = req.params;
  const { modelName, modelDes, warranty } = req.body;

  // try {
  const product = await Addproduct.findOne({ productName });

  if (!product) {
    return res.status(400).json({ message: "Product not found" });
  }

  const model = new Model({
    modelName,
    modelDes,
    warranty,
    product: product._id,
  });
  // console.log(model);
  try {
    await model.save();
    res.json({ status: 200, message: "success" });
  } catch (e) {
    // console.error(e);
    res.status(500).json("Failed to add model");
  }
});

app.get("/ModalPage", async (req, res) => {
  try {
    const token = req.cookies.manu_sessionId;
    if (!token) {
      throw new Error("Token is missing");
    }
    const decodedToken = jwt.verify(token, "secret@123");
    const manufacturerEmail = decodedToken.email;
    const manufacturer = await collection.findOne({ email: manufacturerEmail });
    if (!manufacturer) {
      throw new Error("Manufacturer not found");
    }
    const products = await Addproduct.find({ Manufacture: manufacturer._id });
    if (!products) {
      throw new Error("No products found for the manufacturer");
    }
    const models = await Model.find({
      product: { $in: products.map((p) => p._id) },
    }).populate("product", "productName");
    res.json(models);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.get("/AddModal", (req, res) => {
  const token = req.cookies.manu_sessionId;
  if (!token) {
    return res.status(400).send("Token is missing");
  }
  const decodedToken = jwt.verify(token, "secret@123");
  const manufacturerEmail = decodedToken.email;
  collection.findOne({ email: manufacturerEmail }, (err, manufacturer) => {
    if (err) {
      return res.status(500).send("Server Error");
    }
    if (!manufacturer) {
      return res.status(404).send("Manufacturer not found");
    }
    Addproduct.find({ Manufacture: manufacturer._id }, (err, products) => {
      if (err) {
        return res.status(500).send("Server Error");
      }
      if (!products) {
        return res.status(404).send("No products found for the manufacturer");
      }
      res.json(products);
    });
  });
});

app.put("/editModal/:id", async (req, res) => {
  const { modelName, modelDes, status } = req.body;
  const modalId = req.params.id;

  try {
    const updatedProduct = await Model.findByIdAndUpdate(
      modalId,
      {
        modelName,
        modelDes,
        status,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Modal not found" });
    }

    res
      .status(200)
      .json({ status: 200, message: "Modal updated successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to update Modal" });
  }
});
// modal end

//stock

app.get("/viewstock", async (req, res) => {
  try {
    const token = req.cookies.manu_sessionId;
    if (!token) {
      throw new Error("Token is missing");
    }
    const decodedToken = jwt.verify(token, "secret@123");
    const manufacturerEmail = decodedToken.email;
    const manufacturer = await collection.findOne({ email: manufacturerEmail });
    if (!manufacturer) {
      throw new Error("Manufacturer not found");
    }
    const products = await Addproduct.find({ Manufacture: manufacturer._id });
    if (!products) {
      throw new Error("No products found for the manufacturer");
    }
    const { productId } = req.query;
    const models = await Model.find({ product: productId });
    if (!models) {
      throw new Error("No models found for the product");
    }
    const dealers = await AddDealer.find({ Manufacture: manufacturer._id });
    if (!dealers) {
      throw new Error("No dealers found for the manufacturer");
    }
    res.status(200).json({ products, models, dealers });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//customer end

app.get("/send", (req, res) => {
  const dealerPromise = AddDealer.find().exec();
  Promise.all([dealerPromise])
    .then((results) => {
      const [dealers] = results;
      res.status(200).send({ dealers });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.listen(5000, () => {
  console.log("port connected");
});
