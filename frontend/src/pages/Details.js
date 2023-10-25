import {useHistory, useParams} from 'react-router-dom';
import JsonView from "../components/jsonView";
import React, {useEffect} from "react";
import {getData} from "../api";
import {connect} from "react-redux";
import {EuiButton} from '@elastic/eui';

const Details = (props) => {


    useEffect(() => {
        props.fetchUserCards();
    }, []);

    const history = useHistory();

    const goBack = () => {
        history.push('/');
    }

    const {id} = useParams();

    return (
        <div>
            {props.userCards &&
                <div>
                    <JsonView userCards={props.userCards.find(card => card.id === +id)}/>
                    <div className="details__back">
                        <EuiButton onClick={goBack}>Return</EuiButton>
                    </div>
                </div>
            }
        </div>
    );
}

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
(Details);