import ExportEstimateTemplate from './ExportEstimateTemplate';
import React from "react";
import { jsPDF, HTMLOptionImage } from "jspdf";
import { toPng, toCanvas } from "html-to-image";
import autoTable from 'jspdf-autotable';


const ExportEstimatePDF = ({selectedProducts}) => {
	console.log(selectedProducts);
	const generatePdf = () => {
		const doc = new jsPDF();
	
		var arr = selectedProducts.map(function(obj) {
			return Object.keys(obj).map(function(key) {
				return obj[key];
			});
		});

		autoTable(doc, {
			head: [['Código', 'Nome', 'Unidade', 'Quantidade', 'Preço']],
			body: arr,
		  })
		//Inserir valor total como texto
		//doc.text('aaaaaaaaaaaaaaaa', 5, 75);
		doc.output("dataurlnewwindow");

	};

	return (

		<div className="button-container">
		  <button onClick={generatePdf}>
			Get PDF
		  </button>
		</div>
	
	  );
};

export default ExportEstimatePDF;