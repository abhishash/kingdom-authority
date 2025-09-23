"use client";

import fetchHandler from "@/utils/fetcher";
import { useMutation } from "@tanstack/react-query";
// import {Link, useParams} from "react-router-dom";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
// import axios from "axios";
// import ApiInfo from "../ApiInfo/ApiInfo";

const Verify = ({ token }: {  token: string }) => {

  const Images = [
    "https://i.pinimg.com/originals/84/22/0a/84220a2fc13e5f62e5f4da4ee1d15112.gif",
    "https://i.gifer.com/7efs.gif",
    "https://68.media.tumblr.com/3802e690377a90e63ed309d157247395/tumblr_olhi6orjbY1ql3nz5o1_1280.gif",
  ];

  const [Image, setImage] = useState(0);
  const [message, setmessage] = useState("Please Wait...");

  // ------ Query-----//
  const { mutateAsync } = useMutation({
    mutationFn: () =>
      fetchHandler({
        url: `/admin/verify/${token}`,
        method: "POST",
        queryKey: "/verify",
        body: {},
      }),
    onSuccess: (data) => {
      const { message, success } = data;
      if (success) {
        // toast.success(message);
      } else {
        // toast.warning(message);
      }
    },
    onError: (error) => {
      //   toast.error(error.message);
    },
  });
  // const {id} = useParams()
  // console.log(id)

  // async function VerifyData() {
  //     try {
  //         const res = await axios.post(ApiInfo + "/user/verify/" + id)
  //         console.log(res)
  //         setmessage(res.data.details)
  //         setImage(1)
  //     } catch (e) {
  //         setmessage("Failed")
  //         setImage(2)
  //     }
  // }

  useEffect(() => {
    mutateAsync();
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        zIndex: "1000000000000",
        width: "100vw",
        top: "0px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        height: "500px",
      }}
    >
      <img
        src={Images[Image]}
        style={{
          width: "300px",
        }}
      />
      <h1>{message}</h1>
      {Image === 1 && (
        <Link
          href={"/"}
          style={{
            color: "blue",
          }}
        >
          Login&gt;
        </Link>
      )}
    </div>
  );
};

export default Verify;
