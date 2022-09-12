import React from "react";

function Die(props) {

    const style = {
        backgroundColor:props.isheld ? "#59E391" : "white"
    }



    return(
            <div 
                className="die-face"
                style={style}
                onClick={props.holdDice}
            >
                <h2 className="die-value">{props.value}</h2>
            </div>

    )


}

export default Die;


