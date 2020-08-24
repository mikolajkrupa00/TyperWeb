import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import Axios from 'axios';

const GameweekInput = (props) =>{
    const adminSeasonsState = useSelector(x => x.adminSeasonsState);
    const dispatch = useDispatch();
    const{register, handleSubmit} = useForm();
    const{gameweek} = props;
    const[gameweekNumber, setGameweekNumber] = useState();

    const editGameweek = () =>{
        setGameweekNumber(gameweek.gameweekNumber)
        dispatch({type:"EDIT_GAMEWEEK", payload:gameweek.gameweekId}, adminSeasonsState)
    }

    const saveGameweek = () =>{
        Axios.put("/gameweek", {
            gameweekId:parseInt(gameweek.gameweekId), 
            gameweekNumber:parseInt(gameweekNumber)}, adminSeasonsState).then(res =>{
            Axios.get(`/gameweek/${adminSeasonsState.editedGameweeks}`).then(res =>{
                dispatch({type:"RESET_GAMEWEEKS", payload:res.data}, adminSeasonsState)
            })
        })
    }

    const setFormValue = e =>{
        setGameweekNumber(e.target.value)
    }

    return(
        <div>
        {adminSeasonsState.editedGameweek !== gameweek.gameweekId ?
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