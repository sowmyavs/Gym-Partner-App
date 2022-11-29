import * as React from "react";
import { Paper, Chip, Typography } from "@mui/material"

export default function UserCard({name, experience, gym, exercise, bio, images}) {
    const [img, setImg] = React.useState(0);

    const imgHandler = () => {
        setImg(img + 1);
        if (img + 1 === images.length) setImg(0);
        console.log("image change");
    }
    
    return (
        <Paper elevation={4} sx={{height: 470, width: 360, mb: 2}}>
            <div style={{overflow: "hidden", height: 300, margin: 10, borderRadius: 10}}>
                <img alt="profile pic" src={images[img]} style={{width: 340}} role="button" onClick={imgHandler}/>
            </div>
            <div style={{paddingLeft: 10, paddingRight: 10}}>
                <Typography variant="h6" sx={{pl: 1}}>{name}</Typography>
                <Chip size="small" label={"Experience: " + experience} sx={{mr: 1, mb: "3px"}}/>
                <Chip size="small" label={gym} sx={{mr: 1, mb: "3px"}}/>
                {(exercise).map(item => <Chip size="small" key={item} label={item} sx={{mr: 1, mb: "3px"}}/>)}
                <br/>
                <Typography variant="caption" sx={{pl: 2}}>{bio}</Typography>
            </div>
        </Paper>
    )
}