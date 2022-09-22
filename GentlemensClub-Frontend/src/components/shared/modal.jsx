import "../../css/shared/modal.css";

export function Modal(props) {
    if (!props.show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content" style={{width: "24rem"}}>
                <div className="modal-header">
                    <h4 className="modal-title">{props.title}</h4>
                </div>
                <div className="modal-body">
                    {props.body}
                </div>
                <div className="modal-footer">
                    <button className="button btn btn-dark" onClick={props.onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}