import React from 'react';
import MonacoEditor from 'react-monaco-editor';

const JsonView = ({userCards}) => {

    const code = JSON.stringify(userCards, null, 2);

    return (
        <MonacoEditor
            width="100%"
            height="100vh"
            language="json"
            theme="vs-dark"
            value={code}
            options={{
                selectOnLineNumbers: true,
                readOnly: true,
                minimap: {enabled: false},
                automaticLayout: true
            }}
        />
    );
}

export default JsonView;