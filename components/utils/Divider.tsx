function Divider({className}) {

    const classAdd = `h-px bg-gray-200 border-0 dark:bg-gray-700 ${className}`
    
    console.log(classAdd);

    return (
        
        <hr className={classAdd} />
    )
}

export default Divider;