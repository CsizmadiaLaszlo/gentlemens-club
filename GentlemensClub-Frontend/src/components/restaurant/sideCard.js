const SideCard = () => {
    return (
        <div className="w-25">
            <div className="card bg-dark text-light border-secondary">
                <div className="card-header border-secondary">
                    How to use?
                </div>
                <div className="card-body">
                    <p className="card-text">
                        Hover over a table on the image, then click on it to open it's information.
                        <br /><br />
                        If you have chosen an available table, then click on the "Reserve this table"
                        button at bottom of the right card to start the reservation process.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SideCard