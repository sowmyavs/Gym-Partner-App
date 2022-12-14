import * as React from "react";
import { Paper, Chip, Typography } from "@mui/material"
// cr: look into changing color of arrows
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

export default function UserCard({name, experience, gym, exercise, bio, images}) {
    const [img, setImg] = React.useState(0);

    const fwdImgHandler = () => {
        setImg(img + 1);
        if (img + 1 === images.length) setImg(0);
        console.log("image change");
    }

    const reverseImgHandler = () => {
        setImg(img - 1);
        if (img - 1 === -1) setImg(images.length - 1);
        console.log("image change")
    }
    // cr: distinctify elements or change background color
    // cr: change div style to flex, align items center for image
    return (
        <Paper elevation={4} sx={{height: 500, width: 413, mb: 2}}>
            <div style={{overflow: "hidden", height: 300, margin: 10, borderRadius: 10}}>
                <img alt="profile pic" src={images[img]} style={{width: 395, height: 300, objectFit: "cover"}}/>
            </div>
            <div style={{paddingLeft: 10, paddingRight: 10}}>
                <ArrowCircleLeftOutlinedIcon role="button" onClick={reverseImgHandler}/>
                <ArrowCircleRightOutlinedIcon role="button" onClick={fwdImgHandler}/>
                <Typography variant="h6" sx={{pl: 1}}>{name}</Typography>
                <Chip size="small" label={"Experience: " + experience} sx={{mr: 1, mb: "3px"}}/>
                <Chip size="small" label={gym} sx={{mr: 1, mb: "3px"}}/>
                {(exercise).map(item => <Chip size="small" key={item} label={item} sx={{mr: 1, mb: "3px"}}/>)}
                <br/>
                <Typography variant="caption">{bio}</Typography>
            </div>
        </Paper>
    )
}