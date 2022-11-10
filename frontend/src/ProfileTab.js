import * as React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';


export default function ProfileTab() {
  const navigate = useNavigate();
  const [images, setImages] =useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  useEffect(()=> {
    if (images.length<1) return;
    const newImageUrls =[]; 
    images.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls) 
    console.log('Images:',setImageURLs);
  })

  function onImageChange(e){
    setImages([...e.target.files]);
  }

  async function onImageChange1(e){
    let file= e.target.files[0];
    let blob = file.slice(0, file.size,"image/jpg");
    let newFile=new File([blob], "1.jpg",{type:"image/jpg"});
    console.log("test:",newFile);
    let formData = new FormData();
    formData.append("imgfile", newFile);
    await fetch(`/image/${localStorage.getItem("id")}`,{
        method: "POST",
        body: newFile,
    })   
  }


  return (
    <div>
    <Button onClick={() => navigate("/survey")} variant="contained">
      Edit Profile
    </Button>
    <input type="file"  accept="image/*" onChange={onImageChange1} />
    {/* { imageURLs.map(imageSrc => <img src={imageSrc}/>) } */} 
   </div>
  );
}


