import React from "react";
import s from './Cards.module.css'
import {Button} from "../../common/Button/Button";
import {SearchPack} from "../searchPack/SearchPack";


const Cards = () => {


        return (
            <div>

                    <div>
                        <input
                            placeholder={'Enter question'}
                            className={s.inputQuestion}/>
                            <input
                            placeholder={'Enter answer'}
                            className={s.inputAnswer}/>
                        <Button
                            label={'Save'}/>
                </div>

                <SearchPack />
                <table className={s.table}>
                    <thead>
                    <tr>
                        <th>Answer</th>
                        <th>Question</th>
                        <th>Grade</th>
                        <th>Shots</th>
                        <th><Button
                            label={'Add Pack'}/>
                        </th>
                    </tr>
                    </thead>
                </table>

            </div>
        );
}


export default Cards;