export default function LectureCard({ data, onClick }) {
    return (
        <div onClick={onClick} className="lecture-card">
            <h3>{data.module}</h3>
            <p>{data.start} - {data.end}</p>
            <p>{data.class}</p>
        </div>
    )
}