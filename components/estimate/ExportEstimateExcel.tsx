
import React from "react";
import { CSVLink } from 'react-csv';
import XLSX from 'sheetjs-style';
import { Button } from "@mui/material";


const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';

const ExportEstimateExcel = ({estimate, selectedProducts}) => {
	
	const exportToExcel = async (products) => {
		var wb = XLSX.utils.book_new();
		const ws = XLSX.utils.json_to_sheet(products);
		XLSX.utils.book_append_sheet(wb, ws, 'Orçamento');
		XLSX.writeFile(wb, 'Orçamento' + fileExtension);
	}
	
	const exportToExcelArray = async (products) => {
		
		var headerName = [ ['Eficaz Industrial - Orçamento'] ];
		var companyName = [ [`Nome da Empresa: ${estimate.name}`] ];
		var companyCNPJ = [ [`CNPJ: ${estimate.cnpj}`] ];
		
		var Heading = [
			["Código", "Nome do Produto", "Unidade", "Quantidade", "Preço", "Valor Total", ],
		  ];
		
		var wb = XLSX.utils.book_new();
		const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
		XLSX.utils.sheet_add_aoa(ws, headerName, { origin: 'A1' });
		XLSX.utils.sheet_add_aoa(ws, companyName, { origin: 'A2' });
		XLSX.utils.sheet_add_aoa(ws, companyCNPJ, { origin: 'A3' });
		XLSX.utils.sheet_add_aoa(ws, Heading, 	{ origin: 'A5' } );
		XLSX.utils.sheet_add_json(ws, products, { origin: 'A6', skipHeader: true });
		
		var wscols = [
			{wch:10},
			{wch:20},
			{wch:12},
			{wch:10},
			{wch:10},
			{wch:20},
		];
		
		const merge = [
			{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } },
		  ];
		
		ws["!merges"] = merge;
		ws['!cols'] = wscols;

		XLSX.utils.book_append_sheet(wb, ws, 'Orçamento');
		XLSX.writeFile(wb, 'Orçamento' + fileExtension);
	}

	return (
		<>
		<Button className='bg-blue-500 text-white' onClick={ (e) => { exportToExcelArray(selectedProducts) }}>
			Exportar para Excel
		</Button>
		</>
	  );
};

export default ExportEstimateExcel;