import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Stack, IconButton, Paper } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit'
import SettingsIcon from '@mui/icons-material/Settings'
import UserCard from "./UserCard";

export default function ProfileTab() {
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = React.useState(null);

  // TODO: get this to stop infinite looping lmao
  React.useEffect(() => {
    const fetchUser = async () => {
      let response = await fetch("/user/" + localStorage.getItem("id"));
      const user = await response.json();
      setUserProfile(user);
      console.log(user);
    }
    fetchUser();
  }, [])

  return (
    <Stack sx={{ m: "auto" }}>
      {userProfile != null &&
        <UserCard
        name={userProfile.name}
        experience={userProfile.experience_level}
        gym={userProfile.favorite_gym}
        exercise={userProfile.desired_exercise}
        bio={userProfile.bio}
        images={userProfile.images}
        />
      }
      {userProfile == null &&
        <Paper elevation={4} sx={{height: 500, width: 413, mb: 2}}/>
      }
      <Stack direction="row" spacing={10} sx={{m: "auto"}}>
        <IconButton onClick={() => navigate("/editProfile")}><EditIcon fontSize="large"/></IconButton>
        <IconButton onClick={() => navigate("/settings")}><SettingsIcon fontSize="large"/></IconButton>
      </Stack>
    </Stack>
  );
}
// import {useState, useEffect} from 'react';


// export default function ProfileTab() {
//   const navigate = useNavigate();
//   const [images, setImages] =useState([]);
//   const [imageURLs, setImageURLs] = useState([]);
//   useEffect(()=> {
//     if (images.length<1) return;
//     const newImageUrls =[]; 
//     images.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
//     setImageURLs(newImageUrls) 
//     console.log('Images:',setImageURLs);
//   })

//   function onImageChange(e){
//     setImages([...e.target.files]);
//   }

//   async function onImageChange1(e){
//     let file= e.target.files[0];
//     let blob = file.slice(0, file.size,"image/jpg");
//     let newFile=new File([blob], "1.jpg",{type:"image/jpg"});
//     console.log("test:",newFile);
//     let formData = new FormData();
//     formData.append("imgfile", newFile);
//     await fetch(`/image/${localStorage.getItem("id")}`,{
//         method: "POST",
//         body: newFile,
//     })   
//   }


//   return (
//     <div>
//     <Button onClick={() => navigate("/survey")} variant="contained">
//       Edit Profile
//     </Button>
//     <input type="file"  accept="image/*" onChange={onImageChange1} />
//     {/* { imageURLs.map(imageSrc => <img src={imageSrc}/>) } */} 
//    </div>
//   );
// }


