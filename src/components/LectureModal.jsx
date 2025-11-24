export default function LectureModal({data, onClose}) {
    return (
        <div onClick={onClose} className="modal-overlay">
            <div className="modal-box">
                <div className="top-bar">
                    <button onClick={onClose}>X</button>
                </div>
                <div className="info">
                    <h3>{data.module}</h3>
                    <p>{data.day}</p>
                    <p>{data.start} - {data.end}</p>
                    <p>{data.teacher}</p>
                    <p>{data.subject}</p>
                    <p>{data.class}</p>
                </div>
            </div>
        </div>
    )
}