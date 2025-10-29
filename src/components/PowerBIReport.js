import React, { useEffect, useRef } from 'react';

const PowerBIReport = ({ reportId, embedUrl, accessToken }) => {
    const reportContainer = useRef(null);

    useEffect(() => {
        if (window.powerbi && reportContainer.current) {
            const models = window.powerbi.models;
            const config = {
                type: 'report',
                tokenType: models.TokenType.Embed,
                accessToken: accessToken,
                embedUrl: embedUrl,
                id: reportId,
                permissions: models.Permissions.All,
                settings: {
                    filterPaneEnabled: false,
                    navContentPaneEnabled: true
                }
            };
            
            const report = window.powerbi.embed(reportContainer.current, config);
            
            report.on('loaded', () => {
                console.log('Relatório carregado com sucesso');
            });
            
            report.on('error', (event) => {
                console.error('Erro no relatório:', event.detail);
            });
        }
    }, [reportId, embedUrl, accessToken]);

    return <div ref={reportContainer} style={{ width: '100%', height: '600px' }} />;
};

export default PowerBIReport;
