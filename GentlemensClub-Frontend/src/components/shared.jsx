export const LoadingSpinner = () => {
    return (
        <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export const GoogleMap = (address, width = 400, height = 300) => {
    const src = `https://maps.google.com/maps?q=${address}&t=&z=17&ie=UTF8&iwloc=&output=embed`
    return (

        <div className={"mapouter"}>
            <div className={"gmap_canvas"}>
                <iframe width={width} height={height}
                        src={src}>
                </iframe>
            </div>
        </div>

    );
}