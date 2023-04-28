import Head from 'next/head';
import Header from '../../../../components/header/Header';
import Navbar from '../../../../components/navbar/Navbar';
import Container from '../../../../components/utils/Container';
import Footer from '../../../../components/footer/Footer';
import { useState } from 'react';
import Datepicker from '../../../../components/utils/Datepicker';

export default function Dashboard() {
  const [fileComunicado, setFileComunicado] = useState<File>();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('media', fileComunicado);
    formData.append('name', 'João Victor');

    fetch("/api/comunicado/create", {
      method: "POST",
      body: formData,


    })
      .then((response) => {
        if (response.ok) {
          console.log(response)
        }

      })
      .catch(error => {
        console.log(error);
      })

  }

  const handleFileUploadChange = (e) => {
    setFileComunicado(e.target.files[0])
  }

  return (
    <>
      <Header />
      <Head>
        <title>AEMC - Dashboard</title>
      </Head>

      <Navbar />
      <Container>
        <div className="text-2xl mb-5">Comunicados</div>


        <form onSubmit={(e) => handleFormSubmit(e)} method="POST">
          <div className='space-y-5'>

            {/* Título */}
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Título</label>
              <input name="title" type="text" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" />
            </div>

            {/* Data */}
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Data</label>
              <div className="relative max-w-sm">
                <Datepicker />
              </div>
            </div>

            <div>


              <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white" for="file_input">Arquivo do comunicado: </label>
              <input onChange={(e) => handleFileUploadChange(e)} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" type="file" />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PDF (MAX 10MB).</p>


            </div>

            <div>
              <button className="p-3 bg-blue-500 text-white rounded-lg font-semibold" type="submit">Enviar</button>
            </div>

          </div>
        </form>

      </Container >
      <Footer />

    </>
  );
}