import "../../css/shared/modal.css";

export function Modal(props) {
    if (!props.show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content bg-dark text-light" style={{width: "24rem"}}>
                <div className="modal-header">
                    <h4 className="modal-title">{props.title}</h4>
                    <i style={{cursor: "pointer"}} onClick={props.onClose} className={"fa-solid fa-x"}></i>
                </div>
                <div className="modal-body">
                    {props.body}
                </div>
            </div>
        </div>
    );
}