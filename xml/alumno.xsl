<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/"> 

<html>
<head>
    <title>Vista del alumno</title>
    <link href="estilos.css" type="text/css" rel="stylesheet"/>
</head>
<body>
    <h1>Profesores</h1>
    <p>Lista de profesores</p>
    <table border="1">
            <tr>
                <th> Nombre </th>
                <th> Correo </th>
            </tr>
        <xsl:for-each select="hr_employee/hr_employee">
            <tr>
                <td><xsl:value-of select="name"/></td>
                <td><xsl:value-of select="mail"/></td>
            </tr>
        </xsl:for-each>
    </table>
</body>
</html>
</xsl:template>
</xsl:stylesheet>