
import React from "react";
import XLSX from 'sheetjs-style';

import { Product } from "../../types/types";

const fileExtension = '.xlsx';

const ExportEstimateExcel = ({estimate}) => {
	
	const exportToExcel = async (products: Product[]) => {
		var wb = XLSX.utils.book_new();
		const ws = XLSX.utils.json_to_sheet(products);
		XLSX.utils.book_append_sheet(wb, ws, 'Orçamento');
		XLSX.writeFile(wb, 'Orçamento' + fileExtension);
	}
	
	const exportToExcelArray = async (products: Product[]) => {
		

		var headerName = [ ['Eficaz Industrial - Orçamento'] ];
		var companyName = [ [`Nome da Empresa: ${estimate.name}`] ];
		var companyCNPJ = [ [`CNPJ: ${estimate.cnpj}`] ]; 
		
		var Heading = [ ["Código", "Nome do Produto", "Unidade", "Preço Unitário (R$)", "Quantidade", "Valor Total (R$)", ] ];
		const sortedHeader = ['id', 'name', 'unity', 'price', 'quantity', 'price_amount'];

		var totalValueLines = [["Valor Total", [`R$ ${estimate.totalprice}`]]]
		var blankLine = [];
		

		
		var wb = XLSX.utils.book_new();
		const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
		XLSX.utils.sheet_add_aoa(ws, headerName, 		{ origin: 'A1' });
		XLSX.utils.sheet_add_aoa(ws, companyName, 		{ origin: 'A2' });
		XLSX.utils.sheet_add_aoa(ws, companyCNPJ, 		{ origin: 'A3' });
		XLSX.utils.sheet_add_aoa(ws, Heading, 			{ origin: 'A5' } );
		XLSX.utils.sheet_add_json(ws, products, 		{ origin: 'A6', header: sortedHeader, skipHeader: true});
		XLSX.utils.sheet_add_aoa(ws, blankLine, 		{ origin: -1 });
		XLSX.utils.sheet_add_aoa(ws, totalValueLines, 	{ origin: { r: -1, c: 4 } });
		
		var wscols = [
			{wch:10},
			{wch:20},
			{wch:12},
			{wch:20},
			{wch:10},
			{wch:20},
		];
		
		const merge = [
			{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } },
			{ s: { r: 1, c: 0 }, e: { r: 1, c: 1 } },
			{ s: { r: 2, c: 0 }, e: { r: 2, c: 1 } },
		  ];
		
		ws["!merges"] = merge;
		ws['!cols'] = wscols;

		XLSX.utils.book_append_sheet(wb, ws, 'Orçamento');
		XLSX.writeFile(wb, 'Orçamento' + fileExtension);
	}

	return (
		<>
		<button className='text-sm p-4 rounded bg-blue-500 hover:bg-blue-700 text-white' onClick={ (e) => { exportToExcelArray(estimate.products) }}>
			Exportar para Excel
		</button>
		</>
	  );
};

export default ExportEstimateExcel;