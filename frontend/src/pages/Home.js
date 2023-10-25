import React, {useEffect, useState} from "react";
import {getData} from "../api";
import {EuiButtonGroup} from '@elastic/eui';
import JsonView from "../components/jsonView";
import TableView from "../components/tableView";
import {connect} from "react-redux";

const Home = (props) => {

    const [currentMode, setCurrentMode] = useState("json");

    useEffect(() => {
        props.fetchUserCards();
    }, []);

    const modeButtons = [
        {
            id: 'json',
            label: 'JSON',
        },
        {
            id: 'table',
            label: 'Table',
        },
    ];

    return (
        <div>

            <EuiButtonGroup
                legend="This is a basic group"
                options={modeButtons}
                idSelected={currentMode}
                onChange={(id) => setCurrentMode(id)}
            />

            {props.userCards &&
                <div>
                    {currentMode === 'json'
                        ? <JsonView userCards={props.userCards}/>
                        : <TableView userCards={props.userCards}/>
                    }
                </div>
            }
        </div>
    );
};

const mapStateToProps = state => ({
    userCards: state.userCards,
});

const mapDispatchToProps = dispatch => ({
    fetchUserCards: () => {
        dispatch(getData())
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(Home);