function Container({ children }) {
    return (

        <div className = "py-5 bg-secondary w-full h-full flex justify-center">

            <div className='bg-white rounded-lg p-5 w-11/12 text-text-primary' >
                {children}
            </div>

        </div>

        
    )
}

export default Container;