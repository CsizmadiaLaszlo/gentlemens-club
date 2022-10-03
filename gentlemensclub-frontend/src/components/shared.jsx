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

export const GoogleMap = (address) => {
    const src = `https://maps.google.com/maps?q=${address}&t=&z=17&ie=UTF8&iwloc=&output=embed`
    return (

        <div className={"mapouter"} style={{textAlign: "center", alignContent: "center"}}>
            <div className={"gmap_canvas"}>
                <iframe width={"400"} height={"300"}
                        src={src}>
                </iframe>
            </div>
        </div>

    );
}