import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import Axios from 'axios';

const GameweekInput = (props) =>{
    const editPanelState = useSelector(x => x.editPanelState);
    const dispatch = useDispatch();
    const{register, handleSubmit} = useForm();
    const{gameweek} = props;
    const[gameweekNumber, setGameweekNumber] = useState();

    const editGameweek = () =>{
        setGameweekNumber(gameweek.gameweekNumber)
        dispatch({type:"EDIT_GAMEWEEK", payload:gameweek.gameweekId}, editPanelState)
    }

    const saveGameweek = () =>{
        Axios.put("/gameweek", {
            gameweekId:parseInt(gameweek.gameweekId), 
            gameweekNumber:parseInt(gameweekNumber)}, editPanelState).then(res =>{
            Axios.get(`/gameweek/${editPanelState.editedGameweeks}`).then(res =>{
                dispatch({type:"RESET_GAMEWEEKS", payload:res.data}, editPanelState)
            })
        })
    }

    const setFormValue = e =>{
        setGameweekNumber(e.target.value)
    }

    return(
        <div>
        {editPanelState.editedGameweek !== gameweek.gameweekId ?
        <div key={gameweek.gameweekId}>
            {gameweek.gameweekNumber}
            <button onClick={editGameweek}>edytuj</button>
        </div>:
        <div key={gameweek.gameweekId}>
            <form onSubmit={handleSubmit(saveGameweek)}>
                <input onChange={setFormValue} type="number" name="gameweekNumber" value={gameweekNumber} ref={register()}/>
                <button type="submit">zapisz</button>
            </form>
        </div>          
        }
        </div>
    )
}

export default GameweekInput;