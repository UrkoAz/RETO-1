<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/"> 

<html>
<head>
    <title>Vista del director</title>
    <link href="estilos.css" type="text/css" rel="stylesheet"/>
</head>
<body>
    <h1>Trabajadores</h1>
    <p>Lista de trabajadores</p>
    <table border="1">
            <tr>
                <th> id </th>
                <th> name </th>
                <th> trabajo </th>
                <th> mail </th>
                <th> departamento </th>
            </tr>
        <xsl:for-each select="HR_EMPLOYEE/HR_EMPLOYEE">
            <tr>
                <td><xsl:value-of select="id"/></td>
                <td><xsl:value-of select="name"/></td>
                <td><xsl:value-of select="trabajo"/></td>
                <td><xsl:value-of select="mail"/></td>
                <td><xsl:value-of select="departamento"/></td>
            </tr>
        </xsl:for-each>
    </table>
</body>
</html>
</xsl:template>
</xsl:stylesheet>