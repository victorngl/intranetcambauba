import { useState } from "react"
import Datepicker from "tailwind-datepicker-react"

const options = {
    title: "Escolha a data ",
    autoHide: true,
    todayBtn: false,
    clearBtn: false,
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
      background: "bg-gray-200",
      todayBtn: "",
      clearBtn: "",
      icons: "",
      text: "",
      disabledText: "",
      input: "",
      inputIcon: "",
      selected: "",
    },
    icons: {
      // () => ReactElement | JSX.Element
      prev: () => <span>Voltar</span>,
      next: () => <span>Próximo</span>,
    },
    datepickerClassNames: "top-12",
    defaultDate: new Date("2023-01-01"),
    language: "pt-BR",
  }
  
function DatepickerShow() {
    const [datepickerShow, setDatepickerShow] = useState<boolean>(false)

    const handleChange = (selectedDate: Date) => {
      let rightNow = new Date;

      if(selectedDate < rightNow) {
        console.log('DATA SELECIONADA ANTERIOR A HOJE')
      }
      
      console.log(rightNow)
      console.log(selectedDate);
    }
    const handleClose = (state: boolean) => {
      setDatepickerShow(state)
    }

    return <Datepicker options={options} onChange={handleChange} show={datepickerShow} setShow={handleClose} />

}

export default DatepickerShow;