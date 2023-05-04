<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/"> 

<html>
<head>
    <title>Vista del técnico</title>
    <link href="estilos.css" type="text/css" rel="stylesheet"/>
</head>
<body>
    <h1>Tickets</h1>
    <p>Lista de tickets</p>
    <table border="1">
            <tr>
                <th> Número de Incidencia </th>
                <th> Nombre </th>
                <th> Correo </th>
                <th> Prioridad </th>
                <th> Descripción </th>
            </tr>
        <xsl:for-each select="helpdesk_ticket/helpdesk_ticket">
            <tr>
                <td><xsl:value-of select="nIncidencia"/></td>
                <td><xsl:value-of select="name"/></td>
                <td><xsl:value-of select="mailAyuda"/></td>
                <td><xsl:value-of select="prioridad"/></td>
                <td><xsl:value-of select="description"/></td>
            </tr>
        </xsl:for-each>
    </table>
</body>
</html>
</xsl:template>
</xsl:stylesheet>