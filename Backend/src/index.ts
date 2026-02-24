import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { contentModel, UserModel } from "./db";
import { z } from "zod";
import * as bcrypt from "bcrypt";
import { Auth } from "./Authenticate";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

app.post("/api/v1/signup", async (req, res) => {
  const check_correct_format = z.object({
    username: z.string(),
    password: z.string().min(3, "password must be greater than 3"),
  });

  const checking = check_correct_format.safeParse(req.body);
  console.log("checking is ", checking);

  if (!checking.success) {
    return res.status(411).json({
      msg: "Enter correct format ",
      err: checking.error,
    });
  }

  try {
    const hashpass = await bcrypt.hash(checking.data.password, 10);
    console.log("hash pass is ", hashpass);

    const user = await UserModel.create({
      ...checking.data,
      password: hashpass,
    });
    console.log(user);

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      },
    );

    res.status(201).json({
      msg: "User created successfully",
      token,
    });
  } catch (err) {
    console.log("Error in creating user ", err);
    return res.status(501).json({
      msg: "Error in creating user",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const check_user_data = z.object({
    username: z.string(),
    password: z.string().min(3, "password must be greater than 3"),
  });

  const checking = check_user_data.safeParse(req.body);
  console.log("checking is ", checking);

  if (!checking.success) {
    return res.status(411).json({
      msg: "Enter correct format ",
      err: checking.error,
    });
  }

  try {
    const hashpass = await UserModel.findOne({
      username: checking.data.username,
    }).select("password");

    console.log("hashpass is ", hashpass);
    if (hashpass == null || hashpass.password == null) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    const check_pass_correct = await bcrypt.compare(
      checking.data.password,
      hashpass.password,
    );
    console.log("check pass correct is ", check_pass_correct);

    if (!check_pass_correct) {
      return res.status(401).json({
        msg: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: hashpass?._id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      msg: "User signed in successfully",
      token,
    });
  } catch (err) {
    console.log("Error in signin ", err);
    return res.status(501).json({
      msg: "Error in signin",
      err,
    });
  }
});

app.post("/api/v1/content", Auth, async (req, res) => {
  const check_content = z.object({
    title: z.string().min(2, "title is too short"),
    link: z.string().url("Invalid link "),
    tags: z
      .array(z.string())
      .min(1, "atleast 1 tag is required")
      .optional()
      .default([]),
  });

  const check = check_content.safeParse(req.body);
  if (!check.success) {
    return res.status(411).json({
      msg: "enter content correctly",
      err: check.error,
    });
  }

  const create_content = await contentModel.create({
    ...check.data,
    //@ts-ignore
    userid: req.userid,
  });
  res.status(201).json({
    msg: "Content created successfully",
  });
});

app.get("/api/v1/content", Auth, async (req, res) => {
  try {
    const contents = await contentModel
      .find({
        //  @ts-ignore
        userid: req.userid,
      })
      .populate("userid", "username ");
    console.log("contents are ", contents);

    res.json({
      msg: "retreived content succesfully ",
      contents,
    });
  } catch (e) {
    res.status(501).json({
      msg: "fialed to get messages ",
      err: e,
    });
  }
});

app.delete("/api/v1/content", Auth, async (req, res) => {
  const content = req.body.contentid;

  try {
    const deleteContent = await contentModel.findOneAndDelete({
      _id: content,
      //@ts-ignore
      userid: req.userid,
    });

    if (!deleteContent) {
      return res.status(404).json({
        msg: "content not found",
      });
    }
    res.json({
      msg: "content deleted successfully",
      deleteContent,
    });
  } catch (e) {
    return res.status(501).json({
      msg: "failed to delete content",
      err: e,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
