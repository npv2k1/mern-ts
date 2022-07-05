import { Express, Request, Response } from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
export default function initUpload(app: Express) {

  const dir = path.join(__dirname, "/upload")  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      let re = /\.[0-9a-zA-z]+$/;
      cb(
        null,
        file.fieldname + "-" + Date.now() + re.exec(file.originalname)[0]
      );
    },
  });
  var upload = multer({ storage: storage });
  app.post(
    "/file",
    upload.single("files"),
    (req: Request, res: Response, next) => {
      console.log(req.file);
      res.send("file saved on server");
    }
  );
  app.get("/file",(req: Request, res: Response) => {
    res.sendFile(path.join(dir, "files-1656323432538.jpg"));
  })
}
