export const  validarFormatoFecha = (fecha: string): boolean => {
	const formatoFechaRegex = /^\d{4}-\d{2}-\d{2}$/

	if (!formatoFechaRegex.test(fecha)) {
		return false
	}

	const [anio, mes, dia] = fecha.split('-').map(Number)

	if (mes < 1 || mes > 12 || dia < 1 || dia > new Date(anio, mes, 0).getDate()) {
		return false
	}

	const fechaObj = new Date(fecha)
	return !isNaN(fechaObj.getTime())
}