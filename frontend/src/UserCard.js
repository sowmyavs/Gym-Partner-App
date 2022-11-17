import * as React from "react";
import { Button, Paper, Chip, Typography } from "@mui/material"
import { Spacing } from "@mui/system";

export default function UserCard({name, gender, age, bio, image, gym, exercise, experience}) {
    return (
        <Paper elevation={4} sx={{height: 470, width: 360, mb: 2}}>
            <div style={{overflow: "hidden", height: 300, margin: 10, borderRadius: 10}}>
                {/* <img src={image} style={{width: 340}}/> */}
            </div>
            <div style={{paddingLeft: 10, paddingRight: 10}}>
                <Typography variant="h6" sx={{pl: 1}}>{name} - {gender} {age}</Typography>
                <Chip size="small" label={"Experience: " + experience} sx={{mr: 1, mb: "3px"}}/>
                <Chip size="small" label={gym} sx={{mr: 1, mb: "3px"}}/>
                {exercise.map(item => <Chip size="small" label={item} sx={{mr: 1, mb: "3px"}}/>)}
                <br/>
                <Typography variant="caption" sx={{pl: 2}}>{bio}</Typography>
            </div>
        </Paper>
    )
}