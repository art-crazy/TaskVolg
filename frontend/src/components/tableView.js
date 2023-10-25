import React, {useEffect, useState} from 'react';
import {EuiInMemoryTable} from '@elastic/eui';
import {useHistory, useLocation} from "react-router-dom";

const TableView = ({userCards}) => {

    const history = useHistory();
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);

    // Значение параметра поиска используется как начальное значение searchText.
    let queryInURL = urlParams.get('search') || '';

    // searchText - состояние, которое хранит текущее значение поиска.
    const [searchText, setSearchText] = useState(queryInURL);

    // Каждый раз при изменении searchText, параметр search в URL обновляется.
    useEffect(() => {
        urlParams.set('search', searchText);
        history.push(location.pathname + '?' + urlParams.toString());
    }, [searchText]);

    // Столбцы для таблицы
    const columns = [
        {field: 'id', name: 'ID'},
        {field: 'postId', name: 'postId'},
        {field: 'name', name: 'Name'},
        {field: 'email', name: 'Email'},
        {field: 'body', name: 'Body'},
        {
            name: 'Actions',
            // Кнопка перехода на страницу с details.
            render: item => (
                <button onClick={() => history.push('/details/' + item.id)}>
                    View Details
                </button>
            )
        },
    ];

    // Генерация фильтра для таблицы.
    const allFilters = ['postId', 'id', 'name', 'email', 'body'].map((field) => ({
        type: 'field_value_selection',
        field: field,
        name: `${field.charAt(0).toUpperCase() + field.slice(1)} Filter`,
        multiSelect: 'or',
        options: [...new Set(userCards.map((item) => item[field]))].map((value) => {
            return {
                value: value,
                name: value,
                view: value,
            };
        }),
    }));

    // Фильтрация карточек пользователей на основе поискового текста.
    const filteredUserCards = userCards.filter(userCard =>
        Object.values(userCard).some(v =>
            v.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );

    // Функция, которая вызывается при изменении значения поля поиска, чтоды обновить значение в URL.
    const onSearchChange = (searchVal) => {
        setSearchText(searchVal.target.value);
    };

    // Настройки поля поиска и фильтра для таблицы.
    const search = {
        box: {
            incremental: true,
            schema: true,
            onChange: onSearchChange,
        },
        filters: allFilters,
    };

    return (
        <EuiInMemoryTable
            items={filteredUserCards}
            columns={columns}
            search={search}
            pagination={true}
        />
    );
};

export default TableView;