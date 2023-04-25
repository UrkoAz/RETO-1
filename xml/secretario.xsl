<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/"> 

<html>
<head>
    <title>Vista del secretario</title>
    <link href="estilos.css" type="text/css" rel="stylesheet"/>
</head>
<body>
    <h1>Clientes</h1>
    <p>Lista de clientes</p>
    <table border="1">
            <tr>
                <th> id </th>
                <th> Nombre </th>
                <th> Correo </th>
                <th> Calle </th>
                <th> CP </th>
            </tr>
        <xsl:for-each select="res_partner/res_partner">
            <tr>
                <td><xsl:value-of select="id"/></td>
                <td><xsl:value-of select="name"/></td>
                <td><xsl:value-of select="mail"/></td>
                <td><xsl:value-of select="street"/></td>
                <td><xsl:value-of select="zip"/></td>
            </tr>
        </xsl:for-each>
    </table>
</body>
</html>
</xsl:template>
</xsl:stylesheet>