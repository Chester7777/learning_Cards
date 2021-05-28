import React from "react";
import s from './Packs.module.css'
import {Button} from "../../common/Button/Button";
import {SearchPack} from "../searchPack/SearchPack";
import {Paginator} from "../searchPack/Paginator";


const Packs = () => {


        return (
            <div>
                    <div>
                        <input

                            placeholder={'Enter name to new pack'}

                            className={s.inputTitlePack}/>
                        <Button label={'Save'}/></div>
                <SearchPack/>
                <table className={s.table}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Cards count</th>
                        <th>Created</th>
                        <th>Lest update</th>
                        <th><Button label={'Add Pack'}/></th>
                    </tr>
                    </thead>
                </table>
                <Paginator/>
            </div>
        );
}


export default Packs;




















